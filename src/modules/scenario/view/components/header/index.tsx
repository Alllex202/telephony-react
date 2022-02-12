import React from 'react'
import styles from './styles.module.scss'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {changeName, saveScenario} from 'store/scenario/view'
import HiddenInputWithIcon from 'components/hidden-input-with-icon'
import {useSelectorApp} from 'shared/hoocks'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import {ArrowBackRounded} from '@mui/icons-material'
import BtnPrimary from 'components/ui-kit-v2/btn-primary'
import {classNames} from 'shared/utils'

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
                    value={actual.name}
                    onChange={onChangeName}
                    inputClassName={classNames(styles.name, styles.input, styles.small)}
                    iconClassName={styles.icon}
                    textClassName={styles.nameText}
                    wrapperClassName={styles.nameWrapper}
                    btnClassName={styles.btn}
                />
            )}

            <BtnPrimary className={styles.save} onClick={handlerSave} loading={status.isLoading}>
                Сохранить
            </BtnPrimary>
        </div>
    )
}

export default ScenarioViewHeader
