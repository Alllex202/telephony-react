import React from 'react'
import styles from './styles.module.scss'
import Icon, {IconTypes} from '../icon'
import {classNames} from 'shared/utils'

type Props = {
    iconName: string
    className?: string
    onClick?: React.MouseEventHandler
    iconType?: IconTypes
    isActive?: boolean
    activeStyle?: string
}

const BtnCircleDefault = ({
    className,
    iconName,
    iconType,
    onClick,
    isActive,
    activeStyle
}: Props) => {
    return (
        <button
            className={classNames(
                styles.btn,
                className,
                isActive ? activeStyle || styles.active : '',
                isActive ? activeStyle : ''
            )}
            onClick={onClick}
        >
            <Icon name={iconName} type={iconType} />
        </button>
    )
}

export default BtnCircleDefault
