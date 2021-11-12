import React, {useState} from 'react';
import styles from "./styles.module.scss";
import Modal from "../../../components/modal";
import {uploadDatabase} from "../../../core/api/requests";
import {DefaultAxiosError} from "../../../shared/types/base-response-error";
import {FetchStatuses} from "../../../shared/types/fetch-statuses";
import {useHistory} from "react-router-dom";
import routes from "../../../routing/routes";

type Props = {
    insertDatabase: Function;
    isOpenedModal: boolean;
    openModal: Function;
};

const AddDatabaseModal = ({insertDatabase, openModal, isOpenedModal}: Props) => {
    const history = useHistory();
    const [name, setName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>('Переместите сюда файл');
    const [fetchStatus, setFetchStatus] = useState<FetchStatuses>({
        isError: false,
        isLoading: false,
        isSuccess: false
    });
    const [percent, setPercent] = useState<number>(0);
    const [errUploading, setErrUploading] = useState<string>('');

    const onDragStart = (e: React.DragEvent) => {
        e.preventDefault();
        setStatus('Опустите файл');
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setStatus('Переместите сюда файл');
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
        setErrUploading('');
        setFetchStatus({...fetchStatus, isError: false});
        setStatus('');
    };

    const onUpload = () => {
        if (file) {
            setFetchStatus({isLoading: true, isError: false, isSuccess: false});
            const formData = new FormData();
            formData.append('file', file);
            uploadDatabase(formData, name, {
                onUploadProgress: (progressEvent: ProgressEvent) => {
                    const {loaded, total} = progressEvent;
                    const percent = Math.floor((loaded * 100) / total);
                    setPercent(percent);
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`)
                },
            })
                .then(res => {
                    insertDatabase(res.data);
                    setFetchStatus({isLoading: false, isError: false, isSuccess: true});
                    setStatus('Файл успешно загружен');
                    history.push(routes.databaseView(res.data.id));
                })
                .catch((err: DefaultAxiosError) => {
                    setErrUploading(err.response?.data.message || 'Необработанная ошибка');
                    setFetchStatus({isLoading: false, isError: true, isSuccess: false});
                    setStatus('Исправьте файл и переместите его сюда заного');
                });
        }
    };

    return (
        <Modal isOpened={isOpenedModal} setOpen={openModal}>
            <>
                <h1>Название</h1>
                <input style={{width: '100%', fontSize: 30, margin: '20px 0'}} type="text" name="name"
                       value={name}
                       onChange={e => setName(e.target.value)}/>
                <div
                    onDrop={onDrop}
                    onDragStart={onDragStart}
                    onDragLeave={onDragLeave}
                    onDragOver={onDragStart}
                    className={styles.uploader}>
                    <div style={{pointerEvents: 'none'}}>
                        <div>{status}</div>
                        {file && <div>Выбран файл: {file?.name}</div>}
                        {fetchStatus.isError && <div style={{color: 'red'}}>{errUploading}</div>}
                    </div>
                </div>
                <button disabled={!file || !name || fetchStatus.isLoading} onClick={onUpload}
                        style={{width: '100%', fontSize: 30, margin: '20px 0 0'}}>
                    Отправить {fetchStatus.isLoading && <>({percent}%)</>}
                </button>
            </>
        </Modal>
    );
};

export default AddDatabaseModal;
