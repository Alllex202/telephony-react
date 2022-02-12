import React from 'react'
import styles from './styles.module.scss'
import {EditRounded} from '@mui/icons-material'
import HiddenInput from 'components/ui-kit-v2/hidden-input'
import {classNames} from 'shared/utils'

type Props = {
    value: string
    onChange?: (value: string) => void
    disabled?: boolean
    wrapperClassName?: string
    textClassName?: string
    iconClassName?: string
    inputClassName?: string
    btnClassName?: string
}

const HiddenInputWithIcon = ({
    value,
    onChange,
    disabled,
    iconClassName,
    wrapperClassName,
    textClassName,
    inputClassName,
    btnClassName
}: Props) => {
    return (
        <HiddenInput
            value={value}
            onChange={onChange}
            required
            anchorOrigin={{vertical: 'top', horizontal: 'left'}}
            disabled={disabled}
            inputClassName={classNames(styles.big, styles.input, inputClassName)}
            btnClassName={btnClassName}
        >
            <div className={classNames(styles.wrapper, wrapperClassName)}>
                <div className={classNames(styles.text, textClassName)}>{value}</div>
                <EditRounded className={classNames(styles.icon, iconClassName)} />
            </div>
        </HiddenInput>
    )
}

export default HiddenInputWithIcon
