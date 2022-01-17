import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import BtnSecond from 'components/ui-kit/btn-second'
import {useHistory} from 'react-router-dom'
import {routes} from 'routing/routes'
import Btn from 'components/ui-kit/btn'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from 'store'
import {changeName, saveScenario} from 'store/features/scenario/view'
import InputName from 'shared/components/input-name'

const ScenarioViewHeader = () => {
    const dispatch = useDispatch()
    const {statuses, data} = useSelector((state: RootState) => state.scenarioView)
    const history = useHistory()
    const [name, setName] = useState<string>(data?.name || '')
    const [lastName, setLastName] = useState<string>(name)

    useEffect(() => {
        setName(data?.name || '')
        setLastName(data?.name || '')
    }, [data?.name])

    const handlerBack = () => {
        history.push(routes.scenarioList())
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
            <BtnSecond text={'Назад'}
                       className={styles.back}
                       onClick={handlerBack}
                       iconType={'round'}
                       iconName={'arrow_back'}/>
            {statuses.isLoading
             ? <div className={styles.loading}>Загрузка...</div>
             : <InputName text={name}
                          lastText={lastName}
                          setText={setName}
                          setLastText={setLastName}
                          classNameWrapper={styles.name}
                          classNameInput={styles.nameInput}
                          classNameText={styles.nameText}
                          callback={onChangeName}
                          className={styles.nameWrapper}/>}

            <Btn text={'Сохранить'}
                 className={styles.save}
                 onClick={handlerSave}
                 disabled={statuses.isLoading}/>
        </div>
    )
}

export default ScenarioViewHeader
