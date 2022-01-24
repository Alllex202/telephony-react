import React, {MouseEventHandler} from 'react'
import styles from './styles.module.scss'
import BtnDefault from '../btn-default'
import {classNames} from 'shared/utils'
import {IconPositions, IconTypes} from 'components/ui-kit/icon'

type Props = {
    text: string
    iconName?: string
    iconType?: IconTypes
    iconPosition?: IconPositions
    className?: string
    onClick?: MouseEventHandler
    isActive?: boolean
    disabled?: boolean
}

const BtnSecond = ({
    text,
    iconName,
    iconType,
    iconPosition,
    className,
    onClick,
    isActive,
    disabled
}: Props) => {
    return (
        <BtnDefault
            className={classNames(styles.btn, isActive ? styles.active : '', className ?? '')}
            text={text}
            iconName={iconName}
            onClick={onClick}
            iconType={iconType}
            iconPosition={iconPosition}
            disabled={disabled}
        />
    )
}

export default BtnSecond
