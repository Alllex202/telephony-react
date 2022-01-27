import React, {HTMLProps} from 'react'
import styles from './styles.module.scss'

const Input = React.forwardRef((props: HTMLProps<any>, ref) => {
    return <input {...props} className={[styles.input, props.className].join(' ')} />
})

export default Input
