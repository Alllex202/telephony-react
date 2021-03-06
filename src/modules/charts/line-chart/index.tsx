import React from 'react'
import {Line, LineChart as _LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import {DataChartModel} from 'core/api'

type Props = {
    data: DataChartModel[]
    nameTooltip: string
}

const LineChart = ({nameTooltip, data}: Props) => {
    const tooltipFormatter = (value: number) => {
        return [value, nameTooltip]
    }

    return (
        <ResponsiveContainer width={'100%'} height={250}>
            <_LineChart data={data}>
                <XAxis dataKey='time' />
                <YAxis allowDecimals={false} />
                <Tooltip formatter={tooltipFormatter} />
                <Line
                    type={'monotone'}
                    dataKey={'successCalls'}
                    stroke={'#ffae00'}
                    strokeWidth={4}
                    dot={false}
                />
            </_LineChart>
        </ResponsiveContainer>
    )
}

export default LineChart
