import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import {Fade, IconButton, Popover, PopoverOrigin} from '@mui/material'
import {CloseRounded, DoneRounded} from '@mui/icons-material'
import {classNames} from 'shared/utils'
import AutosizeInput from 'react-input-autosize'

type Props = {
    value: string
    onChange?: (value: string) => void
    required?: boolean
    disabled?: boolean
    prefix?: string
    children?: React.ReactNode
    anchorOrigin?: PopoverOrigin
    inputClassName?: string
    btnClassName?: string
}

const HiddenInput = ({
    value,
    onChange,
    required,
    disabled,
    prefix,
    children,
    anchorOrigin,
    inputClassName,
    btnClassName
}: Props) => {
    const [newValue, setNewValue] = useState<string>(value)
    const [anchorEl, setAnchor] = useState<Element | null>(null)
    const isOpened = !!anchorEl
    const disableDone = required && !newValue.trim()

    const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget.value)
    }

    const handlerOpen = (e: React.MouseEvent) => {
        if (disabled) return

        setNewValue(value)
        setAnchor(e.currentTarget)
    }

    const handlerClose = () => {
        setAnchor(null)
    }

    const handlerDoneWithEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handlerDone()
        }
    }

    const handlerDone = () => {
        if (disableDone) return

        onChange && onChange(newValue.trim())
        setAnchor(null)
    }

    useEffect(() => {
        setNewValue(value)
    }, [value])

    return (
        <>
            <div onClick={handlerOpen}>
                {children ?? (
                    <div className={styles.wrapperText}>
                        <div className={classNames(styles.text, disabled ? styles.disabled : '')}>
                            {prefix}
                            {value}
                        </div>
                    </div>
                )}
            </div>
            <Popover
                open={isOpened}
                anchorEl={anchorEl}
                onClose={handlerClose}
                anchorOrigin={
                    anchorOrigin ?? {
                        vertical: 'bottom',
                        horizontal: 'left'
                    }
                }
                TransitionComponent={Fade}
                onKeyDown={handlerDoneWithEnter}
            >
                <div className={styles.wrapper}>
                    <AutosizeInput
                        inputClassName={classNames(styles.input, inputClassName)}
                        type='text'
                        value={newValue}
                        onChange={handlerChange}
                    />
                    <IconButton
                        onClick={handlerDone}
                        color={'black'}
                        disabled={disableDone}
                        className={btnClassName}
                    >
                        <DoneRounded />
                    </IconButton>
                    <IconButton onClick={handlerClose} color={'black'} className={btnClassName}>
                        <CloseRounded />
                    </IconButton>
                </div>
            </Popover>
        </>
    )
}

export default HiddenInput
