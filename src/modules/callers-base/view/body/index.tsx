import React, {useEffect, useRef, useState} from 'react'
import styles from './styles.module.scss'
import HiddenInputWithIcon from 'components/hidden-input-with-icon'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
    changeCallersBaseHeaderById,
    getCallersBaseById,
    getCallingsByCallersBaseId,
    resetAll,
    setType
} from 'store/callers-bases/view'
import {RootState} from 'store'
import CallersBaseViewTable from './components/table'
import Switch from 'components/ui-kit/switch'
import {useHiddenInput} from 'shared/hoocks'

const CallersBaseViewBody = () => {
    const {statusesHeader, header, statusesData, onlyInvalid} = useSelector(
        (state: RootState) => state.callersBaseView
    )
    const {
        text: name,
        lastText: lastName,
        setText: setName,
        setLastText: setLastName
    } = useHiddenInput(header?.name || '')
    const {callersBaseId} = useParams<{callersBaseId: string}>()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCallersBaseById(callersBaseId))
        dispatch(getCallingsByCallersBaseId(callersBaseId))
        return () => {
            dispatch(resetAll())
        }
    }, [])

    useEffect(() => {
        setName(header?.name || '')
        setLastName(header?.name || '')
    }, [header?.name])

    const onSave = (currentValue: string) => {
        if (header) {
            saveName(currentValue)
        }
    }

    const saveName = (newName: string) => {
        if (statusesHeader.isLoading || statusesData.isLoading || name === '') {
            setName(lastName)
            return
        }
        if (lastName === newName || !header) return

        dispatch(changeCallersBaseHeaderById({...header, name: newName}))
    }

    const onChangeFilter = () => {
        if (statusesHeader.isLoading || statusesData.isLoading) return
        if (!header) return

        dispatch(setType(!onlyInvalid))
    }

    if (header === null && statusesHeader.isError) {
        return <h1>{statusesHeader.error}</h1>
    }

    if (header === null && statusesHeader.isLoading) {
        return <h1>Загрузка...</h1>
    }

    return (
        <>
            {header && (
                <>
                    <div className={styles.head}>
                        <HiddenInputWithIcon
                            text={name}
                            lastText={lastName}
                            setText={setName}
                            setLastText={setLastName}
                            callback={onSave}
                            classNameWrapper={styles.name}
                            classNameInput={styles.nameInput}
                            classNameText={styles.nameText}
                        />
                        <div className={styles.toggleBlock}>
                            <Switch checked={onlyInvalid} onChange={onChangeFilter} />
                            <span>Невалидные</span>
                        </div>
                    </div>

                    <div className={styles.table}>
                        <CallersBaseViewTable />
                    </div>
                </>
            )}
        </>
    )
}

export default CallersBaseViewBody
