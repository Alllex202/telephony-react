import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {changeName, saveScenario} from 'store/scenario/view'
import HiddenInputWithIcon from 'components/hidden-input-with-icon'
import {useDoubleInput, useSelectorApp} from 'shared/hoocks'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import {ArrowBackRounded} from '@mui/icons-material'
import BtnPrimary from 'components/ui-kit-v2/btn-primary'

const ScenarioViewHeader = () => {
    const dispatch = useDispatch()
    const {
        scenarioView: {
            scenario: {
                status,
                data: {actual}
            }
        }
    } = useSelectorApp()
    const history = useHistory()
    const {
        text: name,
        lastText: lastName,
        setText: setName,
        setLastText: setLastName
    } = useDoubleInput(actual?.name || '')

    useEffect(() => {
        setName(actual?.name || '')
        setLastName(actual?.name || '')
    }, [actual?.name])

    const handlerBack = () => {
        history.goBack()
    }

    const handlerSave = () => {
        if (status.isLoading) return

        dispatch(saveScenario())
    }

    const onChangeName = (name: string) => {
        dispatch(changeName(name))
    }

    return (
        <div className={styles.header}>
            <BtnSecondary
                className={styles.back}
                onClick={handlerBack}
                startIcon={<ArrowBackRounded />}
            >
                Назад
            </BtnSecondary>
            {actual && (
                <HiddenInputWithIcon
                    text={name}
                    setText={setName}
                    lastText={lastName}
                    setLastText={setLastName}
                    classNameWrapper={styles.name}
                    classNameInput={styles.nameInput}
                    classNameText={styles.nameText}
                    callback={onChangeName}
                    className={styles.nameWrapper}
                />
            )}

            <BtnPrimary className={styles.save} onClick={handlerSave} loading={status.isLoading}>
                Сохранить
            </BtnPrimary>
        </div>
    )
}

export default ScenarioViewHeader
