import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import {Fade, IconButton, Popover} from '@mui/material'
import {CloseRounded, DoneRounded} from '@mui/icons-material'
import {classNames} from 'shared/utils'

type Props = {
    value: string
    onChange?: (value: string) => void
    required?: boolean
    disabled?: boolean
    prefix?: string
}

const TableVariable = ({value, onChange, required, disabled, prefix}: Props) => {
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
            <div
                className={classNames(styles.text, disabled ? styles.disabled : '')}
                onClick={handlerOpen}
            >
                {prefix}
                {value}
            </div>
            <Popover
                open={isOpened}
                anchorEl={anchorEl}
                onClose={handlerClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                TransitionComponent={Fade}
                onKeyDown={handlerDoneWithEnter}
            >
                <div className={styles.wrapper}>
                    <input
                        className={styles.input}
                        type='text'
                        value={newValue}
                        onChange={handlerChange}
                    />
                    <IconButton onClick={handlerDone} color={'black'} disabled={disableDone}>
                        <DoneRounded />
                    </IconButton>
                    <IconButton onClick={handlerClose} color={'black'}>
                        <CloseRounded />
                    </IconButton>
                </div>
            </Popover>
        </>
    )
}

export default TableVariable
