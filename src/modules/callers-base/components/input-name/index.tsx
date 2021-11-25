import React from 'react';
import styles from "./styles.module.scss";
import Icon from "../../../../components/ui-kit/icon";
import InputTransparent from "../../../../components/ui-kit/input-transparent";

type Props = {
    name: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>,
    onBlur?: React.FocusEventHandler<HTMLInputElement>,
}

function NameInput({name, onChange, onKeyPress, onBlur}: Props) {
    return (
        <div className={styles.name}>
            <Icon name={'edit'} type={'round'} className={styles.icon}/>
            <InputTransparent className={styles.input} type="text" value={name} onChange={onChange}
                              placeholder={'Введите название'} maxLength={50} onKeyPress={onKeyPress} onBlur={onBlur}/>
        </div>
    );
}

export default NameInput;
