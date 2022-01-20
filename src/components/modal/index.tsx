import React from 'react'
import styles from './styles.module.scss'

type Props = {
    children: React.ReactNode
    isOpened: boolean
    setOpen: Function
}

const Modal = ({children, isOpened, setOpen}: Props) => {
    return (
        <div
            className={[styles.modal, !isOpened && styles.hide].join(' ')}
            onClick={() => setOpen(false)}
        >
            <div className={styles.content} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal
