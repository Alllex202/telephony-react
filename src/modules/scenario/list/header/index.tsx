import React, {useEffect, useState} from 'react'
import headerStyles from 'shared/styles/header-list/styes.module.scss'
import Btn from 'components/ui-kit/btn'
import Input from 'components/ui-kit/input'
import BtnSecond from 'components/ui-kit/btn-second'
import {classNames} from 'shared/utils'
import Menu from 'components/ui-kit/menu'
import {DirectionSort, sortItems, SortType} from 'shared/data/sort-items'
import MenuItem from 'components/ui-kit/menu-item'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {changeFilter, resetFilter} from 'store/filter'
import {routes} from 'routing/routes'
import {resetScenariosStates} from 'store/scenario/list'
import {createScenario} from 'core/api/requests'
import {DefaultAxiosError} from 'shared/types/base-response-error'
import {FetchStatuses} from 'shared/types/fetch-statuses'
import {enqueueSnackbar} from 'features/notifications/store'
import {handlerError} from 'shared/middleware'
import {useSelectorApp} from 'shared/hoocks'

const ScenarioListHeader = () => {
    const [input, setInput] = useState<string>('')
    const [lastInput, setLastInput] = useState<string>('')
    const {
        filter: {direction, sortBy, text},
        scenarioList: {statuses}
    } = useSelectorApp()
    const [creating, setCreating] = useState<FetchStatuses>({})
    const dispatch = useDispatch()
    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)

    useEffect(() => {
        return () => {
            dispatch(resetFilter())
        }
    }, [])

    const handlerAdd = () => {
        if (creating.isLoading) return

        setCreating({isLoading: true})
        createScenario('Новый сценарий')
            .then((res) => {
                history.push(routes.scenario.view(res.data.id))
                dispatch(enqueueSnackbar({message: 'Создан новый сценарий', type: 'SUCCESS'}))
            })
            .catch(
                handlerError(dispatch, (err: DefaultAxiosError) => {
                    setCreating({
                        isError: true,
                        error: err.response?.data.message || 'Ошибка при создании'
                    })
                })
            )
    }

    const handlerOpenSort = (e: any) => {
        setAnchorEl(e.currentTarget)
    }

    const handlerCloseSort = () => {
        setAnchorEl(null)
    }

    const handlerSortItem = (options: {
        sortBy: SortType
        direction: DirectionSort
        text: string
    }) => {
        handlerCloseSort()
        if (statuses.isLoading || (options.sortBy === sortBy && options.direction === direction))
            return

        dispatch(resetScenariosStates())
        dispatch(
            changeFilter({
                sortBy: options.sortBy,
                name: input,
                direction: options.direction,
                text: options.text
            })
        )
    }

    const handlerSearch = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            if (statuses.isLoading || input === lastInput) return

            setLastInput(input)
            dispatch(resetScenariosStates())
            dispatch(changeFilter({sortBy, name: input, direction, text}))
        }
    }

    return (
        <div className={headerStyles.header}>
            <Btn
                text={'Создать сценарий'}
                iconName={'format_list_numbered'}
                iconType={'round'}
                className={headerStyles.add}
                onClick={handlerAdd}
                iconPosition={'end'}
                disabled={creating.isLoading}
            />
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className={headerStyles.search}
                type={'text'}
                placeholder={'Поиск'}
                autoCompleteOff
                onKeyPress={handlerSearch}
            />
            <BtnSecond
                text={text}
                iconName={'sort'}
                iconType={'round'}
                onClick={handlerOpenSort}
                className={classNames(
                    headerStyles.sort,
                    direction === 'ASC' ? headerStyles.revert : ''
                )}
                isActive={!!anchorEl}
                iconPosition={'end'}
            />
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handlerCloseSort}>
                {sortItems.map((el, index) => (
                    <MenuItem
                        key={index}
                        onClick={() =>
                            handlerSortItem({
                                sortBy: el.sortBy,
                                direction: el.direction,
                                text: el.text
                            })
                        }
                    >
                        {el.text}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default ScenarioListHeader
