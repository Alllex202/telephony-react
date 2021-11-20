import React from 'react';
import styles from './styles.module.scss';

type Props = {
    value?: string | number | readonly string[],
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any,
    placeholder?: string,
    className?: string,
    type?: React.HTMLInputTypeAttribute,
    name?: string,
    id?: string,
    autoCompleteOff?: boolean,
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

function Input({value, onChange, placeholder, className, type, name, autoCompleteOff, id, onKeyPress}: Props) {
    return (
        <input className={[styles.input, className].join(' ')} type={type} placeholder={placeholder} onChange={onChange}
               value={value} name={name} autoComplete={autoCompleteOff ? 'new-password' : ''} id={id} onKeyPress={onKeyPress}/>
    );
}

export default Input;
