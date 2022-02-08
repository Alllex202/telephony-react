import React from 'react'
import {styled} from '@mui/material'
import {LoadingButton, LoadingButtonProps} from '@mui/lab'
import {orange} from 'global/colors/orange'
import {grey} from 'global/colors/grey'
import {fonts} from 'global/fonts'

const _BtnSecondary = styled(LoadingButton)(({theme}) => ({
    backgroundColor: orange[50],
    borderRadius: 4,
    boxShadow: 'none',
    color: orange[600],
    font: fonts.bodyBold,
    height: 48,
    textTransform: 'none',
    '&:hover, &:active': {
        backgroundColor: orange[100],
        boxShadow: 'none'
    },
    '&.Mui-disabled': {
        backgroundColor: grey[50]
    }
}))

const BtnSecondary = (props: Omit<LoadingButtonProps, 'variant'>) => (
    <_BtnSecondary {...props} variant={'contained'} />
)

export default BtnSecondary
