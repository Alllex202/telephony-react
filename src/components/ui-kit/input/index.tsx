import React, {ChangeEventHandler} from 'react';
import styles from './styles.module.scss';

type Props = {
    value?: string | number | readonly string[],
    onChange?: ChangeEventHandler,
    placeholder?: string,
    className?: string,
    type?: React.HTMLInputTypeAttribute,
}

function Input({value, onChange, placeholder, className, type}: Props) {
    return (
        <input className={[styles.input, className].join(' ')} type={type} placeholder={placeholder} onChange={onChange}
               value={value}/>
    );
}

export default Input;
