import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import './styles.scss'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {
    resetState,
    saveCalling,
    setCallersBaseId,
    setIsNow,
    setName,
    setScenarioId,
    setStartDate
} from 'store/features/calling/creating'
import InputName from 'shared/components/input-name'
import {FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material'
import {CallersBaseHeaderModel, ScenarioInfoModel} from 'core/api'
import {getCallersBasesHeader, getScenariosByPage} from 'core/api/requests'
import {handlerError} from 'shared/middleware'
import BtnSecond from 'components/ui-kit/btn-second'
import Btn from 'components/ui-kit/btn'
import DateAdapter from '@mui/lab/AdapterDateFns'
import {DesktopDatePicker, DesktopTimePicker, LocalizationProvider} from '@mui/lab'
import Checkbox from 'components/ui-kit/checkbox'
import {classNames} from 'shared/utils'

const CallingCreatingBody = () => {
    const {statuses, name, isNow, startDate} = useSelector((state: RootState) => state.callingCreating)
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
            .catch(handlerError(dispatch))

        getCallersBasesHeader({page: 0, size: 100})
            .then((res) => {
                setBases(res.data.content)
            })
            .catch(handlerError(dispatch))

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

    const onChangeDateTime = (_date: (number | null | undefined)) => {
        if (_date) {
            const date = new Date(_date)
            dispatch(setStartDate(date.getTime()))
        }
    }

    const onChangeIsNow = () => {
        dispatch(setIsNow(!isNow))
    }

    const onSave = () => {
        if (statuses.isLoading) return

        dispatch(saveCalling())
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
                <div className={styles.block}>
                    <div className={styles.subtitle}>
                        База данных
                    </div>
                    <div className={styles.content}>
                        <div className={'custom-input'}>
                            <FormControl fullWidth>
                                <InputLabel id={'base'}>Выберите базу данных</InputLabel>
                                <Select
                                    readOnly={statuses.isLoading}
                                    labelId={'base'}
                                    label={'Выберите базу данных'}
                                    onChange={onSelectBase}
                                    defaultValue={''}
                                >
                                    {bases?.map(el => <MenuItem key={el.id}
                                                                value={el.id}>{el.name}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </div>

                        <BtnSecond text={'Загрузить базу'}
                                   iconPosition={'end'}
                                   iconName={'upload'}
                                   iconType={'round'}
                                   className={styles.btn}/>
                    </div>
                </div>

                <div className={styles.block}>
                    <div className={styles.subtitle}>
                        Сценарий обзванивания
                    </div>
                    <div className={styles.content}>
                        <div className={'custom-input'}>
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
                        </div>
                        <BtnSecond text={'Новый сценарий'}
                                   iconPosition={'end'}
                                   iconName={'forum'}
                                   iconType={'round'}
                                   className={styles.btn}/>
                    </div>

                </div>

                <div className={styles.block}>
                    <div className={styles.subtitle}>
                        Дата и время запуска обзванивания
                    </div>
                    <div className={styles.content}>
                        <LocalizationProvider dateAdapter={DateAdapter}>
                            <div className={styles.doubleInput}>
                                <div className={classNames(styles.dateTime, 'custom-input')}>
                                    <DesktopDatePicker
                                        disabled={isNow}
                                        value={startDate}
                                        minDate={Date.now()}
                                        onChange={onChangeDateTime}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>
                                <div className={classNames(styles.dateTime, 'custom-input')}>
                                    <DesktopTimePicker
                                        disabled={isNow}
                                        value={startDate}
                                        onChange={onChangeDateTime}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </div>
                            </div>
                        </LocalizationProvider>
                        <FormControlLabel control={<Checkbox checked={isNow}
                                                             className={styles.checkbox}
                                                             onChange={onChangeIsNow}/>}
                                          label={'Запустить сейчас'}/>
                    </div>
                </div>
                <Btn text={isNow ? 'Начать обзванивание' : 'Добавить в очередь'}
                     className={styles.btn}
                     onClick={onSave}/>
            </div>
        </div>
    )
}

export default CallingCreatingBody

