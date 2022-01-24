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
        scenarioView: {statuses, data}
    } = useSelectorApp()
    const history = useHistory()
    const {
        text: name,
        lastText: lastName,
        setText: setName,
        setLastText: setLastName
    } = useDoubleInput(data?.name || '')

    useEffect(() => {
        setName(data?.name || '')
        setLastName(data?.name || '')
    }, [data?.name])

    const handlerBack = () => {
        history.goBack()
    }

    const handlerSave = () => {
        if (statuses.isLoading) return

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
            {statuses.isLoading ? (
                <div className={styles.loading}>Загрузка...</div>
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
                disabled={statuses.isLoading}
            />
        </div>
    )
}

export default ScenarioViewHeader
