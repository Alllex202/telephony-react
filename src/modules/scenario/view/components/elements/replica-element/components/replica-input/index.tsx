import React, {useState} from 'react';
import TextareaAutocomplete, {TextareaProps} from '@webscopeio/react-textarea-autocomplete';
import TextareaAutosize from 'react-autosize-textarea';
import '@webscopeio/react-textarea-autocomplete/style.css';
import styles from './styles.module.scss';
import {getUniqueId} from 'shared/utils';
import {useSelector} from 'react-redux';
import {RootState} from 'store';

type Props = {
    value: string,
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>
};

const ReplicaInput = React.memo(({value, onChange}: Props) => {
    const {data} = useSelector((state: RootState) => state.scenarioView);
    const variables = data?.variables ?? [];

    const [vars] = useState([getUniqueId(), getUniqueId()]);

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
            // renderToBody={true}
            // textAreaComponent={Textarea}
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

const Textarea = React.forwardRef((props: any, ref) => {
    return <TextareaAutosize {...props} ref={ref}/>;
});
