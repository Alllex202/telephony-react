import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import {useDispatch} from 'react-redux'
import {
    getCalling,
    resetState,
    saveCalling,
    setCallersBaseId,
    setIsNow,
    setName,
    setScenarioId,
    setStartDate
} from 'store/calling/creating'
import HiddenInputWithIcon from 'components/hidden-input-with-icon'
import {Checkbox, MenuItem, TextField} from '@mui/material'
import {
    CallersBaseHeaderModel,
    getCallersBasesHeader,
    getScenariosByPage,
    ScenarioInfoModel
} from 'core/api'
import {handlerError} from 'shared/middleware'
import DateAdapter from '@mui/lab/AdapterDateFns'
import {DatePicker, LocalizationProvider, TimePicker} from '@mui/lab'
import {classNames} from 'shared/utils'
import {useParams} from 'react-router-dom'
import {useSelectorApp} from 'shared/hoocks'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import {ForumRounded, UploadRounded} from '@mui/icons-material'
import ruLocale from 'date-fns/locale/ru'
import BtnPrimary from 'components/ui-kit-v2/btn-primary'

const CallingCreatingBody = () => {
    const dispatch = useDispatch()
    const {
        callingCreating: {statuses, name, isNow, startDate, scenarioId, callersBaseId, id}
    } = useSelectorApp()
    const {callingId} = useParams<{callingId: string}>()
    const [bases, setBases] = useState<CallersBaseHeaderModel[] | null>(null)
    const [scenarios, setScenarios] = useState<ScenarioInfoModel[] | null>(null)

    const onSelectBase = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCallersBaseId(e.target.value))
    }

    const onSelectScenario = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setScenarioId(e.target.value))
    }

    const onChangeName = (value: string) => {
        dispatch(setName(value))
    }

    const onChangeDateTime = (_date: number | null | undefined) => {
        if (_date) {
            const date = new Date(_date)
            dispatch(setStartDate(date.getTime()))
        }
    }

    const onChangeIsNow = () => {
        dispatch(setIsNow(!isNow))
    }

    const onSave = () => {
        if (statuses.isLoading || !name || !callersBaseId || !scenarioId) return

        dispatch(saveCalling())
    }

    useEffect(() => {
        if (callingId) {
            dispatch(getCalling(callingId))
        } else {
            dispatch(setStartDate(Date.now()))
        }

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
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <HiddenInputWithIcon value={name} onChange={onChangeName} />
            </div>
            <div className={styles.form}>
                <div className={styles.block}>
                    <div className={styles.subtitle} />
                    <div className={styles.content}>
                        <div className={'custom-input'}>
                            <TextField
                                variant={'filled'}
                                size={'mediumSlim'}
                                label={'База данных'}
                                color={'orange'}
                                select={!!bases}
                                value={bases ? callersBaseId ?? '' : ''}
                                onChange={onSelectBase}
                                disabled={statuses.isLoading || !bases}
                                autoFocus={false}
                                fullWidth
                            >
                                {bases?.map((el) => (
                                    <MenuItem key={el.id} value={el.id}>
                                        {el.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <BtnSecondary className={styles.btn} endIcon={<UploadRounded />}>
                            Загрузить базу
                        </BtnSecondary>
                    </div>
                </div>

                <div className={styles.block}>
                    <div className={styles.subtitle} />
                    <div className={styles.content}>
                        <div className={'custom-input'}>
                            <TextField
                                variant={'filled'}
                                size={'mediumSlim'}
                                label={'Сценарий обзванивания'}
                                color={'orange'}
                                select={!!scenarios}
                                value={scenarios ? scenarioId ?? '' : ''}
                                onChange={onSelectScenario}
                                disabled={statuses.isLoading || !scenarios}
                                autoFocus={false}
                                fullWidth
                            >
                                {scenarios?.map((el) => (
                                    <MenuItem key={el.id} value={el.id}>
                                        {el.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <BtnSecondary className={styles.btn} endIcon={<ForumRounded />}>
                            Новый сценарий
                        </BtnSecondary>
                    </div>
                </div>

                <div className={styles.block}>
                    <div className={styles.subtitle}>Дата и время запуска обзванивания</div>
                    <div className={styles.content}>
                        <LocalizationProvider dateAdapter={DateAdapter} locale={ruLocale}>
                            <div className={styles.doubleInput}>
                                <div className={classNames(styles.dateTime, 'custom-input')}>
                                    <DatePicker
                                        mask={'__.__.____'}
                                        disabled={isNow || statuses.isLoading}
                                        value={startDate}
                                        minDate={Date.now()}
                                        onChange={onChangeDateTime}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant={'filled'}
                                                size={'mediumSlim'}
                                                color={'orange'}
                                            />
                                        )}
                                    />
                                </div>
                                <div className={classNames(styles.dateTime, 'custom-input')}>
                                    <TimePicker
                                        disabled={isNow || statuses.isLoading}
                                        value={startDate}
                                        onChange={onChangeDateTime}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant={'filled'}
                                                size={'mediumSlim'}
                                                color={'orange'}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </LocalizationProvider>
                        <label className={styles.now}>
                            <Checkbox
                                checked={isNow}
                                className={styles.checkbox}
                                onChange={onChangeIsNow}
                                disabled={statuses.isLoading}
                            />
                            Запустить сейчас
                        </label>
                    </div>
                </div>
                <BtnPrimary
                    className={styles.btn}
                    onClick={onSave}
                    disabled={(!startDate && !isNow) || !scenarioId || !callersBaseId}
                    loading={statuses.isLoading}
                >
                    {isNow
                        ? 'Начать обзванивание'
                        : callingId
                        ? 'Обнов. обзванивание'
                        : 'Добавить в очередь'}
                </BtnPrimary>
            </div>
        </div>
    )
}

export default CallingCreatingBody
