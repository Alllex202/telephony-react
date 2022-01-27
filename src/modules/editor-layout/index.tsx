import React, {ReactNode} from 'react'
import styles from './styles.module.scss'

type Props = {
    children: ReactNode
}

const EditorLayout = ({children}: Props) => {
    return (
        <>
            <div className={styles.wrapper}>{children}</div>
        </>
    )
}

export default EditorLayout
