import React from 'react'
import styles from './styles.module.scss'
import {useHistory} from 'react-router-dom'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import {ArrowBackRounded} from '@mui/icons-material'

const CallersBaseAddHeader = () => {
    const history = useHistory()

    const handlerBack = () => {
        history.goBack()
    }

    return (
        <>
            <div className={styles.header}>
                <BtnSecondary
                    className={styles.cancel}
                    onClick={handlerBack}
                    startIcon={<ArrowBackRounded />}
                >
                    Отменить
                </BtnSecondary>
            </div>
        </>
    )
}

export default CallersBaseAddHeader
