import React from 'react';
import styles from './styles.module.scss';
import Btn from "../../../components/ui-kit/btn";
import BtnTransparent from "../../../components/ui-kit/btn-transparent";
import Input from "../../../components/ui-kit/input";

function TestHeader() {
    return (
        <div className={styles.header}>
            <Btn className={styles.left} text={'Test'} iconPosition={'end'} iconType={'round'} iconName={'bug_report'} />
            <Input className={styles.center} placeholder={'Строка ввода'} type={'text'}/>
            <BtnTransparent className={styles.right} text={'Test'} iconPosition={'end'} iconType={'round'} iconName={'bug_report'} />
        </div>
    );
}

export default TestHeader;
