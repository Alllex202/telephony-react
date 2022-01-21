import React from 'react'
import styles from './styles.module.scss'
import BtnSecond from 'components/ui-kit/btn-second'
import {useHistory} from 'react-router-dom'

const CallersBaseAddHeader = () => {
    const history = useHistory()

    const handlerBack = () => {
        history.goBack()
    }

    return (
        <>
            <div className={styles.header}>
                <BtnSecond
                    text={'Отменить'}
                    className={styles.cancel}
                    iconName={'arrow_back'}
                    iconType={'round'}
                    onClick={handlerBack}
                    iconPosition={'start'}
                />
            </div>
        </>
    )
}

export default CallersBaseAddHeader
