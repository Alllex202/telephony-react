import React, {useState} from 'react'
import {
    FilledInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    Menu as MenuV2,
    OutlinedInput,
    TextField,
    ThemeProvider
} from '@mui/material'
import {theme} from 'app/theme'
import BtnPrimary from 'components/ui-kit-v2/btn-primary'
import {ChildCareRounded, Clear, Save, Visibility} from '@mui/icons-material'
import Btn from 'components/ui-kit/btn'
import BtnSecondary from 'components/ui-kit-v2/btn-secondary'
import BtnSecond from 'components/ui-kit/btn-second'
import BtnCircle from 'components/ui-kit/btn-circle'
import MenuItemV2 from 'components/ui-kit-v2/menu-item'
import Menu from 'components/ui-kit/menu'
import MenuItem from 'components/ui-kit/menu-item'
import InputV1 from 'components/ui-kit/input'
import InputV2 from 'components/ui-kit-v2/input'

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

const TestComponentsBody = () => {
    const [disabled, setDisabled] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [anchor, setAnchor] = useState<{
        1: Element | null
        2: Element | null
        3: Element | null
    }>({1: null, 2: null, 3: null})

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
            <div style={{marginBottom: 200}}>
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
                                    <MenuItemV2
                                        color={'red'}
                                        key={`${el}-v2-red`}
                                        onClick={closeMenu(1)}
                                    >
                                        <ChildCareRounded />
                                        {el}
                                    </MenuItemV2>
                                ))}
                                {menuItems.map((el) => (
                                    <MenuItemV2 key={`${el}-v2`} onClick={closeMenu(1)}>
                                        <ChildCareRounded />
                                        {el}
                                    </MenuItemV2>
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
                        ></div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default TestComponentsBody
