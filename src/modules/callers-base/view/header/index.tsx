import React from 'react';
import styles from './styles.module.scss';
import BtnSecond from "../../../../components/ui-kit/btn-second";
import Btn from "../../../../components/ui-kit/btn";
import {useHistory} from "react-router-dom";
import routes from "../../../../routing/routes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import {changeCallersBaseHeaderById} from "../../../../store/features/callers-bases/view";

function CallersBaseViewHeader() {
    const dispatch = useDispatch();
    const {header, statusesHeader} = useSelector((state: RootState) => state.callersBaseView);
    const history = useHistory();

    function handlerBack() {
        history.push(routes.callersBaseList());
    }

    function handlerCalling() {
        // TODO Создать обзвон с текущей базой
        history.push(routes.callingCreating());
    }

    function handlerSave() {
        if (header) {
            dispatch(changeCallersBaseHeaderById({...header, confirmed: true}));
        }
    }

    return (
        <div className={styles.header}>
            <BtnSecond className={styles.back} text={header?.confirmed === false ? 'Отмена' : 'Назад'}
                       iconType={'round'} iconName={'arrow_back'} onClick={handlerBack}/>
            {header &&
            <BtnSecond className={styles.calling} text={'Обзванивание'} iconType={'round'} iconName={'add_ic_call'}
                       iconPosition={'end'} onClick={handlerCalling} disabled={statusesHeader.isLoading}/>}
            {header?.confirmed === false &&
            <Btn className={styles.save} text={'Сохранить'} onClick={handlerSave} disabled={statusesHeader.isLoading}/>}
        </div>
    );
}

export default CallersBaseViewHeader;
