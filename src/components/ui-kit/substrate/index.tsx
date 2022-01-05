import React, {HTMLProps} from 'react'
import styles from './styles.module.scss'
import {classNames} from 'shared/utils'

const Substrate = (props: HTMLProps<HTMLDivElement>) => {
    return (
        <div {...props} className={classNames(styles.substrate, props.className)} />
    )
}

export default Substrate
