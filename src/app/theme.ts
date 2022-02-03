import {createTheme} from '@mui/material'
import {orange} from 'global/colors/orange'
import {green} from 'global/colors/green'
import {grey} from 'global/colors/grey'
import {blue} from 'global/colors/blue'
import {red} from 'global/colors/red'

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        black: true
        blue: true
        green: true
        orange: true
        red: true
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
        red: red
    },
    components: {
        MuiMenu: {
            styleOverrides: {
                paper: {
                    '&.MuiMenu-paper': {
                        boxShadow: '0 2px 8px rgba(33, 35, 36, 0.2)',
                        borderRadius: 4,
                        marginTop: 10
                    }
                },
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
                    '&:hover': {
                        backgroundColor: grey[50]
                    },
                    '& .MuiSvgIcon-root': {
                        marginRight: 12
                    }
                    // '& .MuiTouchRipple-child': {
                    //     backgroundColor: grey[300]
                    // }
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
                        }
                        // '& .MuiTouchRipple-child': {
                        //     backgroundColor: red[200]
                        // }
                    }
                }
            ]
        }
    }
})
