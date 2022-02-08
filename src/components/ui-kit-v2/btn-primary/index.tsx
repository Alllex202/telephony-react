import React from 'react'
import {styled} from '@mui/material'
import {orange} from 'global/colors/orange'
import {LoadingButton, LoadingButtonProps} from '@mui/lab'
import {white} from 'global/colors/white'
import {fonts} from 'global/fonts'

const _BtnPrimary = styled(LoadingButton)(({theme}) => ({
    backgroundColor: orange[600],
    borderRadius: 12,
    boxShadow: 'none',
    color: white,
    font: fonts.bodyBold,
    height: 48,
    textTransform: 'none',
    '&:hover, &:active': {
        backgroundColor: orange[700],
        boxShadow: 'none'
    }
}))

const BtnPrimary = (props: Omit<LoadingButtonProps, 'variant'>) => (
    <_BtnPrimary {...props} variant={'contained'} />
)

export default BtnPrimary
