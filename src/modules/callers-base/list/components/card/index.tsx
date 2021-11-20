import React, {useState} from 'react';
import styles from './styles.module.scss';
import {CallersBaseHeaderModel} from "../../../../../core/api";
import Card from "../../../../../components/ui-kit/card";
import Tag from "../../../../../components/ui-kit/tag";
import Icon from "../../../../../components/ui-kit/icon";
import {formatDate} from "../../../../../shared/utils/format-date";
import {classNames} from "../../../../../shared/utils";
import BtnCircle from "../../../../../components/ui-kit/btn-circle";
import Menu from "../../../../../components/ui-kit/menu";
import MenuItem from "../../../../../components/ui-kit/menu-item";
import {deleteCallersBase} from "../../../../../core/api/requests";
import {FetchStatuses} from "../../../../../shared/types/fetch-statuses";
import {DefaultAxiosError} from "../../../../../shared/types/base-response-error";
import routes from "../../../../../routing/routes";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {deleteCallersBaseById} from "../../../../../store/features/callers-bases/list";

type Props = {
    data: CallersBaseHeaderModel,
    className?: string,
}

function CallersBaseCard({data, className}: Props) {
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [statuses, setStatuses] = useState<FetchStatuses>({isLoading: false, isSuccess: false, isError: false});
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
        deleteCallersBase(data.id)
            .then(res => {
                // show noty
                console.log('База клиентов удалена')
                dispatch(deleteCallersBaseById(data.id));
                // setStatuses({isLoading: false, isSuccess: true, isError: false});
            })
            .catch((err: DefaultAxiosError) => {
                // show noty
                console.log(err.response?.data.message || 'Необработанная ошибка');
                setStatuses({isLoading: false, isSuccess: false, isError: true});
            });
    }

    return (
        <Link to={routes.callersBaseView(data.id)} className={statuses.isLoading ? 'd-none' : ''}>
            <Card className={classNames(className, styles.card)} isActive={!!anchorEl}>
                <div className={styles.wrapper}>
                    <div onClick={e => e.preventDefault()} className={styles.options_wrapper}>
                        <BtnCircle iconName={'more_horiz'} iconType={'round'} className={styles.options_btn}
                                   onClick={openOptions}
                                   isActive={!!anchorEl}/>
                        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={closeOptions}>
                            <MenuItem onClick={handlerDelete} isDanger iconName={'delete_forever'} iconType={'round'}>
                                Удалить
                            </MenuItem>
                        </Menu>
                    </div>
                    <div className={styles.header}>
                        <h2 className={styles.title}>{data.name}</h2>
                        <div className={styles.description}>
                            <div className={styles.info}>
                                <Icon name={'calendar_today'} type={'round'} className={styles.icon}/>
                                {formatDate(data.created)}
                            </div>
                            <div className={styles.info}>
                                <Icon name={'table_rows'} type={'round'} className={styles.icon}/>
                                {data.countCallers} эл
                            </div>
                        </div>
                    </div>
                    <div className={styles.tags}>
                        {data.columns.slice(0, 5).map(el => <Tag text={`#${el.nameInTable}`} key={el.id}
                                                                 className={styles.tag}/>)}
                        {data.columns.length - 5 > 0 &&
                        <Tag text={`+${data.columns.length - 5}`} className={styles.tag}/>}
                    </div>
                </div>
            </Card>
        </Link>
    );
}

export default CallersBaseCard;
