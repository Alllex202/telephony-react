import React from 'react'
import styles from './styles.module.scss'
import Icon from 'components/ui-kit/icon'
import HiddenInput from 'components/hidden-input'
import {classNames} from 'shared/utils'

type Props = {
    text: string
    lastText: string
    setText: React.Dispatch<React.SetStateAction<string>>
    setLastText: React.Dispatch<React.SetStateAction<string>>
    callback?: (currentValue: string) => void
    classNameWrapper?: string
    classNameInput?: string
    classNameText?: string
    className?: string
    disabled?: boolean
}

const HiddenInputWithIcon = ({
    text,
    setText,
    setLastText,
    lastText,
    callback,
    classNameWrapper,
    classNameInput,
    classNameText,
    className,
    disabled
}: Props) => {
    return (
        <div className={classNames(styles.wrapper, className)}>
            <HiddenInput
                text={text}
                lastText={lastText}
                setLastText={setLastText}
                setText={setText}
                callback={callback}
                classInput={classNames(styles.input, classNameInput)}
                classText={classNames(styles.view, classNameText)}
                classWrapper={classNameWrapper}
                disabled={disabled}
            />
            <Icon name={'edit'} type={'round'} className={styles.icon} />
        </div>
    )
}

export default HiddenInputWithIcon
