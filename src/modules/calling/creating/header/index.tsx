import React from 'react'
import styles from './styles.module.scss'
import {useHistory, useParams} from 'react-router-dom'
import {useSelectorApp} from 'shared/hoocks'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import {ArrowBackRounded} from '@mui/icons-material'

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
            <BtnSecondary
                className={callingId ? styles.back : styles.cancel}
                onClick={onCancel}
                startIcon={<ArrowBackRounded />}
            >
                {callingId ? 'Назад' : 'Отменить'}
            </BtnSecondary>
        </div>
    )
}

export default CallingCreatingHeader
