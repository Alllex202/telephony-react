import React, {useRef, useState} from 'react';
import styles from './styles.module.scss';
import Icon from "components/ui-kit/icon";
import {classNames} from "shared/utils";
import {uploadCallersBaseExcel} from "core/api/requests";
import {DefaultAxiosError} from "shared/types/base-response-error";
import {useHistory} from "react-router-dom";
import routes from "routing/routes";
import InputName from "modules/components/input-name";

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

function CallersBaseAddBody() {
    const [name, setName] = useState<string>('Новая база данных');
    const [lastName, setLastName] = useState<string>(name);
    const [file, setFile] = useState<File | null>(null);
    const [isDrag, setDrag] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const history = useHistory();
    const inputFile = useRef<HTMLInputElement | null>(null);

    function onDrop(e: React.DragEvent) {
        e.preventDefault();
        setDrag(false);
        tryUploadFile(e.dataTransfer.files)
    }

    function onDragStart(e: React.DragEvent) {
        e.preventDefault();
        setDrag(true);
    }

    function onDragLeave(e: React.DragEvent) {
        e.preventDefault();
        setDrag(false);
    }

    function handlerOpenFileExplorer() {
        inputFile.current?.click();
    }

    function handlerChangeInputFile(e: React.ChangeEvent<HTMLInputElement>) {
        tryUploadFile(e.currentTarget.files)
    }

    function tryUploadFile(files: FileList | null) {
        if (!files) return;
        if (!name) {
            setError('Необходимо ввести название');
            setFile(null);
            return;
        }
        if (files.length !== 1) {
            setError('Можно загрузить только 1 файл');
            setFile(null);
            return;
        }
        if (files[0].type !== fileType) {
            setError('Неподдерживаемый формат файла');
            setFile(null);
            return;
        }

        setError('');
        setFile(files[0]);
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('name', name);
        uploadCallersBaseExcel(formData)
            .then(res => {
                history.push(routes.callersBaseView(res.data.id));
            })
            .catch((err: DefaultAxiosError) => {
                setError(err.response?.data.message || 'Ошибка при отправке');
                setFile(null);
            });
    }

    return (
        <>
            <InputName text={name} lastText={lastName} setText={setName} setLastText={setLastName}/>
            <div className={styles.info}>
                <Icon className={styles.icon} name={'info'} type={'round'}/>
                <div className={styles.text}>
                    Здесь описание необходимого формата таблицы, строк и прочее
                </div>
            </div>
            <div className={classNames(styles.drop, isDrag ? styles.dropped : '')}
                 onDrop={onDrop}
                 onDragStart={onDragStart}
                 onDragLeave={onDragLeave}
                 onDragOver={onDragStart}
                 onClick={handlerOpenFileExplorer}>
                <input type='file' id='file' className={styles.inputFile} onChange={handlerChangeInputFile}
                       ref={inputFile} accept={fileType}/>
                {!file
                    ?
                    <span>Перетащите базу данных сюда или нажмите, чтобы выбрать файл<br/>Поддерживаемые форматы: xlsx.</span>
                    : <span>{file.name}<br/>Отправка...</span>}
            </div>
            <div className={styles.error}>{error}</div>
        </>
    );
}

export default CallersBaseAddBody;
