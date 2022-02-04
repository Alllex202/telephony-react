import type {} from '@mui/lab/themeAugmentation'
import {createTheme} from '@mui/material'
import {orange} from 'global/colors/orange'
import {green} from 'global/colors/green'
import {grey} from 'global/colors/grey'
import {blue} from 'global/colors/blue'
import {red} from 'global/colors/red'
import {transparent} from 'global/colors/transparent'
import {white} from 'global/colors/white'

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        black: true
        blue: true
        green: true
        orange: true
        red: true
    }
}

declare module '@mui/material/Checkbox' {
    interface CheckboxPropsColorOverrides {
        black: true
        blue: true
        green: true
        orange: true
        red: true
    }
}

declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
        black: true
        blue: true
        green: true
        orange: true
        red: true
    }
}

declare module '@mui/material/Switch' {
    interface SwitchPropsColorOverrides {
        black: true
        blue: true
        green: true
        orange: true
        red: true
    }
}

declare module '@mui/material/Slider' {
    interface SliderPropsColorOverrides {
        black: true
        blue: true
        green: true
        orange: true
        red: true
    }
}

declare module '@mui/material/FormControl' {
    interface FormControlPropsColorOverrides {
        black: true
        blue: true
        green: true
        orange: true
        red: true
    }

    interface FormControlPropsSizeOverrides {
        mediumBold: true
        mediumSlim: true
    }
}

declare module '@mui/material/TextField' {
    interface TextFieldPropsSizeOverrides {
        mediumBold: true
        mediumSlim: true
    }
}

declare module '@mui/material/styles' {
    interface Palette {
        black: Palette['primary']
        blue: Palette['primary']
        green: Palette['primary']
        orange: Palette['primary']
        red: Palette['primary']
    }

    interface PaletteOptions {
        black: PaletteOptions['primary']
        blue: PaletteOptions['primary']
        green: PaletteOptions['primary']
        orange: PaletteOptions['primary']
        red: PaletteOptions['primary']
    }
}

export const theme = createTheme({
    palette: {
        black: grey,
        blue: blue,
        green: green,
        orange: orange,
        red: red,
        primary: {
            ...orange,
            contrastText: white
        }
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 2px 8px rgba(33, 35, 36, 0.2)',
                    borderRadius: 4
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                list: {
                    padding: 0,
                    maxHeight: 480
                }
            },
            defaultProps: {
                variant: 'menu',
                anchorOrigin: {horizontal: 'right', vertical: 'bottom'},
                transformOrigin: {horizontal: 'right', vertical: 'top'},
                marginThreshold: 26
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    height: 48,
                    font: `normal 16px 'Montserrat'`,
                    paddingLeft: 16,
                    paddingRight: 16,
                    color: grey.main,
                    transition: '.25s color, .25s background-color',
                    '&:hover': {
                        backgroundColor: grey[50]
                    },
                    '& .MuiSvgIcon-root': {
                        marginRight: 12
                    },
                    '&.Mui-selected': {
                        color: orange[700],
                        backgroundColor: orange[50],
                        '&.Mui-focusVisible, &:hover': {
                            color: orange[700],
                            backgroundColor: orange[100]
                        }
                    }
                }
            },
            defaultProps: {disableGutters: true},
            variants: [
                {
                    props: {color: 'red'},
                    style: {
                        color: red.main,
                        '&:hover': {
                            backgroundColor: red[50]
                        },
                        '&.Mui-focusVisible': {
                            backgroundColor: red[50]
                        }
                    }
                }
            ]
        },
        MuiFormControl: {
            variants: [
                {
                    props: {size: 'mediumBold', variant: 'filled'},
                    style: {
                        '& .MuiFilledInput-root': {
                            border: `4px solid ${transparent}`,
                            borderColor: transparent,
                            backgroundColor: grey[50],
                            transition: '.25s border-color, .25s background-color',
                            '&:before, &:after': {
                                content: 'none'
                            },
                            '&:hover:not(.Mui-disabled)': {
                                backgroundColor: grey[100]
                            },
                            '&.Mui-focused': {
                                backgroundColor: grey[50],
                                borderColor: orange[600]
                            },
                            '&.Mui-disabled': {
                                backgroundColor: grey[50]
                            },
                            '.MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                height: 48
                            }
                        },
                        '.MuiFilledInput-input': {
                            font: `bold 16px 'Montserrat'`,
                            padding: '0 16px',
                            height: 48
                        },
                        '.MuiInputLabel-root': {
                            position: 'relative',
                            font: `normal 12px 'Montserrat'`,
                            transform: 'none',
                            top: -10,
                            marginTop: 10,
                            color: grey[600],
                            '&.Mui-focused': {
                                color: grey[600]
                            }
                        }
                    }
                },
                {
                    props: {size: 'mediumSlim', variant: 'filled'},
                    style: {
                        '& .MuiFilledInput-root': {
                            border: `4px solid ${transparent}`,
                            borderColor: transparent,
                            backgroundColor: grey[50],
                            transition: '.25s border-color, .25s background-color',
                            '&:before, &:after': {
                                content: 'none'
                            },
                            '&:hover:not(.Mui-disabled)': {
                                backgroundColor: grey[100]
                            },
                            '&.Mui-focused': {
                                backgroundColor: grey[50],
                                borderColor: orange[600]
                            },
                            '&.Mui-disabled': {
                                backgroundColor: grey[50]
                            },
                            '.MuiSelect-select': {
                                display: 'flex',
                                alignItems: 'center',
                                height: 48
                            }
                        },
                        '.MuiFilledInput-input': {
                            font: `normal 16px 'Montserrat'`,
                            padding: '0 16px',
                            height: 48
                        },
                        '.MuiInputLabel-root': {
                            position: 'relative',
                            font: `normal 12px 'Montserrat'`,
                            transform: 'none',
                            top: -10,
                            marginTop: 10,
                            color: grey[600],
                            '&.Mui-focused': {
                                color: grey[600]
                            }
                        }
                    }
                }
            ]
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    '.MuiSwitch-track': {
                        backgroundColor: grey[700]
                    },
                    '.MuiSwitch-switchBase:not(.Mui-checked) .MuiSwitch-thumb': {
                        backgroundColor: grey[500]
                    }
                }
            }
        }
    }
})
