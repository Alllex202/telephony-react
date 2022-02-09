import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import HiddenInputWithIcon from 'components/hidden-input-with-icon'
import {useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {
    changeCallersBaseCommon,
    getCallersBaseCommonById,
    resetCallersBaseViewState,
    updateTablePageSettings
} from 'store/callers-bases/view'
import CallersBaseViewTable from './components/table'
import {useDoubleInput, useSelectorApp} from 'shared/hoocks'
import {Switch} from '@mui/material'

const CallersBaseViewBody = () => {
    const {
        callersBaseView: {
            common: {data, statuses},
            table: {
                statuses: tablesStatuses,
                pageSettings: {onlyInvalid}
            }
        }
    } = useSelectorApp()
    const {
        text: name,
        lastText: lastName,
        setText: setName,
        setLastText: setLastName
    } = useDoubleInput(data?.name || '')
    const {callersBaseId} = useParams<{callersBaseId: string}>()
    const dispatch = useDispatch()

    const handlerSaveName = (currentValue: string) => {
        if (statuses.isLoading || name === '') {
            setName(lastName)
            return
        }
        if (!data || lastName === currentValue) return

        dispatch(changeCallersBaseCommon({...data, name: currentValue}))
    }

    const onChangeFilter = () => {
        if (!data || tablesStatuses.isLoading || data.countInvalidCallers === 0) return

        dispatch(updateTablePageSettings({onlyInvalid: !onlyInvalid}))
    }

    useEffect(() => {
        dispatch(getCallersBaseCommonById(callersBaseId))

        return () => {
            dispatch(resetCallersBaseViewState())
        }
    }, [])

    useEffect(() => {
        if (data) {
            setName(data.name)
            setLastName(data.name)
        }
    }, [data?.name])

    return (
        <>
            {data && (
                <div className={styles.wrapper}>
                    <div className={styles.head}>
                        <HiddenInputWithIcon
                            text={name}
                            lastText={lastName}
                            setText={setName}
                            setLastText={setLastName}
                            callback={handlerSaveName}
                            classNameWrapper={styles.name}
                            classNameInput={styles.nameInput}
                            classNameText={styles.nameText}
                            disabled={statuses.isLoading}
                        />
                        <label className={styles.toggleBlock}>
                            <span className={styles.label}>
                                Невалидные ({data.countInvalidCallers})
                            </span>
                            <Switch
                                checked={onlyInvalid}
                                onChange={onChangeFilter}
                                disabled={data.countInvalidCallers === 0}
                            />
                        </label>
                    </div>

                    <div className={styles.table}>
                        <CallersBaseViewTable />
                    </div>
                </div>
            )}
        </>
    )
}

export default CallersBaseViewBody
