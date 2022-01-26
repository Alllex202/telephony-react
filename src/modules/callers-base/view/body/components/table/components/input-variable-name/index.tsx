import React from 'react'
import styles from './styles.module.scss'
import HiddenInput from 'components/hidden-input'
import {useDispatch} from 'react-redux'
import {changeCallersBaseCommon} from 'store/callers-bases/view'
import {CallersBaseHeaderColumnModel, CallersBaseHeaderModel} from 'core/api'
import {useDoubleInput} from 'shared/hoocks'

type Props = {
    conditionSave: boolean
    initState: string
    data: CallersBaseHeaderModel | null
    el: CallersBaseHeaderColumnModel
    disabled?: boolean
}

const InputVariableName = ({conditionSave, initState, data, el, disabled}: Props) => {
    const {
        text: name,
        lastText: lastName,
        setText: setName,
        setLastText: setLastName
    } = useDoubleInput(initState)
    const dispatch = useDispatch()

    const save = (currentValue: string) => {
        if (currentValue === lastName || !data) return
        if (currentValue === '' || !conditionSave) {
            setName(lastName)
            return
        }

        dispatch(
            changeCallersBaseCommon({
                ...data,
                columns: data.columns.map((elem) =>
                    elem.id === el.id ? {...elem, currentName: currentValue} : elem
                )
            })
        )
    }

    return (
        <HiddenInput
            text={name}
            lastText={lastName}
            setText={setName}
            setLastText={setLastName}
            callback={save}
            classText={styles.text}
            classInput={styles.input}
            disabled={disabled}
        />
    )
}

export default InputVariableName
