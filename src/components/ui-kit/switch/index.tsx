import React from 'react'
import './styles.scss'
import {Switch as MuiSwitch} from '@mui/material'

type Props = {
    checked?: boolean
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    disabled?: boolean
}

const Switch = ({checked, onChange, disabled}: Props) => {
    return (
        <MuiSwitch
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            disableRipple
            className={'switchCustom'}
        />
    )
}

export default Switch
