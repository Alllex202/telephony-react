import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import Btn from 'components/ui-kit/btn'
import Input from 'components/ui-kit/input'
import BtnSecond from 'components/ui-kit/btn-second'
import {classNames} from 'shared/utils'
import Menu from 'components/ui-kit/menu'
import {DirectionSort, sortItems, SortType} from 'shared/data/sort-items'
import MenuItem from 'components/ui-kit/menu-item'
import {useDoubleInput, useSelectorApp} from 'shared/hoocks'
import {useDispatch} from 'react-redux'
import {changeFilter, resetFilter} from 'store/filter'

type Props = {
    onLeftBtn?: React.MouseEventHandler
    textLeftBtn: string
    iconLeftBtn?: string
    onSortItem: () => void
    onSearch: () => void
}

const SearchHeader = ({onLeftBtn, textLeftBtn, iconLeftBtn, onSearch, onSortItem}: Props) => {
    const {
        filter: {direction, sortBy, text}
    } = useSelectorApp()
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState<Element | null>(null)
    const {
        text: input,
        setText: setInput,
        lastText: lastInput,
        setLastText: setLastInput
    } = useDoubleInput('')

    useEffect(() => {
        console.log('create header')
        return () => {
            dispatch(resetFilter())
            console.log('destroy header')
        }
    }, [])

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
        if (options.sortBy === sortBy && options.direction === direction) return

        onSortItem()

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
            if (input === lastInput) return

            onSearch()

            setLastInput(input)
            dispatch(changeFilter({sortBy, name: input, direction, text}))
        }
    }

    const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div className={styles.header}>
            <Btn
                text={textLeftBtn}
                iconName={iconLeftBtn}
                iconType={'round'}
                className={styles.leftBtn}
                onClick={onLeftBtn}
                iconPosition={'end'}
            />
            <Input
                value={input}
                onChange={handlerChangeInput}
                className={styles.search}
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
                className={classNames(styles.sort, direction === 'ASC' ? styles.revert : '')}
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

export default SearchHeader
