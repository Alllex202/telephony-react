import React, {MouseEventHandler} from 'react'
import styles from './styles.module.scss'
import BtnCircleDefault from '../btn-circle-default'
import {classNames} from 'shared/utils'
import {IconTypes} from 'components/ui-kit/icon'

type Props = {
    iconName: string
    className?: string
    onClick?: MouseEventHandler
    iconType?: IconTypes
    isActive?: boolean
    activeStyle?: string
}

const BtnCircle = ({className, iconName, iconType, onClick, isActive, activeStyle}: Props) => {
    return (
        <BtnCircleDefault
            iconName={iconName}
            iconType={iconType}
            className={classNames(className, styles.btn)}
            isActive={isActive}
            onClick={onClick}
            activeStyle={activeStyle || styles.active}
        />
    )
}

export default BtnCircle
