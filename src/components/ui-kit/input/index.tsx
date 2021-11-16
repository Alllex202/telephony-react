import React, {ChangeEventHandler} from 'react';
import styles from './styles.module.scss';

type Props = {
    value?: string | number | readonly string[],
    onChange?: ChangeEventHandler,
    placeholder?: string,
    className?: string,
    type?: React.HTMLInputTypeAttribute,
    name?: string,
    id?: string,
    autoCompleteOff?: boolean,
}

function Input({value, onChange, placeholder, className, type, name, autoCompleteOff, id}: Props) {
    return (
        <input className={[styles.input, className].join(' ')} type={type} placeholder={placeholder} onChange={onChange}
               value={value} name={name} autoComplete={autoCompleteOff ? 'new-password' : ''} id={id}/>
    );
}

export default Input;
