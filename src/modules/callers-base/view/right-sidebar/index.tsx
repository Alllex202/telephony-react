import React from 'react';
import styles from './styles.module.scss';
import RightSidebar from 'components/right-sidebar';
import {useSelector} from 'react-redux';
import {RootState} from 'store';
import {Link} from 'react-router-dom';
import {formatDate} from 'shared/utils/format-date';
import Info from './components/info';
import routes from 'routing/routes';

function CallersBaseViewRightSidebar() {
    const {header} = useSelector((state: RootState) => state.callersBaseView);

    return (
        <RightSidebar>
            {header
             ?
             <div className={styles.infoBlock}>
                 <Info title={'Элементов'}>{header.countCallers}</Info>
                 {header.confirmed &&
                 <>
                     <Info title={'Дата и время загрузки'}>{formatDate(header.created)}</Info>
                     <Info title={'Последнее обновление'}>{formatDate(header.updated)}</Info>
                     <Info title={'Обзванивания (fake)'}>
                         {[
                             'Обзванивание',
                             'Обзванивание пример',
                             'Короткое',
                             'Очень-очень длинное название',
                             'Обзванивание 2',
                             'овероверовердлинноеслово',
                         ]
                             .map((el, ind) =>
                                 <span key={ind} className={styles.linkWrapper}>
                                        <Link to={routes.callingView('')} className={styles.link}>{el}</Link>
                                    </span>)}
                     </Info>
                 </>}
             </div>
             :
             <>Загрузка...</>
            }

        </RightSidebar>
    );
}

export default CallersBaseViewRightSidebar;
