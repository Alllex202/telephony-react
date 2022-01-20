import React, {useState} from 'react'
import styles from './styles.module.scss'
import HiddenInput from 'components/hidden-input'
import {useDispatch} from 'react-redux'
import {changeCallersBaseHeaderById} from 'store/features/callers-bases/view'
import {CallersBaseHeaderColumnModel, CallersBaseHeaderModel} from 'core/api'

type Props = {
    conditionSave: () => boolean
    initState: string
    data: CallersBaseHeaderModel | null
    el: CallersBaseHeaderColumnModel
}

function InputVariableName({conditionSave, initState, data, el}: Props) {
    const [name, setName] = useState<string>(initState)
    const [lastName, setLastName] = useState<string>(name)
    const dispatch = useDispatch()

    function save(currentValue: string) {
        if (currentValue === lastName || !data) return
        if (currentValue === '' || !conditionSave()) {
            setName(lastName)
            return
        }

        dispatch(
            changeCallersBaseHeaderById({
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
        />
    )
}

export default InputVariableName
