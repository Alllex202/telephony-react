import React from 'react'
import styles from './styles.module.scss'
import {classNames} from 'shared/utils'

type Props = {
    text: string
    className?: string
}

const Tag = ({className, text}: Props) => {
    return <div className={classNames(className, styles.tag)}>{text}</div>
}

export default Tag
