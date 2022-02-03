import React from 'react'
import {MenuItem as MuiMenuItem, MenuItemProps, styled} from '@mui/material'

const _MenuItem = styled(MuiMenuItem)(() => ({}))

const MenuItem = (props: MenuItemProps & {color?: 'red'}) => <_MenuItem {...props} />

export default MenuItem
