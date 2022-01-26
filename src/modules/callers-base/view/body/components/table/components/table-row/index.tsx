import {CallersBaseDataModel} from 'core/api'
import React from 'react'
import {TableCell, TableRow as MuiTableRow} from '@mui/material'
import styles from 'shared/styles/table/styles.module.scss'

type Props = {
    ind: number
    el: CallersBaseDataModel
}

const TableRow = React.memo(({el, ind}: Props) => {
    return (
        <MuiTableRow key={el.id}>
            <TableCell>{ind + 1}</TableCell>
            {el.variables.map((el) => (
                <TableCell key={el.id} className={!el.valid ? styles.invalidCell : ''}>
                    {el.value}
                </TableCell>
            ))}
        </MuiTableRow>
    )
})

export default TableRow
