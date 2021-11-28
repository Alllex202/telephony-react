import React from 'react';
import styles from "./styles.module.scss";
import Icon from "../../../../components/ui-kit/icon";
import HiddenInput from "../../../../components/hidden-input";
import {classNames} from "../../../../shared/utils";

type Props = {
    text: string,
    lastText: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setLastText: React.Dispatch<React.SetStateAction<string>>,
    callback?: Function,
    classNameWrapper?: string,
    classNameInput?: string,
    classNameText?: string
}

function InputName({
                       text,
                       setText,
                       setLastText,
                       lastText,
                       callback,
                       classNameWrapper,
                       classNameInput,
                       classNameText
                   }: Props) {
    return (
        <div className={classNames(styles.name)}>
            <HiddenInput text={text} lastText={lastText} setLastText={setLastText} setText={setText} callback={callback}
                         classInput={classNames(styles.input, classNameInput)}
                         classText={classNames(styles.view, classNameText)} classWrapper={classNameWrapper}/>
            <Icon name={'edit'} type={'round'} className={styles.icon}/>
        </div>
    );
}

export default InputName;

