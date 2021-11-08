import React, {useState} from 'react';
import styles from "./styles.module.scss";
import Modal from "../../../components/modal";
import {uploadDatabase} from "../../../core/api/requests";
import {DefaultAxiosError} from "../../../shared/types/base-response-error";
import {DatabaseModel} from "../../../core/api/models";

type Props = {
    insertDatabase: Function;
    isOpenedModal: boolean;
    openModal: Function;
};

const AddDatabaseModal = ({insertDatabase, openModal, isOpenedModal}: Props) => {
    const [name, setName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string>('Переместите сюда файл');

    const [isUploaded, setUploading] = useState<boolean>(false);
    const [isUploadLoading, setUploadLoading] = useState<boolean>(false);
    const [isUploadError, setIsUploadError] = useState<boolean>(false);
    const [databaseUploading, setDatabaseUploading] = useState<DatabaseModel | null>(null);
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
        setIsUploadError(false);
        setStatus('');
    };

    const onUpload = () => {
        if (file) {
            setUploadLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            uploadDatabase(formData, name)
                .then(res => {
                    insertDatabase(res.data);
                    setDatabaseUploading(res.data);
                    setUploading(true);
                    setIsUploadError(false);
                    setStatus('Файл успешно загружен');
                })
                .catch((err: DefaultAxiosError) => {
                    setErrUploading(err.response?.data.message || 'Необработанная ошибка');
                    setUploading(false);
                    setIsUploadError(true);
                    setStatus('Исправьте файл и переместите его сюда заного');
                })
                .finally(() => {
                    setUploadLoading(false);
                });
        }
    };

    return (
        <Modal isOpened={isOpenedModal} setOpen={openModal}>
            {!isUploaded
                ?
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
                            {isUploadError && <div style={{color: 'red'}}>{errUploading}</div>}
                        </div>
                    </div>
                    <button disabled={!file || !name || isUploadLoading} onClick={onUpload}
                            style={{width: '100%', fontSize: 30, margin: '20px 0 0'}}>
                        Отправить
                    </button>
                </>
                :
                <>
                    <div style={{color: 'green'}}>{status}</div>
                    <div>id: {databaseUploading?.id}</div>
                    <div>name: {databaseUploading?.name}</div>
                    <div>callers:
                        <ul style={{marginLeft: 40}}>
                            {databaseUploading?.callers?.map((call) =>
                                <li key={call.id}>({call.id}) {call.number} ({String(call.valid)})</li>)}
                        </ul>
                    </div>
                    <div>variablesList:
                        <ul style={{marginLeft: 40}}>
                            {databaseUploading?.variablesList.map((variable, ind) =>
                                <li key={ind}>{variable}</li>)}
                        </ul>
                    </div>
                    <div>created: {new Date(Number(databaseUploading?.created)).toString()}</div>
                </>}
        </Modal>
    );
};

export default AddDatabaseModal;
