import React from 'react'
import styles from './styles.module.scss'
import {IdKey} from 'shared/types/id-key'

type Props = {
    value?: IdKey
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    placeholder?: string
    className?: string
    type?: React.HTMLInputTypeAttribute
    name?: string
    id?: string
    autoCompleteOff?: boolean
    onKeyPress?: React.KeyboardEventHandler<HTMLInputElement>
    max?: IdKey
    min?: IdKey
    onBlur?: React.FocusEventHandler<HTMLInputElement>
}

const Input = ({
    value,
    onChange,
    placeholder,
    className,
    type,
    name,
    autoCompleteOff,
    id,
    onKeyPress,
    max,
    min,
    onBlur
}: Props) => {
    return (
        <input
            className={[styles.input, className].join(' ')}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            name={name}
            autoComplete={autoCompleteOff ? 'new-password' : ''}
            id={id}
            onKeyPress={onKeyPress}
            max={max}
            min={min}
            onBlur={onBlur}
        />
    )
}

export default Input
