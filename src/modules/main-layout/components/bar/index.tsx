import React, {ReactNode, useState} from 'react'
import styles from './styles.module.scss'
import Logo from './components/logo'
import {IconButton} from '@mui/material'
import {AccountCircleRounded} from '@mui/icons-material'
import {classNames} from 'shared/utils'

type Props = {
    children: ReactNode
}

const Bar = ({children}: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false)

    const toggleProfile = () => {
        setOpen(!isOpen)
    }

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <Logo />
            </div>
            <div className={styles.center}>{children}</div>
            <div className={styles.right}>
                <IconButton
                    className={classNames(styles.profile, isOpen ? styles.active : '')}
                    onClick={toggleProfile}
                    disableRipple={true}
                >
                    <AccountCircleRounded className={styles.icon} />
                </IconButton>
            </div>
        </div>
    )
}

export default Bar
