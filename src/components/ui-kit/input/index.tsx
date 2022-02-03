import React, {ForwardedRef, HTMLProps} from 'react'
import styles from './styles.module.scss'

const Input = React.forwardRef(
    (props: HTMLProps<HTMLInputElement>, ref: ForwardedRef<HTMLInputElement>) => {
        return <input {...props} ref={ref} className={[styles.input, props.className].join(' ')} />
    }
)

export default Input
