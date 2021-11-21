import React from 'react';
import styles from './styles.module.scss';

type Props = {
    value?: string | number,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    className?: string,
    type?: React.HTMLInputTypeAttribute,
    name?: string,
    id?: string,
    autoCompleteOff?: boolean,
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
}

function Input({value, onChange, placeholder, className, type, name, autoCompleteOff, id, onKeyPress}: Props) {
    return (
        <input className={[styles.input, className].join(' ')} type={type} placeholder={placeholder} onChange={onChange}
               value={value} name={name} autoComplete={autoCompleteOff ? 'new-password' : ''} id={id} onKeyPress={onKeyPress}/>
    );
}

export default Input;
