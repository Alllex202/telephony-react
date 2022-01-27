import React, {useState} from 'react'
import styles from './styles.module.scss'
import {Cell, Legend, Pie, PieChart as _PieChart, ResponsiveContainer, Tooltip} from 'recharts'
import {ExtraPieChartPartModel} from 'store/calling/view'
import {PieChartTypes} from 'core/api'

type Props = {
    data: ExtraPieChartPartModel[]
}

const PieChart = ({data}: Props) => {
    const [focused, setFocus] = useState<PieChartTypes | null>(null)

    const handlerMouseEnter = (props: any) => {
        const {
            payload: {key}
        } = props
        setFocus(key)
    }

    const handlerMouseLeave = () => {
        setFocus(null)
    }

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
                                fillOpacity={focused && focused !== el.key ? 0.1 : 1}
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
                        onMouseEnter={handlerMouseEnter}
                        onMouseLeave={handlerMouseLeave}
                    />
                </_PieChart>
            </ResponsiveContainer>
        </div>
    )
}

const renderLegend = (props: any) => {
    const {payload, onMouseEnter, onMouseLeave} = props

    const handlerMouseEnter = (el: any) => () => {
        onMouseEnter(el)
    }

    const handlerMouseLeave = (el: any) => () => {
        onMouseLeave(el)
    }

    return (
        <ul className={styles.legend}>
            {payload.map((el: any, ind: number) => (
                <li
                    key={ind}
                    className={styles.legendElement}
                    onMouseEnter={handlerMouseEnter(el)}
                    onMouseLeave={handlerMouseLeave(el)}
                >
                    <div style={{backgroundColor: el.color}} />
                    {el.value}
                </li>
            ))}
        </ul>
    )
}

export default PieChart
