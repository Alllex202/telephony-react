import React, {useState} from 'react'
import Btn from 'components/ui-kit/btn'
import styles from './styles.module.scss'
import BtnSecond from 'components/ui-kit/btn-second'
import BtnDefault from 'components/ui-kit/btn-default'
import BtnToggle from 'components/ui-kit/btn-toggle'
import BtnCircle from 'components/ui-kit/btn-circle'
import Input from 'components/ui-kit/input'
import BtnCircleDefault from 'components/ui-kit/btn-circle-default'
import Modal from 'components/modal'
import Card from 'components/ui-kit/card'
import Tag from 'components/ui-kit/tag'
import Menu from 'components/ui-kit/menu'
import MenuItem from 'components/ui-kit/menu-item'
import InputTransparent from 'components/ui-kit/input-transparent'
import {useDispatch} from 'react-redux'
import {enqueueSnackbar} from 'features/notifications/store'
import HiddenInputWithIcon from 'components/hidden-input-with-icon'
import {useDoubleInput} from 'shared/hoocks'
import {Cell, Pie, PieChart} from 'recharts'

const TestBody = () => {
    const [modal, setModal] = useState<boolean>(false)
    const {text, lastText, setText, setLastText} = useDoubleInput('Скрытый ввод')
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const dispatch = useDispatch()

    const notifyAlert = () => {
        dispatch(enqueueSnackbar({message: 'Информация', type: 'INFO'}))
    }

    const notifyAlertLong = () => {
        dispatch(
            enqueueSnackbar({
                message:
                    'Пиздец, это так сложно - делать вид, будто ничего не произошло. Все, что было - было. И это было прекрасно. Было и прошло. Я не хочу вспоминать об этом, я хочу забыть. Но как? Как можно забыть о том, с кем ты был счастлив? Да, именно был. Потому что я не могу быть счастлив с тем, кто не считает меня своей. Кто говорит "я тебя не знаю", а сам при этом думает, как бы не встретиться со мной. Нет, я не ревную. Мне надоело чувствовать себя пустым местом. Ты не хочешь меня, а я не хочу тебя.',
                type: 'INFO'
            })
        )
    }

    const notifyError = () => {
        dispatch(enqueueSnackbar({message: 'Ошибка', type: 'ERROR'}))
    }

    const notifySuccess = () => {
        dispatch(enqueueSnackbar({message: 'Успех', type: 'SUCCESS'}))
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div className={styles.wrapper}>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate
                excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque
                doloremque eligendi ex, in itaque iure nulla sunt? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque
                recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque
                iure nulla sunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab
                accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt? Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi
                incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque
                eligendi ex, in itaque iure nulla sunt? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae
                soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
                cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab accusamus amet
                atque doloremque eligendi ex, in itaque iure nulla sunt? Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque
                recusandae soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque
                iure nulla sunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Consequatur cupiditate excepturi incidunt iste neque recusandae soluta vel! A, ab
                accusamus amet atque doloremque eligendi ex, in itaque iure nulla sunt? Lorem ipsum
                dolor sit amet, consectetur adipisicing elit. Consequatur cupiditate excepturi
                incidunt iste neque recusandae soluta vel! A, ab accusamus amet atque doloremque
                eligendi ex, in itaque iure nulla sunt? Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Consequatur cupiditate excepturi incidunt iste neque recusandae
                soluta vel! A, ab accusamus amet atque doloremque eligendi ex, in itaque iure nulla
                sunt?
            </p>
            <div className={styles.test}>
                <BtnDefault
                    className={styles.default}
                    text={'Иконка start'}
                    iconType={'round'}
                    iconName={'upload'}
                    iconPosition={'start'}
                />
                <BtnDefault
                    className={styles.default}
                    text={'Иконка end'}
                    iconType={'round'}
                    iconName={'upload'}
                    iconPosition={'end'}
                />
                <BtnDefault className={styles.default} text={'Без иконки'} />

                <Btn
                    text={'Иконка start'}
                    iconType={'round'}
                    iconName={'upload'}
                    iconPosition={'start'}
                />
                <Btn
                    text={'Иконка end'}
                    iconType={'round'}
                    iconName={'upload'}
                    iconPosition={'end'}
                />
                <Btn text={'Без иконки'} />

                <BtnSecond
                    text={'Иконка start'}
                    iconType={'round'}
                    iconName={'upload'}
                    iconPosition={'start'}
                />
                <BtnSecond
                    text={'Иконка end'}
                    iconType={'round'}
                    iconName={'upload'}
                    iconPosition={'end'}
                />
                <BtnSecond text={'Без иконки'} />
                <BtnSecond text={'Menu open'} onClick={handleClick} />

                <div
                    style={{width: 'fit-content', display: 'flex', alignItems: 'center'}}
                    className={styles.default}
                >
                    <BtnCircleDefault iconName={'upload'} iconType={'round'} />
                </div>
                <div
                    style={{width: 'fit-content', display: 'flex', alignItems: 'center'}}
                    className={styles.default}
                >
                    <BtnCircleDefault iconName={'upload'} iconType={'round'} isActive={true} />
                </div>

                <BtnToggle iconName={'account_circle'} iconType={'round'} />
                <BtnToggle iconName={'account_circle'} iconType={'round'} isActive={true} />

                <BtnCircle iconName={'upload'} iconType={'round'} />
                <BtnCircle iconName={'upload'} iconType={'round'} isActive={true} />

                <Input placeholder={'Пароль'} type={'password'} autoComplete={'new-password'} />
                <Input placeholder={'Строка ввода'} type={'text'} />
                <Input placeholder={'Коротка строка'} className={styles.input_short} />

                <Btn text={'Modal open'} onClick={() => setModal(true)} />

                <Card>
                    <>123</>
                </Card>

                <div>
                    <Tag text={'#Пример тега'} />
                </div>

                <InputTransparent type={'text'} placeholder={'Прозрачная строка ввода'} />

                <div style={{width: '50%', display: 'flex'}}>
                    <HiddenInputWithIcon
                        setText={setText}
                        text={text}
                        lastText={lastText}
                        setLastText={setLastText}
                    />
                </div>

                <Btn text={'Показать информацию'} onClick={notifyAlert} />
                <Btn text={'Показать уведомление об ошибке'} onClick={notifyError} />
                <Btn text={'Показать уведомление об успехе'} onClick={notifySuccess} />
                <Btn text={'Показать длинную информацию'} onClick={notifyAlertLong} />

                <div>
                    <PieChart width={400} height={190}>
                        <Pie
                            data={data}
                            cx={100}
                            cy={100}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill='#8884d8'
                            dataKey='value'
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </div>
            </div>
            {modal && (
                <Modal isOpened={modal} setOpen={setModal}>
                    Старое решение
                    <br />А нужно ли вообще модальное окно?
                </Modal>
            )}
            <Menu open={!!anchorEl} onClose={handleClose} anchorEl={anchorEl}>
                <MenuItem>Кнопка 1</MenuItem>
                <MenuItem>Кнопка 2</MenuItem>
                <MenuItem>Очень большая Кнопка 3</MenuItem>
                <MenuItem isDanger iconName={'delete_forever'} iconType={'round'}>
                    Опасность слева
                </MenuItem>
                <MenuItem
                    isDanger
                    iconName={'delete_forever'}
                    iconType={'round'}
                    iconPosition={'end'}
                >
                    Опасность справа
                </MenuItem>
            </Menu>
        </div>
    )
}

export default TestBody

const data = [
    {name: 'Group A', value: 400},
    {name: 'Group B', value: 300},
    {name: 'Group C', value: 100},
    {name: 'Group D', value: 500}
]

const COLORS = ['#0088fe', '#00c49f', '#ffbb28', '#ff8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
        <text
            x={x}
            y={y}
            fill='white'
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline='central'
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}
