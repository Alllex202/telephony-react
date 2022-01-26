import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import RightSidebar from 'components/right-sidebar'
import {Link, useParams} from 'react-router-dom'
import {formatDate} from 'shared/utils'
import Info from './components/info'
import {routes} from 'routing/routes'
import {useSelectorApp} from 'shared/hoocks'
import {useDispatch} from 'react-redux'
import {getCallingsByCallersBaseId} from 'store/callers-bases/view'

const CallersBaseViewRightSidebar = () => {
    const dispatch = useDispatch()
    const {
        callersBaseView: {
            common,
            callings: {data, statuses}
        }
    } = useSelectorApp()
    const {callersBaseId} = useParams<{callersBaseId: string}>()

    useEffect(() => {
        dispatch(getCallingsByCallersBaseId(callersBaseId))
    }, [callersBaseId])

    return (
        <>
            {common.data && (
                <RightSidebar>
                    <div className={styles.infoBlock}>
                        <Info title={'Элементов'}>{common.data.countCallers}</Info>
                        <Info title={'Дата и время загрузки'}>
                            {formatDate(common.data.created)}
                        </Info>
                        <Info title={'Последнее обновление'}>
                            {formatDate(common.data.updated)}
                        </Info>
                        <Info title={'Обзванивания'}>
                            {data?.map((el) => (
                                <span key={el.id} className={styles.linkWrapper}>
                                    <Link
                                        to={routes.calling.view(el.id ?? '')}
                                        className={styles.link}
                                    >
                                        {el.name}
                                    </Link>
                                </span>
                            ))}
                        </Info>
                    </div>
                </RightSidebar>
            )}
        </>
    )
}

export default CallersBaseViewRightSidebar
