import React, {useState} from 'react';
import cardStyles from 'shared/styles/card/styles.module.scss';
import styles from './styles.module.scss';
import {FetchStatuses} from 'shared/types/fetch-statuses';
import {useDispatch} from 'react-redux';
import {deleteScenario} from 'core/api/requests';
import {deleteScenarioById} from 'store/features/scenario/list/list';
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
// import Tag from 'components/ui-kit/tag';
import {ScenarioInfoModel} from 'core/api';

type Props = {
    data: ScenarioInfoModel,
    className?: string,
}

const ScenarioCard = ({data, className}: Props) => {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [statuses, setStatuses] = useState<FetchStatuses>({});
    const dispatch = useDispatch();

    function openOptions(e: any) {
        setAnchorEl(e.currentTarget);
    }

    function closeOptions() {
        setAnchorEl(null);
    }

    async function handlerDelete() {
        closeOptions();
        setStatuses({isLoading: true, isSuccess: false, isError: false});
        deleteScenario(data.id)
            .then(res => {
                // TODO show noty
                console.log('Сценарий удалена')
                dispatch(deleteScenarioById(data.id));
                // setStatuses({isLoading: false, isSuccess: true, isError: false});
            })
            .catch((err: DefaultAxiosError) => {
                // show noty
                console.log(err.response?.data.message || 'Необработанная ошибка');
                setStatuses({isLoading: false, isSuccess: false, isError: true});
            });
    }

    return (
        <Link to={routes.scenarioView(data.id)} className={statuses.isLoading ? 'd-none' : ''}>
            <Card className={classNames(className, cardStyles.card, styles.card)} isActive={!!anchorEl}>
                <div className={cardStyles.wrapper}>
                    <div onClick={e => e.preventDefault()} className={cardStyles.options_wrapper}>
                        <BtnCircle iconName={'more_horiz'} iconType={'round'} className={cardStyles.options_btn}
                                   onClick={openOptions}
                                   isActive={!!anchorEl}/>
                        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeOptions}>
                            <MenuItem onClick={handlerDelete} isDanger iconName={'delete_forever'} iconType={'round'}>
                                Удалить
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className={cardStyles.header}>
                        <h2 className={cardStyles.title}>{data.name}</h2>
                        <div className={cardStyles.description}>
                            <div className={cardStyles.info}>
                                <Icon name={'calendar_today'} type={'round'} className={cardStyles.icon}/>
                                {formatDate(data.created)}
                            </div>
                            <div className={cardStyles.info}>
                                <Icon name={'table_rows'} type={'round'} className={cardStyles.icon}/>
                                {data.countSteps} ш
                            </div>
                        </div>
                    </div>
                    <div className={cardStyles.tags}>
                        {/*{data.columns.slice(0, 5).map(el => <Tag text={`#${el.nameInTable}`} key={el.id}*/}
                        {/*                                         className={styles.tag}/>)}*/}
                        {/*{data.columns.length - 5 > 0 &&*/}
                        {/*<Tag text={`+${data.columns.length - 5}`} className={styles.tag}/>}*/}
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default ScenarioCard;
