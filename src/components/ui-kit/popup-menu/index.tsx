import React from 'react';
import './custom-styles.scss';
import {Menu} from "@mui/material";

type Props = {
    anchorEl: Element | null,
    open: boolean,
    onClose: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void,
    children?: React.ReactNode,
}

function PopupMenu({anchorEl, open, onClose, children}: Props) {
    return (
        <Menu open={open} onClose={onClose} anchorEl={anchorEl} variant={'menu'}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
              transformOrigin={{horizontal: 'right', vertical: 'top'}} marginThreshold={20}>
            {children}
        </Menu>
    );
}

export default PopupMenu;
