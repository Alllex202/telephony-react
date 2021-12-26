import React from 'react';
import './custom-styles.scss';
import {Menu as MuiMenu} from '@mui/material';

type Props = {
    anchorEl: Element | null,
    open: boolean,
    onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void,
    children?: React.ReactNode,
}

function Menu({anchorEl, open, onClose, children}: Props) {
    return (
        <MuiMenu open={open} onClose={onClose} anchorEl={anchorEl} variant={'menu'}
                 anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                 transformOrigin={{horizontal: 'right', vertical: 'top'}} marginThreshold={20}>
            {children}
        </MuiMenu>
    );
}

export default Menu;
