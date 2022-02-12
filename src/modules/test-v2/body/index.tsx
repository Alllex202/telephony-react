import React, {useState} from 'react'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Chip,
    FilledInput,
    FormControl,
    FormHelperText,
    Icon,
    IconButton,
    InputAdornment,
    InputLabel,
    LinearProgress,
    Menu as MenuV2,
    MenuItem as MuiMenuItem,
    Slider,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    ThemeProvider
} from '@mui/material'
import {theme} from 'app/theme'
import BtnPrimary from 'components/ui-kit-v2/btn-primary'
import {
    BookmarkBorderRounded,
    BookmarkRounded,
    ChildCareRounded,
    Clear,
    ExpandMore,
    FavoriteBorderRounded,
    FavoriteRounded,
    Save,
    StarBorderRounded,
    StarRounded
} from '@mui/icons-material'
import Btn from 'components/ui-kit/btn'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import BtnSecond from 'components/ui-kit/btn-second'
import BtnCircle from 'components/ui-kit/btn-circle'
import Menu from 'components/ui-kit/menu'
import MenuItem from 'components/ui-kit/menu-item'
import InputV1 from 'components/ui-kit/input'
import DateAdapter from '@mui/lab/AdapterDateFns'
import styles from 'modules/calling/creating/body/styles.module.scss'
import {classNames} from 'shared/utils'
import {DatePicker, LocalizationProvider, TimePicker} from '@mui/lab'
import ruLocale from 'date-fns/locale/ru'
import SwitchV1 from 'components/ui-kit/switch'
import IconV1 from 'components/ui-kit/icon'
import HiddenInput from 'components/ui-kit-v2/hidden-input'
import AutosizeInput from 'react-input-autosize'
import {useDoubleInput} from 'shared/hoocks'
import classes from './styles.module.scss'

const menuItems = [
    'Первый пункт',
    'Второй пункт',
    'Третий пункт',
    'Четвертый очень длинный пункт',
    'Пятый очень преочень длинный-длинный пункт',
    'Шестой пункт',
    'Седьмой снова очень длинный пункт',
    'Восьмой пункт',
    '9 пункт',
    '10 пункт',
    '11 пункт',
    '12 пункт',
    '13 пункт',
    '14 пункт',
    '15 пункт',
    '16 пункт',
    '17 пункт',
    '18 пункт',
    '19 пункт',
    '20 пункт',
    'Пиздец, это пиздец, братцы. ' +
        'Как же меня заебало все это. ' +
        'Я не могу больше жить в этом городе, я не могу здесь больше работать. ' +
        'И сейчас я понимаю, что мне нужно валить из Москвы. ' +
        'Да, да, вы не ослышались. ' +
        'Мне нужно сваливать отсюда, пока я еще могу. ' +
        'Пока мое здоровье позволяет мне это сделать. ' +
        'Только вот куда я поеду? ' +
        'Куда мне ехать? ' +
        'В какой город? ' +
        'Я даже не знаю. ' +
        'У меня есть только одна мысль: Питер. ' +
        'Питер. ' +
        'Все. ' +
        'Больше никаких вариантов. ' +
        'Там жизнь, там люди, там моя жизнь. ' +
        'Туда мне и нужно ехать'
]

const funnyText =
    'заебал уже, ты в следующий раз поаккуратнее ори. ' +
    'У меня до сих пор глаза красные от твоих воплей. ' +
    'А что касается тебя, то ты бы лучше не на меня орал, а на свои комплексы, которые у тебя на почве моей внешности, да и вообще всего того, что я делаю, выросли. ' +
    'На самом деле, это не так важно, как ты себе это представляешь. ' +
    '- Хорошо, - согласился он. ' +
    '– Я был неправ. ' +
    'Ты мне нравишься. ' +
    'Я люблю тебя. ' +
    'Но я не могу ничего с этим сделать. ' +
    'Ничего. ' +
    'Потому что я... ' +
    'Я... ' +
    'Он замолчал, опустив голову.'

const fuckingText =
    'Заебись, что я до сих пор не умею обращаться с техникой.\n' +
    'Вчера вечером поставила комп на зарядку, а утром он не включился.\n' +
    'Отнесли в ремонт, сегодня обещали вернуть.\n' +
    'Блин, вот как мне теперь на работе работать?\n' +
    'А еще надо купить новый принтер.\n' +
    'Я же не могу печатать, когда меня нет!\n' +
    'На самом деле, мне просто страшно.\n' +
    'Но я ничего не боюсь.\n' +
    'И это хорошо.\n' +
    'По крайней мере, я не чувствую себя загнанной в угол.\n' +
    'Как только я начинаю думать, что все, конец, меня уже не спасти.'

const bigArray = Array<any>(100).fill(4)
const smallArray = Array<any>(5).fill(4)

const TestComponentsBody = () => {
    const [disabled, setDisabled] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [startDate, setStartDate] = useState<number | null>(0)
    const [anchor, setAnchor] = useState<{
        1: Element | null
        2: Element | null
        3: Element | null
    }>({1: null, 2: null, 3: null})
    const [variable, setVariable] = useState<string>('zxc')
    const [autosize, setAutosize] = useState<string>('qwe')
    const {text, setText, lastText, setLastText} = useDoubleInput('asd')

    const onChangeVariable = (value: string) => {
        setVariable(value)
    }

    const onChangeAutosize = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAutosize(e.currentTarget.value)
    }

    const onChangeDateTime = (_date: number | null | undefined) => {
        if (_date) {
            const date = new Date(_date)
            setStartDate(date.getTime())
        }
    }

    const toggleDisabled = () => {
        setDisabled(!disabled)
    }

    const toggleLoading = () => {
        setLoading(!loading)
    }

    const openMenu = (key: 1 | 2 | 3) => (e: React.MouseEvent) => {
        setAnchor((value) => ({
            ...value,
            [key]: e.currentTarget
        }))
    }

    const closeMenu = (key: 1 | 2 | 3) => () => {
        setAnchor((value) => ({
            ...value,
            [key]: null
        }))
    }

    return (
        <ThemeProvider theme={theme}>
            <div style={{marginBottom: 1000}}>
                <div
                    style={{
                        position: 'fixed',
                        top: 10,
                        left: '50%',
                        border: '4px solid red',
                        padding: 10,
                        zIndex: 9999
                    }}
                >
                    <p>
                        <label>
                            <input type={'checkbox'} onClick={toggleDisabled} />
                            disabled
                        </label>
                    </p>
                    <p>
                        <label>
                            <input type={'checkbox'} onClick={toggleLoading} />
                            loading
                        </label>
                    </p>
                </div>

                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
                    <div>
                        <h1 style={{marginBottom: 15}}>Кнопки Primary</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <BtnPrimary loading={loading} disabled={disabled}>
                                Новая кнопка
                            </BtnPrimary>
                            <BtnPrimary loading={loading} disabled={disabled} endIcon={<Save />}>
                                Новая кнопка
                            </BtnPrimary>
                            <BtnPrimary
                                loading={loading}
                                disabled={disabled}
                                endIcon={<Save />}
                                style={{width: 250}}
                            >
                                Новая кнопка
                            </BtnPrimary>
                            <Btn text={'Старая кнопка'} disabled={disabled || loading} />
                            <Btn
                                text={'Старая кнопка'}
                                disabled={disabled || loading}
                                iconName={'save'}
                                iconType={'round'}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 style={{marginBottom: 15}}>Кнопки Secondary</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <BtnSecondary loading={loading} disabled={disabled}>
                                Новая кнопка
                            </BtnSecondary>
                            <BtnSecondary loading={loading} disabled={disabled} endIcon={<Save />}>
                                Новая кнопка
                            </BtnSecondary>
                            <BtnSecondary
                                loading={loading}
                                disabled={disabled}
                                endIcon={<Save />}
                                style={{width: 250}}
                            >
                                Новая кнопка
                            </BtnSecondary>
                            <BtnSecond text={'Старая кнопка'} disabled={disabled || loading} />
                            <BtnSecond
                                text={'Старая кнопка'}
                                disabled={disabled || loading}
                                iconName={'save'}
                                iconType={'round'}
                            />
                        </div>
                    </div>
                    <div>
                        <h1 style={{marginBottom: 15}}>Кнопки Icon</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <IconButton
                                size={'large'}
                                disabled={disabled || loading}
                                color={'orange'}
                            >
                                <ChildCareRounded />
                            </IconButton>
                            <IconButton size={'large'} disabled={disabled || loading} color={'red'}>
                                <ChildCareRounded />
                            </IconButton>
                            <IconButton
                                size={'large'}
                                disabled={disabled || loading}
                                color={'green'}
                            >
                                <ChildCareRounded />
                            </IconButton>

                            <IconButton
                                size={'small'}
                                disabled={disabled || loading}
                                color={'blue'}
                            >
                                <ChildCareRounded fontSize={'inherit'} />
                            </IconButton>
                            <IconButton
                                size={'small'}
                                disabled={disabled || loading}
                                color={'blue'}
                            >
                                <ChildCareRounded fontSize={'small'} />
                            </IconButton>
                            <IconButton
                                size={'small'}
                                disabled={disabled || loading}
                                color={'blue'}
                            >
                                <ChildCareRounded fontSize={'medium'} />
                            </IconButton>
                            <IconButton
                                size={'small'}
                                disabled={disabled || loading}
                                color={'blue'}
                            >
                                <ChildCareRounded fontSize={'large'} />
                            </IconButton>

                            <IconButton
                                size={'medium'}
                                disabled={disabled || loading}
                                color={'black'}
                            >
                                <ChildCareRounded fontSize={'small'} />
                            </IconButton>
                            <IconButton
                                size={'medium'}
                                disabled={disabled || loading}
                                color={'black'}
                            >
                                <ChildCareRounded fontSize={'medium'} />
                            </IconButton>
                            <IconButton
                                size={'medium'}
                                disabled={disabled || loading}
                                color={'black'}
                            >
                                <ChildCareRounded fontSize={'inherit'} />
                            </IconButton>
                            <IconButton
                                size={'medium'}
                                disabled={disabled || loading}
                                color={'black'}
                            >
                                <ChildCareRounded fontSize={'large'} />
                            </IconButton>

                            <IconButton size={'large'} disabled={disabled || loading}>
                                <ChildCareRounded fontSize={'small'} />
                            </IconButton>
                            <IconButton size={'large'} disabled={disabled || loading} color={'red'}>
                                <ChildCareRounded fontSize={'medium'} />
                            </IconButton>
                            <IconButton size={'large'} disabled={disabled || loading}>
                                <ChildCareRounded fontSize={'inherit'} />
                            </IconButton>
                            <IconButton size={'large'} disabled={disabled || loading}>
                                <ChildCareRounded fontSize={'large'} />
                            </IconButton>

                            <BtnCircle iconName={'elderly'} iconType={'round'} />
                        </div>
                    </div>
                    <div>
                        <h1 style={{marginBottom: 15}}>Меню</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <BtnPrimary>Пустое место</BtnPrimary>
                            <BtnPrimary onClick={openMenu(1)}>Новое меню</BtnPrimary>
                            <BtnPrimary onClick={openMenu(2)}>Старое меню</BtnPrimary>

                            <MenuV2
                                open={Boolean(anchor['1'])}
                                onClose={closeMenu(1)}
                                anchorEl={anchor['1']}
                            >
                                {menuItems.slice(0, 1).map((el) => (
                                    <MuiMenuItem
                                        color={'red'}
                                        key={`${el}-v2-red`}
                                        onClick={closeMenu(1)}
                                    >
                                        <ChildCareRounded />
                                        {el}
                                    </MuiMenuItem>
                                ))}
                                {menuItems.map((el) => (
                                    <MuiMenuItem key={`${el}-v2`} onClick={closeMenu(1)}>
                                        <ChildCareRounded />
                                        {el}
                                    </MuiMenuItem>
                                ))}
                            </MenuV2>

                            <Menu
                                open={Boolean(anchor['2'])}
                                onClose={closeMenu(2)}
                                anchorEl={anchor['2']}
                            >
                                {menuItems.slice(0, 1).map((el) => (
                                    <MenuItem
                                        isDanger={true}
                                        key={`${el}-v1-red`}
                                        onClick={closeMenu(2)}
                                    >
                                        {el}
                                    </MenuItem>
                                ))}
                                {menuItems.map((el) => (
                                    <MenuItem key={`${el}-v1`} onClick={closeMenu(2)}>
                                        {el}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Поле ввода</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <InputV1 placeholder={'Старое поле ввода'} disabled={disabled} />

                            <FormControl
                                variant={'filled'}
                                size={'mediumSlim'}
                                color={'orange'}
                                disabled={disabled}
                            >
                                <InputLabel shrink>Новое поле</InputLabel>
                                <FilledInput
                                    type={'search'}
                                    endAdornment={
                                        <InputAdornment position={'end'}>
                                            <IconButton disabled={disabled}>
                                                <Clear />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder={'Новые поля'}
                                />
                                <FormHelperText>Помощь</FormHelperText>
                            </FormControl>
                            <FormControl
                                variant={'filled'}
                                size={'mediumSlim'}
                                color={'orange'}
                                disabled={disabled}
                            >
                                {/*<InputLabel>Новое поле</InputLabel>*/}
                                <FilledInput
                                    type={'search'}
                                    endAdornment={
                                        <InputAdornment position={'end'}>
                                            <IconButton disabled={disabled}>
                                                <Clear />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder={'placeholder'}
                                />
                                <FormHelperText>Помощь</FormHelperText>
                            </FormControl>
                            <FormControl
                                variant={'filled'}
                                size={'mediumBold'}
                                color={'orange'}
                                disabled={disabled}
                            >
                                {/*<InputLabel>Новое поле</InputLabel>*/}
                                <FilledInput
                                    type={'search'}
                                    endAdornment={
                                        <InputAdornment position={'end'}>
                                            <IconButton disabled={disabled}>
                                                <Clear />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    placeholder={'placeholder'}
                                />
                                {/*<FormHelperText>Помощь</FormHelperText>*/}
                            </FormControl>
                            <TextField
                                variant={'filled'}
                                size={'mediumBold'}
                                color={'orange'}
                                placeholder={'Либо placeholder'}
                                disabled={disabled}
                            />

                            <TextField
                                variant={'filled'}
                                size={'mediumSlim'}
                                color={'orange'}
                                label={'либо надпись'}
                                disabled={disabled}
                            />

                            <TextField
                                variant={'filled'}
                                size={'mediumSlim'}
                                color={'orange'}
                                label={'С надписью'}
                                helperText={'Последние три поля - другие элементы'}
                                disabled={disabled}
                            />
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Календарь / дата / время</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <LocalizationProvider dateAdapter={DateAdapter} locale={ruLocale}>
                                <div className={styles.doubleInput}>
                                    <div className={classNames(styles.dateTime, 'custom-input')}>
                                        <DatePicker
                                            mask={'__.__.____'}
                                            disabled={disabled}
                                            value={startDate}
                                            minDate={Date.now()}
                                            onChange={onChangeDateTime}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant={'filled'}
                                                    size={'mediumSlim'}
                                                    color={'orange'}
                                                />
                                            )}
                                        />
                                    </div>
                                    <div className={classNames(styles.dateTime, 'custom-input')}>
                                        <TimePicker
                                            disabled={disabled}
                                            value={startDate}
                                            onChange={onChangeDateTime}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant={'filled'}
                                                    size={'mediumSlim'}
                                                    color={'orange'}
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </LocalizationProvider>
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Select</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <TextField
                                variant={'filled'}
                                size={'mediumSlim'}
                                color={'orange'}
                                disabled={disabled}
                                select
                                value={1}
                                autoFocus={false}
                            >
                                <MuiMenuItem value={1}>Первый пункт</MuiMenuItem>
                                <MuiMenuItem value={2}>Второй пункт</MuiMenuItem>
                                <MuiMenuItem value={3}>Третий пункт</MuiMenuItem>
                                <MuiMenuItem value={4}>Четвертый пункт</MuiMenuItem>
                                <MuiMenuItem value={5} color={'red'}>
                                    Пятый пункт
                                </MuiMenuItem>
                            </TextField>
                            <TextField
                                variant={'filled'}
                                size={'mediumSlim'}
                                label={'С надписью'}
                                color={'orange'}
                                disabled={disabled}
                                select
                                value={1}
                                autoFocus={false}
                            >
                                <MuiMenuItem value={1}>Первый пункт</MuiMenuItem>
                                <MuiMenuItem value={2}>Второй пункт</MuiMenuItem>
                                <MuiMenuItem value={3}>Третий пункт</MuiMenuItem>
                                <MuiMenuItem value={4}>Четвертый пункт</MuiMenuItem>
                                <MuiMenuItem value={5} color={'red'}>
                                    Пятый пункт
                                </MuiMenuItem>
                            </TextField>
                            <TextField
                                variant={'filled'}
                                size={'mediumSlim'}
                                color={'orange'}
                                label={'С надписью'}
                                helperText={'И подсказкой'}
                                disabled={disabled}
                                select
                                value={1}
                                autoFocus={false}
                            >
                                <MuiMenuItem value={1}>Первый пункт</MuiMenuItem>
                                <MuiMenuItem value={2}>Второй пункт</MuiMenuItem>
                                <MuiMenuItem value={3}>Третий пункт</MuiMenuItem>
                                <MuiMenuItem value={4}>Четвертый пункт</MuiMenuItem>
                                <MuiMenuItem value={5} color={'red'}>
                                    Пятый пункт
                                </MuiMenuItem>
                            </TextField>
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Checkbox</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Checkbox color={'orange'} disabled={disabled} />
                            <Checkbox color={'green'} disabled={disabled} />
                            <Checkbox color={'black'} disabled={disabled} />
                            <Checkbox color={'blue'} disabled={disabled} />
                            <Checkbox color={'red'} disabled={disabled} />

                            <Checkbox
                                color={'red'}
                                icon={<FavoriteBorderRounded />}
                                checkedIcon={<FavoriteRounded />}
                                disabled={disabled}
                            />

                            <Checkbox
                                color={'blue'}
                                icon={<StarBorderRounded />}
                                checkedIcon={<StarRounded />}
                                disabled={disabled}
                            />

                            <Checkbox
                                color={'orange'}
                                icon={<BookmarkBorderRounded />}
                                checkedIcon={<BookmarkRounded />}
                                disabled={disabled}
                            />
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Switch</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <label>
                                <SwitchV1 disabled={disabled} /> Старый
                            </label>
                            <label>
                                <Switch color={'black'} disabled={disabled} /> Новый Черный
                            </label>
                            <label>
                                <Switch color={'green'} disabled={disabled} /> Новый Зеленый
                            </label>
                            <label>
                                <Switch color={'orange'} disabled={disabled} /> Новый Оранжевый /
                                Базовый
                            </label>
                            <label>
                                <Switch color={'red'} disabled={disabled} /> Новый Красный
                            </label>
                            <label>
                                <Switch color={'blue'} disabled={disabled} /> Новый Синий
                            </label>
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Slider</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Slider color={'red'} disabled={disabled} />
                            <Slider color={'black'} disabled={disabled} />
                            <Slider color={'orange'} disabled={disabled} />
                            <Slider color={'green'} disabled={disabled} />
                            <Slider color={'blue'} disabled={disabled} />
                            <Slider color={'red'} disabled={disabled} size={'small'} />
                            <Slider color={'black'} disabled={disabled} size={'small'} />
                            <Slider color={'orange'} disabled={disabled} size={'small'} />
                            <Slider color={'green'} disabled={disabled} size={'small'} />
                            <Slider color={'blue'} disabled={disabled} size={'small'} />
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Icons</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <IconV1 iconName={'favorite'} iconType={'round'} />
                            <Icon>favorite</Icon>
                            <Icon color={'primary'}>favorite</Icon>
                            <FavoriteBorderRounded color={'primary'} />
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Linear progress</h1>
                        <div
                            style={{
                                display: 'grid',
                                gap: 20
                            }}
                        >
                            <LinearProgress value={55} variant={'determinate'} />
                            <LinearProgress color={'red'} variant={'indeterminate'} value={55} />
                            <LinearProgress
                                color={'blue'}
                                variant={'buffer'}
                                valueBuffer={75}
                                value={55}
                            />
                            <LinearProgress color={'green'} variant={'query'} value={55} />
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>
                            <span style={{textDecoration: 'line-through'}}>Table</span> (DEPRECATED)
                        </h1>
                        <h2 style={{marginBottom: 15}}>New tables with react-virtualized</h2>
                        <div
                            style={{
                                maxHeight: 400,
                                overflow: 'auto',
                                border: '1px solid grey',
                                borderRadius: 4,
                                opacity: 0.4
                            }}
                        >
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Номер</TableCell>
                                        <TableCell>Первая колонка</TableCell>
                                        <TableCell>Вторая колонка</TableCell>
                                        <TableCell>Третья колонка</TableCell>
                                        <TableCell>Четверта колонка</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bigArray.map((el, ind) => (
                                        <TableRow key={ind}>
                                            <TableCell>{ind}</TableCell>
                                            <TableCell>Первые данные</TableCell>
                                            <TableCell>2 данные</TableCell>
                                            <TableCell>3и данные</TableCell>
                                            <TableCell>Четвертые данные</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Chips / Tags</h1>
                        <div
                            style={{
                                display: 'flex',
                                gap: 20,
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}
                        >
                            <Chip label={'Пример'} variant={'filled'} />
                            <Chip label={'Пример'} variant={'outlined'} />
                            <Chip
                                label={'Эта хрень ТОЛЬКО для коротких надписей'}
                                variant={'square'}
                            />
                            <Chip label={funnyText} variant={'square'} />
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Accordion</h1>
                        <div style={{}}>
                            {smallArray.map((el, ind) => (
                                <Accordion key={ind} square={true} disabled={disabled}>
                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                        Заголовок {ind}
                                    </AccordionSummary>
                                    <AccordionDetails>{fuckingText}</AccordionDetails>
                                </Accordion>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Table Variable</h1>
                        <div style={{width: 500, overflow: 'hidden'}}>
                            <HiddenInput value={variable} onChange={onChangeVariable} required />
                        </div>
                    </div>

                    <div>
                        <h1 style={{marginBottom: 15}}>Transparent autosize input</h1>
                        <div style={{width: 300, overflow: 'hidden'}}>
                            <AutosizeInput
                                value={autosize}
                                onChange={onChangeAutosize}
                                inputClassName={classes.autosize}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default TestComponentsBody
