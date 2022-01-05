import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import Substrate from 'components/ui-kit/substrate'
import {
    getCallingResultChartById,
    getCallingResultCommonById,
    getCallingResultPieChartById, getCallingResultTableBodyById, getCallingResultTableHeaderById, getVariables,
    resetState
} from 'store/features/calling/view'
import {Link, useParams} from 'react-router-dom'
import {classNames, formatDate} from 'shared/utils'
import {LinearProgress} from '@mui/material'
import routes from 'routing/routes'
import {
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    PieLabelRenderProps,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'
import CallingViewTable from 'modules/calling/view/body/components/table'

const CallingViewBody = () => {
    const {common, pieChart, chart} = useSelector((state: RootState) => state.callingView)
    const dispatch = useDispatch()
    const {callingId} = useParams<{ callingId: string }>()

    useEffect(() => {
        dispatch(getCallingResultCommonById(callingId))
        dispatch(getCallingResultPieChartById(callingId))
        dispatch(getCallingResultChartById(callingId))

        return () => {
            dispatch(resetState())
        }
    }, [])

    const tooltipFormatter = (value: number) => {
        return [value, 'Успешные звонки']
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>
                {common.result?.name || ''}
            </div>
            <div className={styles.cards}>
                <div className={styles.rowCards}>
                    <Substrate className={classNames(styles.card, styles.progress)}>
                        <div className={styles.head}>
                            <div className={styles.smallLightFont}>Прогресс</div>
                            <div className={styles.bigBlackFont}>
                                {common.result?.progress.percentEnd}%
                            </div>
                            <div className={styles.smallBlackFont}>
                                {common.result?.progress.countEnd} из {common.result?.progress.countCallers}
                                {common.result?.endDialing ? ' (в процессе)' : ' (завершен)'}
                            </div>
                        </div>
                        <div className={styles.body}>
                            <LinearProgress value={common.result?.progress.percentEnd ?? 0}
                                            variant={'determinate'}
                                            className={classNames(styles.progressBar, common.result?.status === 'RUN'
                                                                                      ? styles.running
                                                                                      : '')}/>
                        </div>
                    </Substrate>
                    <Substrate className={classNames(styles.card, styles.callersBase)}>
                        <div className={styles.head}>
                            <div className={styles.smallLightFont}>База данных</div>
                            <div className={styles.bigBlackFont}>
                                {common.result?.callersBase.name}
                            </div>
                            <div className={styles.smallBlackFont}>
                                {common.result?.callersBase.countCallers} эл
                            </div>
                        </div>
                        <div className={styles.body}>
                            {
                                common.result &&
                                <Link to={routes.callersBaseView(common.result.callersBase.id)}
                                      className={styles.link}>
                                    Перейти к базе
                                </Link>
                            }
                        </div>
                    </Substrate>
                </div>
                <div className={styles.rowCards}>
                    <Substrate className={classNames(styles.card, styles.dateTime)}>
                        <div className={styles.head}>
                            <div className={styles.smallLightFont}>Период обзванивания</div>
                            <div>
                                <span className={styles.bigLightFont}>
                                    начало
                                </span>
                                <span className={styles.bigBlackFont}>
                                    {common.result && ` ${formatDate(common.result?.startDialing, true, true)}`}
                                </span>
                            </div>

                            {common.result?.endDialing && <div>
                                <span className={styles.bigLightFont}>
                                    конец
                                </span>
                                <span className={styles.bigBlackFont}>
                                    {` ${formatDate(common.result?.endDialing, true, true)}`}
                                </span>
                            </div>}
                        </div>
                        <div className={styles.body}>

                        </div>
                    </Substrate>
                    <Substrate className={classNames(styles.card, styles.scenario)}>
                        <div className={styles.head}>
                            <div className={styles.smallLightFont}>Сценарий</div>
                            <div className={styles.bigBlackFont}>
                                {common.result?.scenario.name}
                            </div>
                            <div className={styles.smallBlackFont}>
                                {common.result?.scenario.countSteps} шагов
                            </div>
                        </div>
                        <div className={styles.body}>
                            {
                                common.result &&
                                <Link to={routes.scenarioView(common.result.scenario.scenarioId)}
                                      className={styles.link}>
                                    Перейти к сценарию
                                </Link>
                            }
                        </div>
                    </Substrate>
                </div>
                <div className={styles.rowCards}>
                    <Substrate className={classNames(styles.card, styles.pieChart)}>
                        <div className={styles.head}>
                            <div className={styles.smallLightFont}>Статус звонков</div>
                            <div className={styles.bigBlackFont}>
                                {pieChart.result?.percentSuccess}% успешных
                            </div>
                            <div className={styles.smallBlackFont}>
                                {pieChart.result?.countSuccess} из {pieChart.result?.countCallers}
                            </div>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.pieChart}>
                                <PieChart width={190}
                                          height={190}>
                                    <Pie data={pieChart.result?.parts}
                                         dataKey={'value'}
                                         nameKey={'name'}
                                         label={false}
                                         labelLine={false}
                                         startAngle={90}
                                         endAngle={-270}
                                         outerRadius={90}
                                         legendType={'square'}
                                    >
                                        {
                                            pieChart.result?.parts.map((el) =>
                                                <Cell key={el.key}
                                                      fill={el.color}/>)
                                        }
                                    </Pie>
                                    <Tooltip/>
                                </PieChart>
                                <ul className={styles.legend}>
                                    {
                                        pieChart.result?.parts.map((el) => (
                                            <li key={el.key}
                                                className={styles.legendElement}>
                                                <div style={{backgroundColor: el.color}}/>
                                                {el.name}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </div>
                    </Substrate>
                    <Substrate className={classNames(styles.card, styles.chart)}>
                        <div className={styles.head}>
                            <div className={styles.smallLightFont}>Время суток / успешные звонки</div>
                        </div>
                        <div className={styles.body}>
                            {
                                <ResponsiveContainer width={'100%'}
                                                     height={250}>
                                    <LineChart data={chart.result ?? []}>
                                        <XAxis dataKey="name"/>
                                        <YAxis/>
                                        <Tooltip formatter={tooltipFormatter}/>
                                        <Line type={'monotone'}
                                              dataKey={'successCalls'}
                                              stroke={'#ffae00'}
                                              strokeWidth={4}
                                              dot={false}/>
                                    </LineChart>
                                </ResponsiveContainer>
                            }
                        </div>
                    </Substrate>
                </div>
            </div>
            <div className={styles.table}>
                <CallingViewTable callingId={callingId}/>
            </div>
        </div>
    )
}

export default CallingViewBody

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}: PieLabelRenderProps) => {
    const radius = (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5
    const x = (cx as number) + (radius as number) * Math.cos(-(midAngle as number) * RADIAN)
    const y = (cy as number) + (radius as number) * Math.cos(-(midAngle as number) * RADIAN)

    return (
        <text x={x}
              y={y}
              fill="white"
              textAnchor={x > (cx as number) ? 'start' : 'end'}
              dominantBaseline="central">
            {`${((percent as number) * 100).toFixed(0)}%`}
        </text>
    )
}
