import React, {useEffect} from 'react';
import styles from './styles.module.scss';
import BtnSecond from 'components/ui-kit/btn-second';
import {useHistory} from 'react-router-dom';
import routes from 'routing/routes';
import Btn from 'components/ui-kit/btn';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {saveCalling} from 'store/features/calling/creating';

const CallingCreatingHeader = () => {
    const history = useHistory();
    const {statuses} = useSelector((state: RootState) => state.callingCreating);
    const dispatch = useDispatch();

    useEffect(() => {
        if (statuses.isSuccess) {
            history.push(routes.callingList());
        }
        // eslint-disable-next-line
    }, [statuses.isSuccess]);

    const onCancel = () => {
        if (statuses.isLoading) return;

        history.push(routes.callingList());
    };

    const onSave = () => {
        if (statuses.isLoading) return;

        dispatch(saveCalling());
    };

    return (
        <div className={styles.header}>
            <BtnSecond text={'Отменить'}
                       className={styles.cancel}
                       onClick={onCancel}
                       iconName={'arrow_back'}
                       iconType={'round'}
                       iconPosition={'start'}/>
            <Btn text={'Запустить обзванивание'}
                 className={styles.save}
                 onClick={onSave}/>
        </div>
    );
};

export default CallingCreatingHeader;
