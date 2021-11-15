import React from 'react';
import Btn from "../../components/ui-kit/btn";
import styles from './styles.module.scss';
import BtnTransparent from "../../components/ui-kit/btn-transparent";
import BtnDefault from "../../components/ui-kit/btn-default";
import BtnToggle from "../../components/ui-kit/btn-toggle";
import BtnCircle from "../../components/ui-kit/btn-circle";
import Input from "../../components/ui-kit/input";

function Test() {
    return (
        <>
            <div className={styles.test}>
                <BtnDefault text={'Иконка start'} iconType={'round'} iconName={'upload'} iconPosition={'start'}/>
                <BtnDefault text={'Иконка end'} iconType={'round'} iconName={'upload'} iconPosition={'end'}/>
                <BtnDefault text={'Без иконки'}/>

                <Btn text={'Иконка start'} iconType={'round'} iconName={'upload'} iconPosition={'start'}/>
                <Btn text={'Иконка end'} iconType={'round'} iconName={'upload'} iconPosition={'end'}/>
                <Btn text={'Без иконки'}/>

                <BtnTransparent text={'Иконка start'} iconType={'round'} iconName={'upload'} iconPosition={'start'}/>
                <BtnTransparent text={'Иконка end'} iconType={'round'} iconName={'upload'} iconPosition={'end'}/>
                <BtnTransparent text={'Без иконки'}/>

                <BtnToggle iconName={'account_circle'} iconType={'round'}/>
                <BtnToggle iconName={'account_circle'} iconType={'round'} isActive={true}/>

                <BtnCircle iconName={'upload'} iconType={'round'}/>
                <BtnCircle iconName={'upload'} iconType={'round'} isActive={true}/>

                <Input placeholder={'Пароль'} type={'password'}/>
                <Input placeholder={'Строка ввода'} type={'text'}/>
                <Input placeholder={'Коротка строка'} className={styles.input_short}/>
            </div>
        </>
    );
}

export default Test;
