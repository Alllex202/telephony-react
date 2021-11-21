import React, {useState} from 'react';
import Btn from "../../components/ui-kit/btn";
import styles from './styles.module.scss';
import BtnSecond from "../../components/ui-kit/btn-second";
import BtnDefault from "../../components/ui-kit/btn-default";
import BtnToggle from "../../components/ui-kit/btn-toggle";
import BtnCircle from "../../components/ui-kit/btn-circle";
import Input from "../../components/ui-kit/input";
import BtnCircleDefault from "../../components/ui-kit/btn-circle-default";
import Modal from "../../components/modal";
import Card from "../../components/ui-kit/card";
import Tag from "../../components/ui-kit/tag";
import Menu from "../../components/ui-kit/menu";
import MenuItem from "../../components/ui-kit/menu-item";

function Test() {
    const [modal, setModal] = useState<boolean>(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.wrapper}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste
                neque recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
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

                <BtnSecond text={'Иконка start'} iconType={'round'} iconName={'upload'} iconPosition={'start'}/>
                <BtnSecond text={'Иконка end'} iconType={'round'} iconName={'upload'} iconPosition={'end'}/>
                <BtnSecond text={'Без иконки'}/>
                <BtnSecond text={'Menu open'} onClick={handleClick}/>

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

                <Card><>123</>
                </Card>

                <div>
                    <Tag text={'#Пример тега'}/>
                </div>
            </div>
            {modal && <Modal isOpened={modal} setOpen={setModal}>Привет</Modal>}
            <Menu open={!!anchorEl} onClose={handleClose} anchorEl={anchorEl}>
                <MenuItem>Кнопка 1</MenuItem>
                <MenuItem>Кнопка 2</MenuItem>
                <MenuItem>Очень большая Кнопка 3</MenuItem>
                <MenuItem isDanger iconName={'delete_forever'} iconType={'round'}>Опасность слева</MenuItem>
                <MenuItem isDanger iconName={'delete_forever'} iconType={'round'} iconPosition={'end'}>Опасность
                    справа</MenuItem>
            </Menu>
        </div>
    );
}

export default Test;
