import {CallingResultTableBodyModel} from 'core/api'
import React from 'react'
import {TableCell, TableRow as MuiTableRow} from '@mui/material'
import stylesTable from 'shared/styles/table/styles.module.scss'

type Props = {
    el: CallingResultTableBodyModel
}

const TableRow = React.memo(({el}: Props) => {
    return (
        <MuiTableRow key={el.number}>
            <TableCell>{el.number}</TableCell>
            {el.extra.map((el) => (
                <TableCell
                    key={`extra-${el.id}`}
                    className={!el.valid ? stylesTable.invalidCell : ''}
                >
                    {el.value}
                </TableCell>
            ))}
            {el.original.map((el) => (
                <TableCell
                    key={`original-${el.id}`}
                    className={!el.valid ? stylesTable.invalidCell : ''}
                >
                    {el.value}
                </TableCell>
            ))}
        </MuiTableRow>
    )
})

export default TableRow
