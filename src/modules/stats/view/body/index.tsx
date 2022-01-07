import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import stylesCard from 'shared/styles/cards-substrate/styles.module.scss'
import {classNames} from 'shared/utils'
import Substrate from 'components/ui-kit/substrate'
import PieChart from 'modules/charts/pie-chart'
import LineChart from 'modules/charts/line-chart'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {getStatsChart, getStatsCommon, getStatsPieChart, resetState} from 'store/features/stats'
import {formatTimeObject} from 'shared/utils/format-time-object'

const StatsBody = () => {
    const dispatch = useDispatch()
    const {common, pieChart, chart} = useSelector((state: RootState) => state.stats)

    useEffect(() => {
        dispatch(getStatsChart())
        dispatch(getStatsCommon())
        dispatch(getStatsPieChart())

        return () => {
            dispatch(resetState())
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
                                {common.result?.totalDiallings}
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                        </div>
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.callersBase)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Средняя продолжительность обзванивания</div>
                            <div className={stylesCard.bigBlackFont}>
                                {formatTimeObject(common.result?.averageDiallingDuration)}
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                        </div>
                    </Substrate>
                </div>
                <div className={stylesCard.rowCards}>
                    <Substrate className={classNames(stylesCard.card, stylesCard.dateTime)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Среднее кол-во звонков за обзванивание</div>
                            <div className={stylesCard.bigBlackFont}>
                                {common.result?.averageNumberOfCallsPerDialling}
                            </div>
                        </div>
                        <div className={stylesCard.body}>
                        </div>
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.scenario)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Средняя продолжительность звонка</div>
                            <div className={stylesCard.bigBlackFont}>
                                {formatTimeObject(common.result?.averageCallDuration)}
                            </div>
                        </div>
                        <div className={stylesCard.body}>
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
                        </div>
                        <div className={stylesCard.body}>
                            <PieChart data={pieChart.result?.parts ?? []}/>
                        </div>
                    </Substrate>
                    <Substrate className={classNames(stylesCard.card, stylesCard.chart)}>
                        <div className={stylesCard.head}>
                            <div className={stylesCard.smallLightFont}>Время суток / успешные звонки</div>
                        </div>
                        <div className={stylesCard.body}>
                            <LineChart data={chart.result ?? []}
                                       nameTooltip={'Успешные звонки'}/>
                        </div>
                    </Substrate>
                </div>
            </div>
        </div>
    )
}

export default StatsBody
