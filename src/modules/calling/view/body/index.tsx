import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import stylesCard from 'shared/styles/cards-substrate/styles.module.scss'
import {useDispatch} from 'react-redux'
import Substrate from 'components/ui-kit/substrate'
import {
    getCallingResultChartById,
    getCallingResultCommonById,
    getCallingResultPieChartById,
    resetState
} from 'store/calling/view'
import {Link, useParams} from 'react-router-dom'
import {classNames, formatDate} from 'shared/utils'
import {LinearProgress} from '@mui/material'
import {routes} from 'routing/routes'
import CallingViewTable from 'modules/calling/view/body/components/table'
import LineChart from 'modules/charts/line-chart'
import PieChart from 'modules/charts/pie-chart'
import {useSelectorApp} from 'shared/hoocks'

const CallingViewBody = () => {
    const {
        callingView: {common, pieChart, chart}
    } = useSelectorApp()
    const dispatch = useDispatch()
    const {callingId} = useParams<{callingId: string}>()

    useEffect(() => {
        dispatch(getCallingResultCommonById(callingId))
        dispatch(getCallingResultPieChartById(callingId))
        dispatch(getCallingResultChartById(callingId))

        return () => {
            dispatch(resetState())
        }
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>{common.result?.name || ''}</div>
            <div className={stylesCard.cards}>
                <div className={stylesCard.rowCards}>
                    <Substrate className={classNames(stylesCard.card, stylesCard.progress)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Прогресс</div>
                            <div className={stylesCard.bigBlackFont}>
                                {common.result?.progress.percentEnd}%
                            </div>
                            <div className={stylesCard.smallBlackFont}>
                                {common.result?.progress.countEnd} из{' '}
                                {common.result?.progress.countCallers}
                                {common.result?.endDialing ? ' (в процессе)' : ' (завершен)'}
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            <LinearProgress
                                value={common.result?.progress.percentEnd ?? 0}
                                variant={'determinate'}
                                className={classNames(
                                    stylesCard.progressBar,
                                    common.result?.status === 'RUN' ? stylesCard.running : ''
                                )}
                            />
                        </div>
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.callersBase)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>База данных</div>
                            <div className={stylesCard.bigBlackFont}>
                                {common.result?.callersBase.name}
                            </div>
                            <div className={stylesCard.smallBlackFont}>
                                {common.result?.callersBase.countCallers} эл
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            {common.result && (
                                <Link
                                    to={routes.callersBase.view(common.result.callersBase.id)}
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
                                    {common.result &&
                                        ` ${formatDate(common.result?.startDialing, true, true)}`}
                                </span>
                            </div>

                            {common.result?.endDialing && (
                                <div>
                                    <span className={stylesCard.bigLightFont}>конец</span>
                                    <span className={stylesCard.bigBlackFont}>
                                        {` ${formatDate(common.result?.endDialing, true, true)}`}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={stylesCard.body}></div>
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.scenario)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Сценарий</div>
                            <div className={stylesCard.bigBlackFont}>
                                {common.result?.scenario.name}
                            </div>
                            <div className={stylesCard.smallBlackFont}>
                                {common.result?.scenario.countSteps} шагов
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            {common.result && (
                                <Link
                                    to={routes.scenario.view(common.result.scenario.scenarioId)}
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
                                {pieChart.result?.percentSuccess}% успешных
                            </div>
                            <div className={stylesCard.smallBlackFont}>
                                {pieChart.result?.countSuccess} из {pieChart.result?.countCallers}
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            <PieChart data={pieChart.result?.parts ?? []} />
                        </div>
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.chart)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>
                                Время суток / успешные звонки
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                            <LineChart data={chart.result ?? []} nameTooltip={'Успешные звонки'} />
                        </div>
                    </Substrate>
                </div>
            </div>
            <div className={styles.table}>
                <CallingViewTable callingId={callingId} />
            </div>
        </div>
    )
}

export default CallingViewBody
