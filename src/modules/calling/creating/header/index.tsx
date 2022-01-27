import React from 'react'
import styles from './styles.module.scss'
import BtnSecond from 'components/ui-kit/btn-second'
import {useHistory, useParams} from 'react-router-dom'
import {useSelectorApp} from 'shared/hoocks'

const CallingCreatingHeader = () => {
    const history = useHistory()
    const {
        callingCreating: {statuses}
    } = useSelectorApp()
    const {callingId} = useParams<{callingId: string | undefined}>()

    const onCancel = () => {
        if (statuses.isLoading) return

        history.goBack()
    }

    return (
        <div className={styles.header}>
            <BtnSecond
                text={callingId ? 'Назад' : 'Отменить'}
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
