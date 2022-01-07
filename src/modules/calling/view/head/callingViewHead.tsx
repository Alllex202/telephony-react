import React from 'react'
import styles from './styles.module.scss'
import BtnSecond from 'components/ui-kit/btn-second'
import Btn from 'components/ui-kit/btn'
import {useHistory, useParams} from 'react-router-dom'
import routes from 'routing/routes'
import {useDispatch} from 'react-redux'
import {apiRoutes} from 'core/api'

const CallingViewHead = () => {
    const history = useHistory()
    const {callingId} = useParams<{ callingId: string }>()

    const onBack = () => {
        history.push(routes.callingList())
    }

    const onExport = () => {
        const link = document.createElement('a')
        link.href = `${apiRoutes.export.calling(callingId)}`
        link.click()
    }

    return (
        <div className={styles.header}>
            <BtnSecond text={'Назад'}
                       iconType={'round'}
                       iconName={'arrow_back'}
                       className={styles.back}
                       onClick={onBack}/>
            <Btn text={'Экспорт'}
                 className={styles.export}
                 onClick={onExport}/>
        </div>
    )
}

export default CallingViewHead
