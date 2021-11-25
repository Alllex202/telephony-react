import React from 'react';
import styles from './styles.module.scss';
import RightSidebar from "../../../../components/right-sidebar";
import Icon from "../../../../components/ui-kit/icon";

function CallersBaseViewRightSidebar() {
    return (
        <RightSidebar>
            <div className={styles.coffee}>
                Изменение названия переменной еще не сделано
                <br/><br/>
                Здесь может быть ваша реклама
                <br/><br/>
                <Icon name={'coffee'} type={'round'}/>
                <Icon name={'coffee'} type={'round'}/>
                <Icon name={'coffee'} type={'round'}/>
            </div>
        </RightSidebar>
    );
}

export default CallersBaseViewRightSidebar;
