import React from 'react'
import TextareaAutocomplete from '@webscopeio/react-textarea-autocomplete'
import '@webscopeio/react-textarea-autocomplete/style.css'
import styles from './styles.module.scss'
import {useSelector} from 'react-redux'
import {RootState} from 'store'
import {CallersBaseHeaderColumnModel} from 'core/api'

type Props = {
    value: string
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

const ReplicaInput = React.memo(({value, onChange}: Props) => {
    const {callersBaseHeader} = useSelector((state: RootState) => state.scenarioView)
    const variables = callersBaseHeader?.columns ?? []

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault()
        }
    }

    return (
        <TextareaAutocomplete
            trigger={{
                '*': {
                    dataProvider: (token) => {
                        return variables.filter((el) =>
                            el.currentName.toLowerCase().includes(token.toLowerCase())
                        )
                    },
                    component: Item,
                    output: (item, trigger) => {
                        const _item = item as CallersBaseHeaderColumnModel
                        return `*${_item.currentName}`
                    }
                }
            }}
            minChar={0}
            onChange={onChange}
            value={value}
            movePopupAsYouType={true}
            loadingComponent={Loading}
            containerClassName={''}
            className={styles.replicaInput}
            dropdownClassName={styles.dropdown}
            onKeyDown={onKeyDown}
            maxLength={1000}
        />
    )
})

export default ReplicaInput

const Item = (props: any) => {
    return <div>{props.entity.currentName}</div>
}
const Loading = () => <div>Loading</div>
