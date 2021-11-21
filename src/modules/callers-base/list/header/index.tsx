import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import Btn from "../../../../components/ui-kit/btn";
import Input from "../../../../components/ui-kit/input";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../store";
import BtnSecond from "../../../../components/ui-kit/btn-second";
import Menu from "../../../../components/ui-kit/menu";
import MenuItem from "../../../../components/ui-kit/menu-item";
import {useHistory} from "react-router-dom";
import routes from "../../../../routing/routes";
import {DirectionSort, SortType} from "../../../../core/api/requests";
import {changeFilter, resetFilter} from "../../../../store/features/callers-bases/filter";
import {resetCallersBasesStates} from "../../../../store/features/callers-bases/list";

interface sortItem {
    sortBy: SortType,
    direction: DirectionSort,
    text: string,
}

const sortItems: sortItem[] = [
    {sortBy: 'CREATION_DATE', direction: 'DESC', text: 'Сначала новые'},
    {sortBy: 'CREATION_DATE', direction: 'ASC', text: 'Сначала старые'},
];

function CallersBaseListHeader() {
    const {statuses} = useSelector((state: RootState) => state.callersBaseHeaders);
    const {direction, sortBy} = useSelector((state: RootState) => state.callersBasesFilter);
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
        history.push(routes.callersBaseAdd());
    }

    function handlerOpenSort(e: any) {
        setAnchorEl(e.currentTarget);
    }

    function handlerCloseSort() {
        setAnchorEl(null);
    }

    function handlerSortItem(options: { sortBy: SortType, direction: DirectionSort }) {
        handlerCloseSort();
        if (statuses.isLoading || (options.sortBy === sortBy && options.direction === direction)) return;

        dispatch(resetCallersBasesStates());
        dispatch(changeFilter({sortBy: options.sortBy, name: input, direction: options.direction}));
    }

    function handlerSearch(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            if (statuses.isLoading || input === lastInput) return;

            setLastInput(input);
            dispatch(resetCallersBasesStates());
            dispatch(changeFilter({sortBy, name: input, direction}));
        }
    }

    return (
        <div className={styles.header}>
            <Btn text={'Добавить базу'} iconName={'upload'} iconType={'round'} className={styles.add}
                 onClick={handlerAdd}/>
            <Input value={input} onChange={e => setInput(e.target.value)} className={styles.search}
                   type={'search'} placeholder={'Поиск'} autoCompleteOff onKeyPress={handlerSearch}/>
            <BtnSecond text={direction === 'DESC' ? 'Сначала новые' : 'Сначала старые'}
                       iconName={'upload'} iconType={'round'} className={styles.sort} onClick={handlerOpenSort}
                       isActive={!!anchorEl}/>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handlerCloseSort}>
                {sortItems.map((el, index) =>
                    <MenuItem key={index} onClick={() => handlerSortItem({sortBy: el.sortBy, direction: el.direction})}>
                        {el.text}
                    </MenuItem>)}
            </Menu>
        </div>
    );
}

export default CallersBaseListHeader;
