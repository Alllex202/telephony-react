import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import InputName from 'shared/components/input-name'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
    changeCallersBaseHeaderById,
    getCallersBaseById,
    getCallingsByCallersBaseId,
    resetAll,
    setType
} from 'store/features/callers-bases/view'
import {RootState} from 'store'
import CallersBaseViewTable from './components/table'
import Switch from 'components/ui-kit/switch'

function CallersBaseViewBody() {
    const {
        statusesHeader,
        header,
        statusesData,
        onlyInvalid,
    } = useSelector((state: RootState) => state.callersBaseView)
    const [name, setName] = useState<string>(header?.name || '')
    const [lastName, setLastName] = useState<string>(name)
    const {callersBaseId} = useParams<{ callersBaseId: string }>()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCallersBaseById(callersBaseId))
        dispatch(getCallingsByCallersBaseId(callersBaseId))
        return () => {
            dispatch(resetAll())
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setName(header?.name || '')
        setLastName(header?.name || '')
    }, [header?.name])

    function onSave(currentValue: string) {
        if (header) {
            saveName(currentValue)
        }
    }

    function saveName(newName: string) {
        if (statusesHeader.isLoading || statusesData.isLoading || name === '') {
            setName(lastName)
            return
        }
        if (lastName === newName || !header) return

        dispatch(changeCallersBaseHeaderById({...header, name: newName}))
    }

    function onChangeFilter() {
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
            {header &&
            <>
                <div className={styles.head}>
                    <InputName text={name}
                               lastText={lastName}
                               setText={setName}
                               setLastText={setLastName}
                               callback={onSave}
                               classNameWrapper={styles.name}
                               classNameInput={styles.nameInput}
                               classNameText={styles.nameText}/>
                    <div className={styles.toggleBlock}>
                        <Switch checked={onlyInvalid}
                                onChange={onChangeFilter}/>
                        <span>Невалидные</span>
                    </div>
                </div>

                <div className={styles.table}>
                    <CallersBaseViewTable/>
                </div>
            </>}
        </>
    )
}

export default CallersBaseViewBody
