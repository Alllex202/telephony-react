import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import routes from "../../../routing/routes";
import styles from './styles.module.scss';
import {useQuery} from "react-query";
import {getDatabases, uploadDatabase} from "../../../core/api/requests";
import Modal from "../../../components/modal";
import {DatabaseModel} from "../../../core/api/models";

const DatabaseList: React.FC = () => {
    const {
        data: res,
        // error,
        isError,
        isLoading,
        isSuccess
    } = useQuery('databases', getDatabases);

    const [isOpenedModal, openModal] = useState<boolean>(false);

    const [isDrag, setDrag] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [file, setFile] = useState<File>();

    const [isUploaded, setUploading] = useState<boolean>(false);
    const [isUploadLoading, setUploadLoading] = useState<boolean>(false);
    const [resUploading, setResUploading] = useState<DatabaseModel>();
    const [errUploading, setErrUploading] = useState<string>('');

    const onAddDatabase = () => {
        openModal(true);
    };

    const onDragStart = (e: React.DragEvent) => {
        e.preventDefault();
        setDrag(true);
    };

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDrag(false);
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setFile(e.dataTransfer.files[0]);
    };

    const onUpload = async () => {
        if (file) {
            setUploadLoading(true);
            const formData = new FormData();
            formData.append('file', file);
            const res = await uploadDatabase(formData, name);
            if (res.status === 200) {
                setResUploading(res.data)
                setUploading(true);
            } else {
                setErrUploading('Ошибка загрузки');
                console.log('upload error');
            }
            setUploadLoading(false);
        }
    };

    if (isLoading) {
        return <h1>Идет загрузка ...</h1>
    }
    if (isError) {
        return <h1>Ошибка при загрузке данных</h1>
    }
    if (isSuccess && !res?.data) {
        return <h1>Нет данных</h1>
    }

    return (
        <>
            {isSuccess &&
            <>
                <button onClick={onAddDatabase}>ADD</button>
                <div className={styles.list}>
                    {res?.data.map(db =>
                        <Link key={db.id} to={routes.databaseView(db.id)} style={{marginBottom: 10}}>{db.name}</Link>)}
                </div>
            </>}
            {isOpenedModal &&
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
                            <div>{isDrag ? 'Опустите файл' : 'Переместите файл'}</div>
                            {file && <div>Выбран файл: {file?.name}</div>}
                            {errUploading && <div>{errUploading}</div>}
                        </div>
                        <button disabled={!file || !name || isUploadLoading} onClick={onUpload}
                                style={{width: '100%', fontSize: 30, margin: '20px 0 0'}}>
                            Отправить
                        </button>
                    </>
                    :
                    <>
                        <div>id: {resUploading?.id}</div>
                        <div>name: {resUploading?.name}</div>
                        <div>callers:
                            <ul style={{marginLeft: 40}}>
                                {resUploading?.callers?.map((call, ind) =>
                                    <li key={call.id}>({call.id}) {call.number} ({String(call.valid)})</li>)}
                            </ul>
                        </div>
                        <div>variablesList:
                            <ul style={{marginLeft: 40}}>
                                {resUploading?.variablesList.map((variable, ind) =>
                                    <li key={ind}>{variable}</li>)}
                            </ul>
                        </div>
                        <div>created: {new Date(Number(resUploading?.created)).toString()}</div>
                    </>}
            </Modal>}
        </>
    );
};

export default DatabaseList;
