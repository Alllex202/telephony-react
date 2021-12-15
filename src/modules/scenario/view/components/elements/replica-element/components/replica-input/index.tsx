import React from 'react';
import TextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '@webscopeio/react-textarea-autocomplete/style.css';
import styles from './styles.module.scss';
import {useSelector} from 'react-redux';
import {RootState} from 'store';

type Props = {
    value: string,
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
};

const ReplicaInput = React.memo(({value, onChange}: Props) => {
    const {data} = useSelector((state: RootState) => state.scenarioView);
    const variables = data?.variables ?? [];

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    return (
        <TextareaAutocomplete
            trigger={{
                '*': {
                    dataProvider: (token) => {
                        return variables.filter((el) => el.toLowerCase().includes(token.toLowerCase()));
                    },
                    component: Item,
                    output: (text, trigger) => {
                        return `${trigger}${text}`;
                    },
                },
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
        />
    );
});

export default ReplicaInput;

const Item = (props: any) => {
    return <div>{props.entity}</div>;
};
const Loading = () => <div>Loading</div>;
