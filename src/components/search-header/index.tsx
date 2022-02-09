import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import {SortItem, sortItems} from 'shared/data'
import {useDoubleInput, useSelectorApp} from 'shared/hoocks'
import {useDispatch} from 'react-redux'
import {changeFilter, resetFilter} from 'store/filter'
import BtnPrimary from 'components/ui-kit-v2/btn-primary'
import {Menu, MenuItem, TextField} from '@mui/material'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import {SortRounded} from '@mui/icons-material'

type Props = {
    onLeftBtn?: React.MouseEventHandler
    textLeftBtn: string
    iconLeftBtn?: React.ReactNode
    onSortItem: () => void
    onSearch: () => void
    isLoading: boolean
}

const SearchHeader = ({
    onLeftBtn,
    textLeftBtn,
    iconLeftBtn,
    onSearch,
    onSortItem,
    isLoading
}: Props) => {
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
        return () => {
            dispatch(resetFilter())
        }
    }, [])

    const handlerOpenSort = (e: any) => {
        setAnchorEl(e.currentTarget)
    }

    const handlerCloseSort = () => {
        setAnchorEl(null)
    }

    const handlerSortItem = (options: SortItem) => () => {
        handlerCloseSort()
        if ((options.sortBy === sortBy && options.direction === direction) || isLoading) return

        dispatch(
            changeFilter({
                sortBy: options.sortBy,
                name: input,
                direction: options.direction,
                text: options.text
            })
        )
        onSortItem()
    }

    const handlerSearch = (event: React.KeyboardEvent) => {
        if (input === lastInput || isLoading) return

        if (event.key === 'Enter') {
            setLastInput(input)
            dispatch(changeFilter({sortBy, name: input, direction, text}))
            onSearch()
        }
    }

    const handlerChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <div className={styles.header}>
            <BtnPrimary className={styles.leftBtn} onClick={onLeftBtn} endIcon={iconLeftBtn}>
                {textLeftBtn}
            </BtnPrimary>
            <TextField
                variant={'filled'}
                size={'mediumBold'}
                value={input}
                onChange={handlerChangeInput}
                className={styles.search}
                type={'search'}
                placeholder={'Поиск'}
                onKeyPress={handlerSearch}
                autoComplete={'off'}
            />
            <BtnSecondary
                onClick={handlerOpenSort}
                className={styles.sort}
                endIcon={<SortRounded />}
            >
                {text}
            </BtnSecondary>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handlerCloseSort}>
                {sortItems.map((el, index) => (
                    <MenuItem key={index} onClick={handlerSortItem(el)}>
                        {el.text}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    )
}

export default SearchHeader
