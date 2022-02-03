import React, {HTMLProps} from 'react'
import {classNames} from 'shared/utils'

export type IconTypes = 'outlined' | 'round' | 'sharp' | 'two-tone'
export type IconPositions = 'start' | 'end'

type Props = HTMLProps<HTMLSpanElement> & {
    iconType?: IconTypes
    iconName: string
}

const Icon = ({iconType, iconName, className, ...otherProps}: Props) => {
    return (
        <span
            {...otherProps}
            className={classNames('material-icons', iconType ? `-${iconType}` : '', className)}
        >
            {iconName}
        </span>
    )
}

export default Icon
