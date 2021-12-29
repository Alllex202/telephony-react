import React, {useState} from 'react';
import cardStyles from 'shared/styles/card/styles.module.scss';
import styles from './styles.module.scss';
import {FetchStatuses} from 'shared/types/fetch-statuses';
import {useDispatch} from 'react-redux';
import {DefaultAxiosError} from 'shared/types/base-response-error';
import {Link} from 'react-router-dom';
import routes from 'routing/routes';
import Card from 'components/ui-kit/card';
import {classNames, formatDate} from 'shared/utils';
import BtnCircle from 'components/ui-kit/btn-circle';
import Menu from 'components/ui-kit/menu';
import MenuItem from 'components/ui-kit/menu-item';
import Icon from 'components/ui-kit/icon';
import {CallingModel, CallingStatuses} from 'core/api';
import {deleteCalling} from 'core/api/requests/calling';
import {deleteCallingById} from 'store/features/calling/list';
import {LinearProgress} from '@mui/material';
import BtnSecond from 'components/ui-kit/btn-second';

type Props = {
    data: CallingModel,
    className?: string,
    callingStatus: CallingStatuses,
}

const CallingCard = ({data, callingStatus, className}: Props) => {
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
                    dispatch(deleteCallingById({id: data.id, callingStatus}));
                }
            })
            .catch((err: DefaultAxiosError) => {
                // show noty
                console.log(err.response?.data.message || 'Необработанная ошибка');
                setStatuses({isError: true});
            });
    };

    const handlerCancel = () => {
        closeOptions();
        if (!data.id) return;
    };

    const handlerStop = () => {
        closeOptions();
        if (!data.id) return;
    };

    const handlerRun = (e: React.MouseEvent) => {
        e.preventDefault();
        closeOptions();
        if (!data.id) return;
    };

    return (
        <>
            {
                data.id &&
                <Link to={routes.callingView(data.id)}
                      className={statuses.isLoading ? 'd-none' : ''}>
                    <Card className={classNames(className, cardStyles.card, styles.card)}
                          isActive={!!anchorEl}>
                        <div className={classNames(cardStyles.wrapper, styles.wrapper)}>
                            <div onClick={e => e.preventDefault()}
                                 className={cardStyles.options_wrapper}>
                                <BtnCircle iconName={'more_horiz'}
                                           iconType={'round'}
                                           className={cardStyles.options_btn}
                                           onClick={openOptions}
                                           isActive={!!anchorEl}/>
                                <Menu anchorEl={anchorEl}
                                      open={!!anchorEl}
                                      onClose={closeOptions}>
                                    {
                                        callingStatus === 'SCHEDULED' &&
                                        <MenuItem onClick={handlerCancel}
                                                  isDanger
                                                  iconName={'delete_forever'}
                                                  iconType={'round'}>
                                            Отменить
                                        </MenuItem>
                                    }
                                    {
                                        callingStatus === 'RUN' &&
                                        <MenuItem onClick={handlerStop}
                                                  isDanger
                                                  iconName={'delete_forever'}
                                                  iconType={'round'}>
                                            Остановить
                                        </MenuItem>
                                    }
                                    {
                                        callingStatus === 'DONE' &&
                                        <MenuItem onClick={handlerDelete}
                                                  isDanger
                                                  iconName={'delete_forever'}
                                                  iconType={'round'}>
                                            Удалить
                                        </MenuItem>
                                    }
                                </Menu>
                            </div>
                            <div className={cardStyles.header}>
                                <h2 className={cardStyles.title}>{data.name}</h2>
                                <div className={classNames(cardStyles.description, styles.description)}>
                                    <div className={cardStyles.info}>
                                        <Icon name={'calendar_today'}
                                              type={'round'}
                                              className={cardStyles.icon}/>
                                        {/*16 ноя, 16:30*/}
                                        {data.startDate && formatDate(data.startDate)}
                                    </div>
                                    <div className={cardStyles.info}>
                                        <Icon name={'forum'}
                                              type={'round'}
                                              className={cardStyles.icon}/>
                                        {data.scenario.name}
                                    </div>
                                    <div className={cardStyles.info}>
                                        <Icon name={'people_alt'}
                                              type={'round'}
                                              className={cardStyles.icon}/>
                                        {data.callersBase.name}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.body}>
                                {
                                    callingStatus === 'SCHEDULED'
                                    ? <BtnSecond text={'Запустить сейчас'}
                                                 iconType={'round'}
                                                 iconName={'play_arrow'}
                                                 iconPosition={'end'}
                                                 className={styles.btnRun}
                                                 onClick={handlerRun}/>
                                    : <>
                                        <LinearProgress value={data.percentEnd}
                                                        variant={'determinate'}
                                                        className={classNames(styles.progressBar, callingStatus === 'RUN'
                                                                                                  ? styles.running
                                                                                                  : '')}/>
                                        <span className={styles.label}>{data.percentEnd}% успешных</span>
                                    </>
                                }
                            </div>
                        </div>
                    </Card>
                </Link>
            }
        </>
    );
};

export default CallingCard;