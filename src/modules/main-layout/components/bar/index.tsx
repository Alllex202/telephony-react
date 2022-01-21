import React, {ReactNode, useState} from 'react'
import styles from './styles.module.scss'
import Logo from './components/logo'
import BtnToggle from 'components/ui-kit/btn-toggle'

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
                <BtnToggle
                    className={styles.profile}
                    isActive={isOpen}
                    onClick={toggleProfile}
                    iconName={'account_circle'}
                    iconType={'round'}
                />
            </div>
        </div>
    )
}

export default Bar
