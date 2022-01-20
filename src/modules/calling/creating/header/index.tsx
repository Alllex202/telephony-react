import React from 'react'
import styles from './styles.module.scss'
import BtnSecond from 'components/ui-kit/btn-second'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from 'store'

const CallingCreatingHeader = () => {
    const history = useHistory()
    const {statuses} = useSelector((state: RootState) => state.callingCreating)

    const onCancel = () => {
        if (statuses.isLoading) return

        history.goBack()
    }

    return (
        <div className={styles.header}>
            <BtnSecond
                text={'Отменить'}
                className={styles.cancel}
                onClick={onCancel}
                iconName={'arrow_back'}
                iconType={'round'}
                iconPosition={'start'}
            />
        </div>
    )
}

export default CallingCreatingHeader
