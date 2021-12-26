import React, {useEffect, useState} from 'react';
import styles from 'shared/styles/header-list/styes.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {useHistory} from 'react-router-dom';
import {changeFilter, resetFilter} from 'store/features/filter';
import routes from 'routing/routes';
import {DirectionSort, sortItems, SortType} from 'shared/data/sort-items';
import {resetCallingStates} from 'store/features/calling/list/list';
import Btn from 'components/ui-kit/btn';
import Input from 'components/ui-kit/input';
import BtnSecond from 'components/ui-kit/btn-second';
import {classNames} from 'shared/utils';
import Menu from 'components/ui-kit/menu';
import MenuItem from 'components/ui-kit/menu-item';

const CallingListHeader = () => {
    const {statuses} = useSelector((state: RootState) => state.callingList);
    const {direction, sortBy, text} = useSelector((state: RootState) => state.filter);
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [input, setInput] = useState<string>('');
    const [lastInput, setLastInput] = useState<string>('');

    useEffect(() => {
        return () => {
            dispatch(resetFilter());
        }
        // eslint-disable-next-line
    }, []);


    function handlerAdd() {
        history.push(routes.callingCreate());
    }

    function handlerOpenSort(e: any) {
        setAnchorEl(e.currentTarget);
    }

    function handlerCloseSort() {
        setAnchorEl(null);
    }

    function handlerSortItem(options: { sortBy: SortType, direction: DirectionSort, text: string }) {
        handlerCloseSort();
        if (statuses.isLoading || (options.sortBy === sortBy && options.direction === direction)) return;

        dispatch(resetCallingStates());
        dispatch(changeFilter({sortBy: options.sortBy, name: input, direction: options.direction, text: options.text}));
    }

    function handlerSearch(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            if (statuses.isLoading || input === lastInput) return;

            setLastInput(input);
            dispatch(resetCallingStates());
            dispatch(changeFilter({sortBy, name: input, direction, text}));
        }
    }

    return (
        <div className={styles.header}>
            <Btn text={'Обзвонить'} iconName={''} iconType={'round'} className={styles.add}
                 onClick={handlerAdd} iconPosition={'end'}/>
            <Input value={input} onChange={e => setInput(e.target.value)} className={styles.search}
                   type={'text'} placeholder={'Поиск'} autoCompleteOff onKeyPress={handlerSearch}/>
            <BtnSecond text={text} iconName={'sort'} iconType={'round'} onClick={handlerOpenSort}
                       className={classNames(styles.sort, direction === 'ASC' ? styles.revert : '')}
                       isActive={!!anchorEl} iconPosition={'end'}/>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handlerCloseSort}>
                {sortItems.map((el, index) =>
                    <MenuItem key={index} onClick={() => handlerSortItem({
                        sortBy: el.sortBy,
                        direction: el.direction,
                        text: el.text
                    })}>
                        {el.text}
                    </MenuItem>)}
            </Menu>
        </div>
    );
};

export default CallingListHeader;
