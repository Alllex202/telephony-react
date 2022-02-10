import React, {useEffect, useState} from 'react'
import styles from './styles.module.scss'
import '../element/element-style.scss'
import {Handle, NodeProps, Position} from 'react-flow-renderer'
import {classNames} from 'shared/utils'
import {NodeDataModel} from 'core/api'
import Card from 'components/ui-kit/card'
import {useDispatch} from 'react-redux'
import {
    addAnswer,
    changeAnswer,
    changePositionElement,
    removeAnswer,
    setNeedAnswer,
    setReplica,
    setWaitingTime
} from 'store/scenario/view'
import ReplicaInput from './components/replica-input'
import {IconButton, Menu, MenuItem, Slider, Switch} from '@mui/material'
import {AddRounded, ArrowDropDownRounded, RemoveRounded} from '@mui/icons-material'

interface Button {
    name: string
    isUsed: boolean
}

const _buttons: Button[] = [
    {name: '1', isUsed: false},
    {name: '2', isUsed: false},
    {name: '3', isUsed: false},
    {name: '4', isUsed: false},
    {name: '5', isUsed: false},
    {name: '6', isUsed: false},
    {name: '7', isUsed: false},
    {name: '8', isUsed: false},
    {name: '9', isUsed: false},
    {name: '0', isUsed: false}
]

const ReplicaElement = React.memo(
    ({id, data, selected, dragHandle, xPos, yPos, isDragging}: NodeProps<NodeDataModel>) => {
        const dispatch = useDispatch()
        const [menu, setMenu] = useState<{buttons: Button[]; isShow: boolean}>({
            buttons: _buttons,
            isShow: true
        })
        const [isFocus, setFocus] = useState<boolean>(false)
        const [anchorEl, setAnchorEl] = useState<Element | null>(null)
        const [oldButton, setOldButton] = useState<string | null>(null)

        const onFocus = () => {
            setFocus(true)
        }

        const onBlur = () => {
            setFocus(false)
        }

        const onOpenMenu = (oldButton: string) => (e: React.MouseEvent) => {
            setAnchorEl(e.currentTarget)
            setOldButton(oldButton)
        }

        const onCloseMenu = () => {
            setAnchorEl(null)
        }

        const onSelectNumberKey = (newButton: string) => () => {
            onCloseMenu()
            if (oldButton === null) return

            dispatch(changeAnswer({elementId: id, newButton, oldButton}))
        }

        const onChangeNeedAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNeedAnswer({elementId: id, isNeed: !data.needAnswer}))
        }

        const onChangeReplica = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            dispatch(setReplica({elementId: id, replica: e.target.value}))
        }

        const onChangeWaitingTime = (e: Event, value: number | number[]) => {
            if (typeof value !== 'number') return

            dispatch(
                setWaitingTime({
                    elementId: id,
                    time: Number(value) * 1000
                })
            )
        }

        const onAddAnswer = () => {
            if (!menu.isShow) return
            const unusedBtn = menu.buttons.find((btn) => !btn.isUsed)
            if (!unusedBtn) return

            dispatch(addAnswer({elementId: id, button: unusedBtn.name}))
        }

        const onRemoveAnswer = (answerId: string) => () => {
            dispatch(removeAnswer({elementId: id, answerId}))
        }

        useEffect(() => {
            const buttons = menu.buttons.map((btn) =>
                data.answers?.some((ans) => ans.button === btn.name)
                    ? {...btn, isUsed: true}
                    : {...btn, isUsed: false}
            )
            const isShow = buttons.some((btn) => !btn.isUsed)
            setMenu({buttons, isShow})
        }, [data.answers])

        useEffect(() => {
            if (isDragging === false && xPos && yPos) {
                dispatch(changePositionElement({elementId: id, x: xPos, y: yPos}))
            }
        }, [isDragging])

        return (
            <Card
                isActive={selected || isFocus}
                className={classNames(
                    styles.replicaWrapper,
                    'element-wrapper',
                    styles.selected,
                    data.needAnswer ? styles.extended : ''
                )}
                disableHover={true}
                onFocus={onFocus}
                onBlur={onBlur}
            >
                <div className={styles.replica}>
                    <div className={classNames(styles.title, 'draggable-handle')}>Реплика</div>
                    <ReplicaInput value={data.replica} onChange={onChangeReplica} />
                    <div className={styles.waitingTime}>
                        <span className={styles.label}>Ожидание ответа</span>
                        <Switch checked={data.needAnswer} onChange={onChangeNeedAnswer} />
                    </div>
                    {data.needAnswer && (
                        <div className={styles.options}>
                            <div className={styles.wrapper}>
                                <div className={styles.time}>{data.waitingTime / 1000} сек</div>
                                <div className={styles.slider}>
                                    <Slider
                                        size={'small'}
                                        min={5}
                                        max={60}
                                        value={data.waitingTime / 1000}
                                        onChange={onChangeWaitingTime}
                                    />
                                </div>
                            </div>
                            <div className={styles.answers}>
                                {data.answers?.map((ans) => (
                                    <div key={ans.button} className={styles.answer}>
                                        <Handle
                                            type={'source'}
                                            id={ans.id}
                                            position={Position.Left}
                                            className={classNames(
                                                styles.handle,
                                                styles.round,
                                                styles.left
                                            )}
                                        />
                                        {data.answers && data.answers.length > 1 ? (
                                            <button
                                                className={styles.circle}
                                                onClick={onRemoveAnswer(ans.id)}
                                            >
                                                <div
                                                    className={classNames(
                                                        styles.container,
                                                        styles.movable
                                                    )}
                                                >
                                                    <span className={styles.number}>
                                                        {ans.button}
                                                    </span>
                                                </div>
                                                <div
                                                    className={classNames(
                                                        styles.container,
                                                        styles.movable
                                                    )}
                                                >
                                                    <RemoveRounded className={styles.icon} />
                                                </div>
                                            </button>
                                        ) : (
                                            <div className={styles.circle}>
                                                <div className={styles.container}>
                                                    <span className={styles.number}>
                                                        {ans.button}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                        <span className={styles.label}>Кнопка {ans.button}</span>
                                        {menu.isShow && (
                                            <IconButton
                                                className={styles.dropDown}
                                                onClick={onOpenMenu(ans.button)}
                                                disableRipple
                                            >
                                                <ArrowDropDownRounded className={styles.icon} />
                                            </IconButton>
                                        )}
                                    </div>
                                ))}
                                {menu.isShow && (
                                    <button className={styles.circle} onClick={onAddAnswer}>
                                        <AddRounded className={styles.icon} />
                                    </button>
                                )}
                            </div>

                            <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={onCloseMenu}>
                                {menu.buttons.map(
                                    (btn) =>
                                        !btn.isUsed && (
                                            <MenuItem
                                                key={btn.name}
                                                onClick={onSelectNumberKey(btn.name)}
                                            >
                                                Кнопка {btn.name}
                                            </MenuItem>
                                        )
                                )}
                            </Menu>
                        </div>
                    )}
                </div>

                <Handle type={'target'} position={Position.Top} className={styles.handle} />
                {!data.needAnswer && (
                    <Handle
                        type={'source'}
                        position={Position.Bottom}
                        className={classNames(styles.handle, styles.round)}
                    />
                )}
            </Card>
        )
    }
)

export default ReplicaElement
