import React, {ReactNode} from 'react'
import styles from './styles.module.scss'

type Props = {
    children: ReactNode
    className?: string
}

const RightSidebar = ({children, className}: Props) => {
    return (
        <>
            <div className={[styles.sidebar, className ?? ''].join(' ')}>{children}</div>
        </>
    )
}

export default RightSidebar
