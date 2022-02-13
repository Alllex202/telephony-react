import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import stylesCard from 'shared/styles/cards-substrate/styles.module.scss'
import {classNames, formatTimeObject} from 'shared/utils'
import Substrate from 'components/ui-kit/substrate'
import PieChart from 'modules/charts/pie-chart'
import LineChart from 'modules/charts/line-chart'
import {useDispatch} from 'react-redux'
import {getStatsChart, getStatsCommon, getStatsPieChart, resetStatsState} from 'store/stats'
import {useSelectorApp} from 'shared/hoocks'

const StatsBody = () => {
    const dispatch = useDispatch()
    const {
        stats: {common, pieChart, chart}
    } = useSelectorApp()

    useEffect(() => {
        dispatch(getStatsChart())
        dispatch(getStatsCommon())
        dispatch(getStatsPieChart())

        return () => {
            dispatch(resetStatsState())
        }
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Общая статистика</div>
            <div className={stylesCard.cards}>
                <div className={stylesCard.rowCards}>
                    <Substrate className={classNames(stylesCard.card, stylesCard.progress)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Обзваниваний запущено</div>
                            <div className={stylesCard.bigBlackFont}>
                                {common.data?.totalDialings}
                            </div>
                        </div>
                        <div className={stylesCard.body} />
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.callersBase)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>
                                Средняя продолжительность обзванивания
                            </div>
                            <div className={stylesCard.bigBlackFont}>
                                {formatTimeObject(common.data?.averageDialingsDuration)}
                            </div>
                        </div>
                        <div className={stylesCard.body} />
                    </Substrate>
                </div>
                <div className={stylesCard.rowCards}>
                    <Substrate className={classNames(stylesCard.card, stylesCard.dateTime)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>
                                Среднее кол-во звонков за обзванивание
                            </div>
                            <div className={stylesCard.bigBlackFont}>
                                {common.data?.averageNumberOfCallsPerDialing}
                            </div>
                        </div>
                        <div className={stylesCard.body} />
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.scenario)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>
                                Средняя продолжительность звонка
                            </div>
                            <div className={stylesCard.bigBlackFont}>
                                {formatTimeObject(common.data?.averageCallDuration)}
                            </div>
                        </div>
                        <div className={stylesCard.body} />
                    </Substrate>
                </div>
                <div className={stylesCard.rowCards}>
                    <Substrate className={classNames(stylesCard.card, stylesCard.pieChart)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Статус звонков</div>
                            <div className={stylesCard.bigBlackFont}>
                                {pieChart.data?.percentSuccess}% успешных
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
                            <LineChart data={chart.data} nameTooltip={'Успешные звонки'} />
                        </div>
                    </Substrate>
                </div>
            </div>
        </div>
    )
}

export default StatsBody
