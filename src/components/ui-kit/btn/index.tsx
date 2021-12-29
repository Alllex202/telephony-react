import React, {MouseEventHandler} from 'react'
import styles from './styles.module.scss'
import BtnDefault from '../btn-default'
import {classNames} from 'shared/utils'

type Props = {
    text: string,
    iconName?: string,
    iconType?: 'outlined' | 'round' | 'sharp' | 'two-tone',
    iconPosition?: 'start' | 'end',
    className?: string,
    onClick?: MouseEventHandler,
    isActive?: boolean,
    disabled?: boolean,
}

function Btn({text, iconName, iconType, iconPosition, className, onClick, isActive, disabled}: Props) {
    return (
        <BtnDefault text={text}
                    className={classNames(styles.btn, isActive ? styles.active : '', className ?? '')}
                    onClick={onClick}
                    iconName={iconName}
                    iconPosition={iconPosition}
                    iconType={iconType}
                    disabled={disabled}/>
    )
}

export default Btn
