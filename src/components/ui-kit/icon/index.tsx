import React from 'react'

export type IconTypes = 'outlined' | 'round' | 'sharp' | 'two-tone'
export type IconPositions = 'start' | 'end'

type Props = {
    type?: IconTypes
    name: string
    className?: string
}

const Icon = ({type, name, className}: Props) => {
    return (
        <span
            className={`material-icons material-icons${type ? `-${type}` : ''} ${className ?? ''}`}
        >
            {name}
        </span>
    )
}

export default Icon
