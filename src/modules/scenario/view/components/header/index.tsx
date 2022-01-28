import React, {useEffect} from 'react'
import styles from './styles.module.scss'
import BtnSecond from 'components/ui-kit/btn-second'
import {useHistory} from 'react-router-dom'
import Btn from 'components/ui-kit/btn'
import {useDispatch} from 'react-redux'
import {changeName, saveScenario} from 'store/scenario/view'
import HiddenInputWithIcon from 'components/hidden-input-with-icon'
import {useDoubleInput, useSelectorApp} from 'shared/hoocks'

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
            <BtnSecond
                text={'Назад'}
                className={styles.back}
                onClick={handlerBack}
                iconType={'round'}
                iconName={'arrow_back'}
            />
            {status.isLoading ? (
                <div className={styles.loading}>
                    {name.substring(0, 10)}
                    {name.length < 11 ? '' : '...'} (Загрузка...)
                </div>
            ) : (
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

            <Btn
                text={'Сохранить'}
                className={styles.save}
                onClick={handlerSave}
                disabled={status.isLoading}
            />
        </div>
    )
}

export default ScenarioViewHeader
