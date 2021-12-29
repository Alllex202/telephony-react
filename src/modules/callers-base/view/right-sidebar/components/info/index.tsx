import React from 'react'
import styles from './styles.module.scss'

type Props = {
    children: React.ReactNode,
    title: string
};

const Info = ({children, title}: Props) => {
    return (
        <div className={styles.info}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.detail}>
                {children}
            </div>
        </div>
    )
}

export default Info
