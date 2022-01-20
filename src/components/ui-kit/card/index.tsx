import React from 'react'
import styles from './styles.module.scss'
import {classNames} from 'shared/utils'

type Props = {
    className?: string
    children?: React.ReactNode
    isActive?: boolean
    disableHover?: boolean
    onFocus?: React.FocusEventHandler<HTMLDivElement>
    onBlur?: React.FocusEventHandler<HTMLDivElement>
}

function Card({children, className, isActive, disableHover, onFocus, onBlur}: Props) {
    return (
        <div
            className={classNames(
                styles.card,
                className,
                isActive ? styles.active : '',
                'card',
                disableHover ? styles.disableHover : ''
            )}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            <div className={classNames(styles.border, 'card-border')} />
            <div className={classNames(styles.border_active, 'card-border-active')} />
            <div className={classNames(styles.content, 'card-content')}>{children}</div>
        </div>
    )
}

export default Card
