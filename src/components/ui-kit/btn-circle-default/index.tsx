import React from 'react'
import styles from './styles.module.scss'
import Icon from '../icon'
import {classNames} from 'shared/utils'

type Props = {
    iconName: string,
    className?: string,
    onClick?: React.MouseEventHandler,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    isActive?: boolean,
    activeStyle?: string,
}

function BtnCircleDefault({className, iconName, iconType, onClick, isActive, activeStyle}: Props) {
    return (
        <button
            className={classNames(styles.btn, className, isActive ? (activeStyle || styles.active) : '', isActive
                                                                                                         ? activeStyle
                                                                                                         : '')}
            onClick={onClick}>
            <Icon name={iconName}
                  type={iconType}/>
        </button>
    )
}

export default BtnCircleDefault

