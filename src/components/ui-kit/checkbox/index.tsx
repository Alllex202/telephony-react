import React from 'react'
import './styles.scss'
import {Checkbox as _Checkbox} from '@mui/material'
import {CheckboxProps} from '@mui/material/Checkbox/Checkbox'

const Checkbox = (props: CheckboxProps) => {
    return <_Checkbox {...props} className={'custom-checkbox'} />
}

export default Checkbox
