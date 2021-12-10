import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import './card-style.scss';
import {Handle, Position, NodeProps, useStoreState} from 'react-flow-renderer';
import {classNames} from 'shared/utils';
import {NodeDataModel} from 'core/api';
import Input from 'components/ui-kit/input';
import Card from 'components/ui-kit/card';
import Switch from 'components/ui-kit/switch';
import BtnCircle from 'components/ui-kit/btn-circle';
import Icon from 'components/ui-kit/icon';
import Menu from 'components/ui-kit/menu';
import MenuItem from 'components/ui-kit/menu-item';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from 'store';
import {
    addAnswer, addEdge, changeAnswer,
    changeNeedAnswer, changePosition,
    changeReplica,
    changeWaitingTime,
    removeAllAnswers, removeAllOutputsEdge, removeAnswer
} from 'store/features/scenario/view';

const _numbers = [1, 2, 3, 4, 5];

const ReplicaElement = ({id, data, selected, dragHandle, xPos, yPos, isDragging}: NodeProps<NodeDataModel>) => {
    // const {} = useSelector((state: RootState) => state.scenarioView);
    // const {nodes, edges} = useStoreState((state) => state)
    // console.log({nodes, edges})
    const dispatch = useDispatch();
    const [isFocus, setFocus] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<Element | null>(null);
    const [numbers, setNumbers] = useState<number[]>(_numbers);
    const [answerEditing, setAnswerEditing] = useState<number | null>(null);
    // console.log(data.answers)

    useEffect(() => {
        let res = _numbers.slice();
        data.answers?.forEach(ans => {
            res = res.filter(num => String(num) !== ans.button);
        });
        setNumbers(res.sort());
        // eslint-disable-next-line
    }, [data.answers]);

    useEffect(() => {
        if (isDragging === false && xPos && yPos) {
            dispatch(changePosition({id, x: xPos, y: yPos}));
        }
    }, [isDragging]);

    const onFocus = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    const handlerOpenMenu = (e: React.MouseEvent<Element>, oldNumber: number) => {
        setAnchorEl(e.currentTarget);
        setAnswerEditing(oldNumber);
    };

    const handlerCloseMenu = () => {
        setAnchorEl(null);
    };

    const handlerSelectNumberKey = (newNumber: number) => {
        handlerCloseMenu();
        if (answerEditing === null) return;

        dispatch(changeAnswer({id, newAnswer: newNumber, oldAnswer: answerEditing}));
    };

    const onChangeNeedAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        // dispatch(removeAllOutputsEdge(id));
        if (data.needAnswer) {
            dispatch(changeWaitingTime({id, value: 0}));
            dispatch(removeAllAnswers({id}));
        } else {
            dispatch(changeWaitingTime({id, value: 30 * 1000}));
            dispatch(addAnswer({id, value: 1}));
        }
        dispatch(changeNeedAnswer({id, value: !data.needAnswer}));
    };

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(changeReplica({id, value: e.currentTarget.value}));
    };

    const onChangeWaitingTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, min, max} = e.target;
        const time = Math.max(Number(min), Math.min(Number(max), Number(value)));
        dispatch(changeWaitingTime({id, value: time * 1000}));
    };

    const onAddAnswer = () => {
        dispatch(addAnswer({id, value: numbers[0]}));
    };

    const onRemoveAnswer = (number: number) => {
        dispatch(removeAnswer({id, value: number}));
    };

    return (
        <Card isActive={selected || isFocus}
              className={classNames(styles.replicaWrapper, 'replica-wrapper', selected || isFocus ? styles.selected : '',
                  data.needAnswer ? styles.extended : '')}
              disableHover={true} onFocus={onFocus} onBlur={onBlur}>
            <div className={styles.replica}>
                <div className={classNames(styles.title, 'draggable-handle')}>Реплика</div>
                <Input type={'text'} className={styles.textInput} value={data.replica} onChange={onChangeText}/>
                {(selected || isFocus || data.needAnswer) && <div className={styles.waitingTime}>
                    <span className={styles.label}>
                        Ожидание ответа
                    </span>
                    <Switch checked={data.needAnswer} onChange={onChangeNeedAnswer}/>
                </div>}
                {
                    data.needAnswer &&
                    <div className={styles.options}>
                        <div className={styles.wrapper}>
                            <Input type={'number'} className={styles.timeInput}
                                   value={data.needAnswer ? data.waitingTime / 1000 : 5}
                                   onChange={onChangeWaitingTime} min={5} max={60}/>
                            <span className={styles.postfix}>сек</span>
                        </div>
                        <div className={styles.answers}>
                            {data.answers?.map(ans =>
                                <div key={ans.button} className={styles.answer}>
                                    <Handle type={'source'} id={ans.id} position={Position.Left}
                                            className={classNames(styles.handle, styles.round)}/>
                                    {
                                        data.answers && data.answers.length > 1 ?
                                            <button className={styles.circle}
                                                    onClick={() => onRemoveAnswer(Number(ans.button))}>
                                                <div className={classNames(styles.container, styles.movable)}>
                                                    <span className={styles.number}>{ans.button}</span>
                                                </div>
                                                <div className={classNames(styles.container, styles.movable)}>
                                                    <Icon name={'remove'} type={'round'} className={styles.icon}/>
                                                </div>
                                            </button> :
                                            <div className={styles.circle}>
                                                <div className={styles.container}>
                                                    <span className={styles.number}>{ans.button}</span>
                                                </div>
                                            </div>
                                    }
                                    <span className={styles.label}>Кнопка {ans.button}</span>
                                    {
                                        numbers.length > 0 &&
                                        <>
                                            <BtnCircle iconName={'arrow_drop_down'} iconType={'round'}
                                                       className={styles.dropDown}
                                                       onClick={(e) => handlerOpenMenu(e, Number(ans.button))}/>
                                        </>
                                    }
                                </div>
                            )}
                            {
                                numbers.length > 0 &&
                                <button className={styles.circle} onClick={onAddAnswer}>
                                    <Icon name={'add'} type={'round'} className={styles.icon}/>
                                </button>
                            }
                        </div>

                        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handlerCloseMenu}>
                            {numbers.map(num =>
                                <MenuItem
                                    key={num}
                                    onClick={() => handlerSelectNumberKey(num)}
                                >
                                    Кнопка {num}
                                </MenuItem>)}
                        </Menu>
                    </div>
                }
            </div>

            <Handle type={'target'} position={Position.Top} className={styles.handle}/>
            {!data.needAnswer &&
            <Handle type={'source'} position={Position.Bottom} className={classNames(styles.handle, styles.round)}/>}
        </Card>
    );
};

export default ReplicaElement;
