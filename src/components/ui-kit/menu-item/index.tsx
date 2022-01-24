import React from 'react'
import {MenuItem as MuiMenuItem} from '@mui/material'
import './custom-styles.scss'
import {classNames} from 'shared/utils'
import Icon, {IconPositions, IconTypes} from '../icon'

type Props = {
    onClick?: Function
    children?: React.ReactNode
    isDanger?: boolean
    iconName?: string
    iconType?: IconTypes
    iconPosition?: IconPositions
}

const MenuItem = ({onClick, children, isDanger, iconName, iconPosition, iconType}: Props) => {
    const handleClick = () => {
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
