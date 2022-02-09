import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import stylesCard from 'shared/styles/cards-substrate/styles.module.scss'
import {useDispatch} from 'react-redux'
import Substrate from 'components/ui-kit/substrate'
import {
    getCallingResultChartById,
    getCallingResultCommonById,
    getCallingResultPieChartById,
    resetCallingViewState
} from 'store/calling/view'
import {Link, useParams} from 'react-router-dom'
import {classNames, formatDate} from 'shared/utils'
import {LinearProgress} from '@mui/material'
import {routes} from 'routing/routes'
import CallingViewTable from './components/table'
import LineChart from 'modules/charts/line-chart'
import PieChart from 'modules/charts/pie-chart'
import {useSelectorApp} from 'shared/hoocks'

const CallingViewBody = () => {
    const dispatch = useDispatch()
    const {
        callingView: {common, pieChart, chart}
    } = useSelectorApp()
    const {callingId} = useParams<{callingId: string}>()

    useEffect(() => {
        dispatch(getCallingResultCommonById(callingId))
        dispatch(getCallingResultPieChartById(callingId))
        dispatch(getCallingResultChartById(callingId))

        return () => {
            dispatch(resetCallingViewState({type: 'common'}))
            dispatch(resetCallingViewState({type: 'chart'}))
            dispatch(resetCallingViewState({type: 'pieChart'}))
        }
    }, [callingId])

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>{common.data?.name || ''}</div>
            <div className={stylesCard.cards}>
                <div className={stylesCard.rowCards}>
                    <Substrate className={classNames(stylesCard.card, stylesCard.progress)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Прогресс</div>
                            <div className={stylesCard.bigBlackFont}>
                                {common.data?.progress.percentEnd}%
                            </div>
                            <div className={stylesCard.smallBlackFont}>
                                {common.data?.progress.countEnd} из{' '}
                                {common.data?.progress.countCallers}
                                {common.data?.endDialing ? ' (в процессе)' : ' (завершен)'}
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            <LinearProgress
                                value={common.data?.progress.percentEnd ?? 0}
                                variant={'determinate'}
                                className={classNames(
                                    stylesCard.progressBar,
                                    common.data?.status === 'RUN' ? stylesCard.running : ''
                                )}
                            />
                        </div>
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.callersBase)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>База данных</div>
                            <div className={stylesCard.bigBlackFont}>
                                {common.data?.callersBase.name}
                            </div>
                            <div className={stylesCard.smallBlackFont}>
                                {common.data?.callersBase.countCallers} эл
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            {common.data && (
                                <Link
                                    to={routes.callersBase.view(common.data.callersBase.id)}
                                    className={stylesCard.link}
                                >
                                    Перейти к базе
                                </Link>
                            )}
                        </div>
                    </Substrate>
                </div>
                <div className={stylesCard.rowCards}>
                    <Substrate className={classNames(stylesCard.card, stylesCard.dateTime)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Период обзванивания</div>
                            <div>
                                <span className={stylesCard.bigLightFont}>начало</span>
                                <span className={stylesCard.bigBlackFont}>
                                    {common.data &&
                                        ` ${formatDate(common.data?.startDialing, true, true)}`}
                                </span>
                            </div>

                            {common.data?.endDialing && (
                                <div>
                                    <span className={stylesCard.bigLightFont}>конец</span>
                                    <span className={stylesCard.bigBlackFont}>
                                        {` ${formatDate(common.data?.endDialing, true, true)}`}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={stylesCard.body} />
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.scenario)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Сценарий</div>
                            <div className={stylesCard.bigBlackFont}>
                                {common.data?.scenario.name}
                            </div>
                            <div className={stylesCard.smallBlackFont}>
                                {common.data?.scenario.countSteps} шагов
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            {common.data && (
                                <Link
                                    to={routes.scenario.view(common.data.scenario.scenarioId)}
                                    className={stylesCard.link}
                                >
                                    Перейти к сценарию
                                </Link>
                            )}
                        </div>
                    </Substrate>
                </div>
                <div className={stylesCard.rowCards}>
                    <Substrate className={classNames(stylesCard.card, stylesCard.pieChart)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Статус звонков</div>
                            <div className={stylesCard.bigBlackFont}>
                                {pieChart.data?.percentSuccess}% успешных
                            </div>
                            <div className={stylesCard.smallBlackFont}>
                                {pieChart.data?.countSuccess} из {pieChart.data?.countCallers}
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            <PieChart data={pieChart.data?.parts ?? []} />
                        </div>
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.chart)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>
                                Время суток / успешные звонки
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            <LineChart data={chart.data ?? []} nameTooltip={'Успешные звонки'} />
                        </div>
                    </Substrate>
                </div>
            </div>
            <div className={styles.table}>
                <CallingViewTable />
            </div>
        </div>
    )
}

export default CallingViewBody
