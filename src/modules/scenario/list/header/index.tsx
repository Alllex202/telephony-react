import React, {useEffect, useState} from 'react';
import headerStyles from 'shared/styles/header-list/styes.module.scss';
import styles from './styles.module.scss';
import Btn from 'components/ui-kit/btn';
import Input from 'components/ui-kit/input';
import BtnSecond from 'components/ui-kit/btn-second';
import {classNames} from 'shared/utils';
import Menu from 'components/ui-kit/menu';
import {DirectionSort, sortItemsScenarioList, SortType} from 'shared/data/sort-items';
import MenuItem from 'components/ui-kit/menu-item';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {useHistory} from 'react-router-dom';
import {changeFilter, resetFilter} from 'store/features/scenario/list/filter';
import routes from 'routing/routes';
import {resetScenariosStates} from 'store/features/scenario/list/list';

const ScenarioListHeader = () => {
    const [input, setInput] = useState<string>('');
    const [lastInput, setLastInput] = useState<string>('');
    const {statuses} = useSelector((state: RootState) => state.scenarioList);
    const {direction, sortBy, text} = useSelector((state: RootState) => state.scenarioFilter);
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);

    useEffect(() => {
        return () => {
            dispatch(resetFilter());
        };
        // eslint-disable-next-line
    }, []);


    function handlerAdd() {
        // TODO created Scenario
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

        dispatch(resetScenariosStates());
        dispatch(changeFilter({sortBy: options.sortBy, name: input, direction: options.direction, text: options.text}));
    }

    function handlerSearch(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            if (statuses.isLoading || input === lastInput) return;

            setLastInput(input);
            dispatch(resetScenariosStates());
            dispatch(changeFilter({sortBy, name: input, direction, text}));
        }
    }

    return (
        <div className={headerStyles.header}>
            <Btn
                text={'Создать сценарий'}
                iconName={'format_list_numbered'}
                iconType={'round'}
                className={classNames(headerStyles.add, styles.add)}
                onClick={handlerAdd}
                iconPosition={'end'}
            />
            <Input value={input} onChange={e => setInput(e.target.value)} className={headerStyles.search}
                   type={'text'} placeholder={'Поиск'} autoCompleteOff onKeyPress={handlerSearch}/>
            <BtnSecond text={text} iconName={'sort'} iconType={'round'} onClick={handlerOpenSort}
                       className={classNames(headerStyles.sort, direction === 'ASC' ? headerStyles.revert : '')}
                       isActive={!!anchorEl} iconPosition={'end'}/>
            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handlerCloseSort}>
                {sortItemsScenarioList.map((el, index) =>
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

export default ScenarioListHeader;