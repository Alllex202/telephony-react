import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {resetState, setCallersBaseId, setName, setScenarioId, setStartDate} from 'store/features/calling/creating'
import InputName from 'shared/components/input-name'
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material'
import {CallersBaseHeaderModel, ScenarioInfoModel} from 'core/api'
import {getCallersBasesHeader, getScenariosByPage} from 'core/api/requests'
import {DefaultAxiosError} from 'shared/types/base-response-error'

const CallingCreatingBody = () => {
    const {statuses, name} = useSelector((state: RootState) => state.callingCreating)
    const [bases, setBases] = useState<CallersBaseHeaderModel[] | null>(null)
    const [scenarios, setScenarios] = useState<ScenarioInfoModel[] | null>(null)
    const [_name, _setName] = useState<string>(name)
    const [lastName, setLastName] = useState<string>(name)
    const dispatch = useDispatch()

    useEffect(() => {
        getScenariosByPage({page: 0, size: 100})
            .then((res) => {
                setScenarios(res.data.content)
            })
            .catch((err: DefaultAxiosError) => {
                console.log(err.response?.data.message || 'Ошибка при загрузке сценариев')
            })

        getCallersBasesHeader({page: 0, size: 100})
            .then((res) => {
                setBases(res.data.content)
            })
            .catch((err: DefaultAxiosError) => {
                console.log(err.response?.data.message || 'Ошибка при загрузке сценариев')
            })

        return () => {
            dispatch(resetState())
        }
        // eslint-disable-next-line
    }, [])

    const onSelectBase = (e: SelectChangeEvent) => {
        dispatch(setCallersBaseId(e.target.value))
    }

    const onSelectScenario = (e: SelectChangeEvent) => {
        dispatch(setScenarioId(e.target.value))
    }

    const onChangeName = (value: string) => {
        dispatch(setName(value))
    }

    const onChangeDateTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setStartDate((new Date(e.target.value)).getTime()))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <InputName text={_name}
                           lastText={lastName}
                           setText={_setName}
                           setLastText={setLastName}
                           callback={onChangeName}/>
            </div>
            <div className={styles.form}>
                <FormControl fullWidth>
                    <InputLabel id={'base'}>Выберите базу</InputLabel>
                    <Select
                        readOnly={statuses.isLoading}
                        labelId={'base'}
                        label={'Выберите базу'}
                        onChange={onSelectBase}
                        defaultValue={''}
                    >
                        {bases?.map(el => <MenuItem key={el.id}
                                                    value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id={'scenario'}>Выберите сценарий</InputLabel>
                    <Select
                        readOnly={statuses.isLoading}
                        labelId={'scenario'}
                        label={'Выберите сценарий'}
                        onChange={onSelectScenario}
                        defaultValue={''}
                    >
                        {scenarios?.map(el => <MenuItem key={el.id}
                                                        value={el.id}>{el.name}</MenuItem>)}
                    </Select>
                </FormControl>

                <input type={'datetime-local'}
                       onChange={onChangeDateTime}/>
            </div>
        </div>
    )
}

export default CallingCreatingBody

