import React, {useState} from 'react'
import styles from './styles.module.scss'
import {Cell, Legend, Pie, PieChart as _PieChart, ResponsiveContainer, Tooltip} from 'recharts'
import {Props as LegendProps} from 'recharts/types/component/DefaultLegendContent'
import {ExtraPieChartPartModel} from 'store/calling/view'
import {PieChartTypes} from 'core/api'

type Props = {
    data: ExtraPieChartPartModel[]
}

const PieChart = ({data}: Props) => {
    const [focused, setFocus] = useState<PieChartTypes | null>(null)

    const renderLegend = React.useCallback((props: LegendProps) => {
        const {payload} = props

        const handlerMouseEnter = (el: any) => () => {
            const {
                payload: {key}
            } = el
            setFocus(key)
        }

        const handlerMouseLeave = () => {
            setFocus(null)
        }

        return (
            <ul className={styles.legend}>
                {payload?.map((el, ind) => (
                    <li
                        key={ind}
                        className={styles.legendElement}
                        onMouseEnter={handlerMouseEnter(el)}
                        onMouseLeave={handlerMouseLeave}
                    >
                        <div style={{backgroundColor: el.color}} />
                        {el.value}
                    </li>
                ))}
            </ul>
        )
    }, [])

    return (
        <div className={styles.pieChart}>
            <ResponsiveContainer width={'100%'} height={190}>
                <_PieChart width={190} height={190}>
                    <Pie
                        data={data}
                        dataKey={'value'}
                        nameKey={'name'}
                        label={false}
                        labelLine={false}
                        startAngle={90}
                        endAngle={-270}
                        outerRadius={90}
                        legendType={'square'}
                    >
                        {data.map((el) => (
                            <Cell
                                key={el.key}
                                fill={el.color}
                                fillOpacity={focused && focused !== el.key ? 0.2 : 1}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                        align={'right'}
                        verticalAlign={'middle'}
                        layout={'vertical'}
                        content={renderLegend}
                        iconSize={12}
                    />
                </_PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChart
