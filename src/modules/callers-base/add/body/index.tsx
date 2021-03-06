import React, {useRef, useState} from 'react'
import styles from './styles.module.scss'
// import Icon from 'components/ui-kit/icon'
import {classNames} from 'shared/utils'
import {uploadCallersBaseExcel} from 'core/api'
import {DefaultAxiosError, FetchStatuses} from 'shared/types'
import {useHistory} from 'react-router-dom'
import {routes} from 'routing/routes'
import HiddenInputWithIcon from 'components/hidden-input-with-icon'
import {handlerError} from 'shared/middleware'
import {useDispatch} from 'react-redux'
import {enqueueSnackbar} from 'features/notifications/store'
import {InfoRounded} from '@mui/icons-material'

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

const CallersBaseAddBody = () => {
    const [name, setName] = useState<string>('Новая база данных')
    const [file, setFile] = useState<File | null>(null)
    const [isDrag, setDrag] = useState<boolean>(false)
    const [statuses, setStatuses] = useState<FetchStatuses>({})
    const history = useHistory()
    const inputFile = useRef<HTMLInputElement | null>(null)
    const dispatch = useDispatch()

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDrag(false)
        tryUploadFile(e.dataTransfer.files)
    }

    const handlerChangeName = (value: string) => {
        setName(value)
    }

    const onDragStart = (e: React.DragEvent) => {
        e.preventDefault()
        setDrag(true)
    }

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setDrag(false)
    }

    const handlerOpenFileExplorer = () => {
        inputFile.current?.click()
    }

    const handlerChangeInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        tryUploadFile(e.currentTarget.files)
    }

    const tryUploadFile = (files: FileList | null) => {
        if (!files) return

        let error: string | null = null

        if (!name) {
            error = 'Необходимо ввести название'
        }
        if (files.length !== 1) {
            error = 'Можно загрузить только 1 файл'
        }
        if (files[0].type !== fileType) {
            error = 'Неподдерживаемый формат файла'
        }
        if (error) {
            setStatuses({error: error, isError: true})
            setFile(null)
            return
        }

        setStatuses({isLoading: true})
        setFile(files[0])
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('name', name)
        uploadCallersBaseExcel(formData)
            .then((res) => {
                setStatuses({isLoading: true})
                dispatch(enqueueSnackbar({message: 'База успешно загружена', type: 'SUCCESS'}))
                history.replace(`${routes.callersBase.view(res.data.id)}?created=true`)
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    setStatuses({
                        error: err.response?.data.message || 'tryUploadFile',
                        isError: true
                    })
                    setFile(null)
                })
            )
    }

    return (
        <>
            <HiddenInputWithIcon value={name} onChange={handlerChangeName} />
            <div className={styles.info}>
                <InfoRounded className={styles.icon} />
                <div className={styles.text}>
                    Здесь описание необходимого формата таблицы, строк и прочее
                </div>
            </div>
            <div
                className={classNames('unselectable', styles.drop, isDrag ? styles.dropped : '')}
                onDrop={onDrop}
                onDragStart={onDragStart}
                onDragLeave={onDragLeave}
                onDragOver={onDragStart}
                onClick={handlerOpenFileExplorer}
            >
                <input
                    type='file'
                    id='file'
                    className={styles.inputFile}
                    onChange={handlerChangeInputFile}
                    ref={inputFile}
                    accept={fileType}
                />
                {!file ? (
                    <span>
                        Перетащите базу данных сюда или нажмите, чтобы выбрать файл
                        <br />
                        Поддерживаемые форматы: xlsx.
                    </span>
                ) : (
                    <span>
                        {file.name}
                        <br />
                        Отправка...
                    </span>
                )}
            </div>
            <div className={styles.error}>{statuses.error}</div>
        </>
    )
}

export default CallersBaseAddBody
