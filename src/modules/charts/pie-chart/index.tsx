import React from 'react'
import styles from './styles.module.scss'
import {Cell, Pie, PieChart as _PieChart, PieLabelRenderProps, Tooltip} from 'recharts'
import {ExtraPieChartPartModel} from 'store/calling/view'

type Props = {
    data: ExtraPieChartPartModel[]
}

const PieChart = ({data}: Props) => {
    return (
        <div className={styles.pieChart}>
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
                        <Cell key={el.key} fill={el.color} />
                    ))}
                </Pie>
                <Tooltip />
            </_PieChart>
            <ul className={styles.legend}>
                {data.map((el) => (
                    <li key={el.key} className={styles.legendElement}>
                        <div style={{backgroundColor: el.color}} />
                        {el.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default PieChart

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}: PieLabelRenderProps) => {
    const radius =
        (innerRadius as number) + ((outerRadius as number) - (innerRadius as number)) * 0.5
    const x = (cx as number) + (radius as number) * Math.cos(-(midAngle as number) * RADIAN)
    const y = (cy as number) + (radius as number) * Math.cos(-(midAngle as number) * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill='white'
            textAnchor={x > (cx as number) ? 'start' : 'end'}
            dominantBaseline='central'
        >
            {`${((percent as number) * 100).toFixed(0)}%`}
        </text>
    )
}
