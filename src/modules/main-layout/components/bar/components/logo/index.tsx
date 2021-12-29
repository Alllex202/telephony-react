import React from 'react'
import LogoSvg from 'shared/assets/svg/Logo.svg'
import styles from './styles.module.scss'
import {Link} from 'react-router-dom'

function Logo() {
    return (
        <Link to={'/'}><img src={LogoSvg}
                            alt={'logo'}
                            className={styles.logo}/></Link>
    )
}

export default Logo

