import React from 'react'
import {MenuItem as MuiMenuItem} from '@mui/material'
import './custom-styles.scss'
import {classNames} from 'shared/utils'
import Icon from '../icon'

type Props = {
    onClick?: Function
    children?: React.ReactNode
    isDanger?: boolean
    iconName?: string
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone'
    iconPosition?: 'start' | 'end'
}

function MenuItem({onClick, children, isDanger, iconName, iconPosition, iconType}: Props) {
    function handleClick() {
        onClick && onClick()
    }

    return (
        <MuiMenuItem
            onClick={handleClick}
            disableRipple
            className={classNames(
                'custom',
                isDanger ? 'danger' : '',
                iconPosition === 'end' ? 'reverse' : ''
            )}
        >
            {iconName && <Icon name={iconName} type={iconType} />}
            {children}
        </MuiMenuItem>
    )
}

export default MenuItem
