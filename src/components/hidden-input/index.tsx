import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import {classNames} from "shared/utils";
import InputTransparent from "../ui-kit/input-transparent";

type Props = {
    text: string,
    lastText: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    setLastText: React.Dispatch<React.SetStateAction<string>>,
    callback?: Function,
    classText?: string,
    classInput?: string,
    classWrapper?: string
};

const HiddenInput = ({setLastText, setText, lastText, text, callback, classText, classInput ,classWrapper}: Props) => {
    const [isView, setView] = useState<boolean>(true);
    const inputRef = React.createRef<HTMLInputElement>();
    const textRef = useRef<HTMLDivElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const valueRef = useRef<string>(text);

    useEffect(() => {
        if (inputRef.current && !isView) {
            inputRef.current.focus();
            changeWidthInput();
            changeWidthDiv();
        }
        // eslint-disable-next-line
    }, [isView]);

    useEffect(() => {
        changeWidthInput();
        changeWidthDiv();
        // eslint-disable-next-line
    }, [text]);

    const changeWidthInput = () => {
        if (inputRef.current && textRef.current) {
            const viewWidth = textRef.current.getBoundingClientRect().width;
            inputRef.current.style.width = `${viewWidth}px`;
        }
    }

    const changeWidthDiv = () => {
        if (divRef.current && textRef.current) {
            const viewWidth = textRef.current.getBoundingClientRect().width;
            divRef.current.style.width = `${viewWidth}px`;
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        valueRef.current = e.target.value;
        setText(e.target.value);
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        changeView();
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Escape') return;

        valueRef.current = lastText;
        setText(lastText);
        inputRef.current?.blur();
    };

    const onBlur = () => {
        changeView();
    };

    const changeView = () => {
        const trim = valueRef.current.trim();
        if (trim === '') {
            valueRef.current = lastText;
            setText(lastText);
        } else {
            valueRef.current = trim;
            setText(trim)
            setLastText(trim);
        }
        setView(!isView);

        if (!isView) {
            callback && callback(trim || lastText);
        }
    }

    return (
        <>
            <div className={classWrapper} ref={divRef}>
                <div className={classNames(styles.view, classText, !isView ? styles.hidden : '')} onClick={changeView}
                     ref={textRef} title={text}>{text}</div>
                {!isView &&
                <InputTransparent className={classNames(styles.input, classInput)} type="text" value={text}
                                  onChange={onChange} placeholder={'Введите название'} onKeyPress={onKeyPress}
                                  onBlur={onBlur} ref={inputRef} onKeyDown={onKeyDown}/>}
            </div>

        </>
    );
};

export default HiddenInput;
