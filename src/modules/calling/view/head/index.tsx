import React from 'react'
import styles from './styles.module.scss'
import {useHistory, useParams} from 'react-router-dom'
import {apiRoutes} from 'core/api'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import {ArrowBackRounded} from '@mui/icons-material'
import BtnPrimary from 'components/ui-kit-v2/btn-primary'
import {useSelectorApp} from 'shared/hoocks'

const CallingViewHeader = () => {
    const {
        callingView: {
            common: {data}
        }
    } = useSelectorApp()
    const history = useHistory()
    const {callingId} = useParams<{callingId: string}>()

    const onBack = () => {
        history.goBack()
    }

    const onExport = () => {
        if (data?.status !== 'DONE') return

        const link = document.createElement('a')
        link.href = `${apiRoutes.export.calling(callingId)}`
        link.click()
    }

    return (
        <div className={styles.header}>
            <BtnSecondary className={styles.back} onClick={onBack} startIcon={<ArrowBackRounded />}>
                Назад
            </BtnSecondary>
            <BtnPrimary
                className={styles.export}
                onClick={onExport}
                disabled={data?.status !== 'DONE'}
            >
                Экспорт
            </BtnPrimary>
        </div>
    )
}

export default CallingViewHeader
