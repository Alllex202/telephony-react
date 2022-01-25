import React, {ForwardedRef} from 'react'
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
    maxLength?: number
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
}

const InputTransparent = React.forwardRef(
    (
        {
            value,
            onChange,
            placeholder,
            className,
            type,
            name,
            autoCompleteOff,
            id,
            onKeyPress,
            maxLength,
            onBlur,
            onKeyDown
        }: Props,
        ref: ForwardedRef<HTMLInputElement>
    ) => {
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
                maxLength={maxLength}
                onBlur={onBlur}
                ref={ref}
                onKeyDown={onKeyDown}
            />
        )
    }
)

export default InputTransparent
