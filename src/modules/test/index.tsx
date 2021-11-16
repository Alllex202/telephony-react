import React, {useState} from 'react';
import Btn from "../../components/ui-kit/btn";
import styles from './styles.module.scss';
import BtnTransparent from "../../components/ui-kit/btn-transparent";
import BtnDefault from "../../components/ui-kit/btn-default";
import BtnToggle from "../../components/ui-kit/btn-toggle";
import BtnCircle from "../../components/ui-kit/btn-circle";
import Input from "../../components/ui-kit/input";
import BtnCircleDefault from "../../components/ui-kit/btn-circle-default";
import RightSidebar from "../../components/right-sidebar";
import Modal from "../../components/modal";

function Test() {
    const [modal, setModal] = useState<boolean>(false);

    return (
        <>
            <RightSidebar>
                Это опциональная менюшка с правой стороны
            </RightSidebar>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt?
            </p>
            <div className={styles.test}>
                <BtnDefault className={styles.default} text={'Иконка start'} iconType={'round'} iconName={'upload'}
                            iconPosition={'start'}/>
                <BtnDefault className={styles.default} text={'Иконка end'} iconType={'round'} iconName={'upload'}
                            iconPosition={'end'}/>
                <BtnDefault className={styles.default} text={'Без иконки'}/>

                <Btn text={'Иконка start'} iconType={'round'} iconName={'upload'} iconPosition={'start'}/>
                <Btn text={'Иконка end'} iconType={'round'} iconName={'upload'} iconPosition={'end'}/>
                <Btn text={'Без иконки'}/>

                <BtnTransparent text={'Иконка start'} iconType={'round'} iconName={'upload'} iconPosition={'start'}/>
                <BtnTransparent text={'Иконка end'} iconType={'round'} iconName={'upload'} iconPosition={'end'}/>
                <BtnTransparent text={'Без иконки'}/>

                <BtnCircleDefault className={styles.default} iconName={'upload'} iconType={'round'}/>
                <BtnCircleDefault className={styles.default} iconName={'upload'} iconType={'round'} isActive={true}/>

                <BtnToggle iconName={'account_circle'} iconType={'round'}/>
                <BtnToggle iconName={'account_circle'} iconType={'round'} isActive={true}/>

                <BtnCircle iconName={'upload'} iconType={'round'}/>
                <BtnCircle iconName={'upload'} iconType={'round'} isActive={true}/>

                <Input placeholder={'Пароль'} type={'password'} autoCompleteOff/>
                <Input placeholder={'Строка ввода'} type={'text'}/>
                <Input placeholder={'Коротка строка'} className={styles.input_short}/>

                <Btn text={'Modal open'} onClick={() => setModal(true)}/>
            </div>
            {modal && <Modal isOpened={modal} setOpen={setModal}>Привет</Modal>}
        </>
    );
}

export default Test;
