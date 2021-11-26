import React from 'react';
import styles from "./styles.module.scss";
import Icon from "../../../../components/ui-kit/icon";
import HiddenInput from "../../../../components/hidden-input";

type Props = {
    text: string,
    lastText: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setLastText: React.Dispatch<React.SetStateAction<string>>,
    callback?: Function,
}

function InputName({text, setText, setLastText, lastText, callback}: Props) {
    return (
        <div className={styles.name}>
            <HiddenInput text={text} lastText={lastText} setLastText={setLastText} setText={setText} callback={callback}
                         classNameInput={styles.input} classNameText={styles.view}/>
            <Icon name={'edit'} type={'round'} className={styles.icon}/>
        </div>
    );
}

export default InputName;

