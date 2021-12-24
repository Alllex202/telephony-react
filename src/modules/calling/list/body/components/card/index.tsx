import React, {useState} from 'react';
import cardStyles from 'shared/styles/card/styles.module.scss';
import styles from './styles.module.scss';
import {FetchStatuses} from 'shared/types/fetch-statuses';
import {useDispatch} from 'react-redux';
import {DefaultAxiosError} from 'shared/types/base-response-error';
import {Link} from 'react-router-dom';
import routes from 'routing/routes';
import Card from 'components/ui-kit/card';
import {classNames} from 'shared/utils';
import BtnCircle from 'components/ui-kit/btn-circle';
import Menu from 'components/ui-kit/menu';
import MenuItem from 'components/ui-kit/menu-item';
import Icon from 'components/ui-kit/icon';
import {formatDate} from 'shared/utils/format-date';
import {CallingModel, callingStatuses, CallingStatuses} from 'core/api';
import Tag from 'components/ui-kit/tag';
import {deleteCalling} from 'core/api/requests/calling';
import {deleteCallingById} from 'store/features/calling/list/list';

type Props = {
    data: CallingModel,
    className?: string,
}

const CallingCard = ({data, className}: Props) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [statuses, setStatuses] = useState<FetchStatuses>({});
    const dispatch = useDispatch();

    const openOptions = (e: React.MouseEvent) => {
        setAnchorEl(e.currentTarget);
    };

    const closeOptions = () => {
        setAnchorEl(null);
    };

    const handlerDelete = () => {
        closeOptions();
        if (!data.id) return;

        setStatuses({isLoading: true});
        deleteCalling(data.id)
            .then(res => {
                // TODO show noty
                console.log('Сценарий удалена');
                if (data.id) {
                    dispatch(deleteCallingById(data.id));
                }
            })
            .catch((err: DefaultAxiosError) => {
                // show noty
                console.log(err.response?.data.message || 'Необработанная ошибка');
                setStatuses({isError: true});
            });
    };

    const getStatus = (type?: CallingStatuses) => {
        if (!type) return 'В ожидании';

        return callingStatuses[type].message;
    };

    return (
        <>
            {
                data.id &&
                <Link to={routes.callingView(data.id)} className={statuses.isLoading ? 'd-none' : ''}>
                    <Card className={classNames(className, cardStyles.card, styles.card)} isActive={!!anchorEl}>
                        <div className={cardStyles.wrapper}>
                            <div onClick={e => e.preventDefault()} className={cardStyles.options_wrapper}>
                                <BtnCircle iconName={'more_horiz'} iconType={'round'} className={cardStyles.options_btn}
                                           onClick={openOptions}
                                           isActive={!!anchorEl}/>
                                <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeOptions}>
                                    <MenuItem onClick={handlerDelete} isDanger iconName={'delete_forever'}
                                              iconType={'round'}>
                                        Удалить
                                    </MenuItem>
                                </Menu>
                            </div>
                            <div className={cardStyles.header}>
                                <h2 className={cardStyles.title}>{data.name}</h2>
                                <div className={cardStyles.description}>
                                    <div className={cardStyles.info}>
                                        <Icon name={'calendar_today'} type={'round'} className={cardStyles.icon}/>
                                        {data.created && formatDate(data.created)}
                                    </div>
                                    <div className={cardStyles.info}>
                                        <Icon name={'calendar_today'} type={'round'} className={cardStyles.icon}/>
                                        {formatDate(data.startDate)}
                                    </div>
                                </div>
                            </div>
                            <div className={cardStyles.tags}>
                                <Tag text={getStatus(data.status)} className={styles.tag}/>
                            </div>
                        </div>
                    </Card>
                </Link>
            }
        </>
    );
};

export default CallingCard;
