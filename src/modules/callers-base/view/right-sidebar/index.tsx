import React from 'react'
import styles from './styles.module.scss'
import RightSidebar from 'components/right-sidebar'
import {useSelector} from 'react-redux'
import {RootState} from 'store'
import {Link} from 'react-router-dom'
import {formatDate} from 'shared/utils/format-date'
import Info from './components/info'
import {routes} from 'routing/routes'

const CallersBaseViewRightSidebar = () => {
    const {header, callings} = useSelector((state: RootState) => state.callersBaseView)

    return (
        <RightSidebar>
            {header ? (
                <div className={styles.infoBlock}>
                    <Info title={'Элементов'}>{header.countCallers}</Info>
                    <Info title={'Дата и время загрузки'}>{formatDate(header.created)}</Info>
                    <Info title={'Последнее обновление'}>{formatDate(header.updated)}</Info>
                    <Info title={'Обзванивания'}>
                        {callings?.map((el) => (
                            <span key={el.id} className={styles.linkWrapper}>
                                <Link to={routes.calling.view(el.id ?? '')} className={styles.link}>
                                    {el.name}
                                </Link>
                            </span>
                        ))}
                    </Info>
                </div>
            ) : (
                <>Загрузка...</>
            )}
        </RightSidebar>
    )
}

export default CallersBaseViewRightSidebar
