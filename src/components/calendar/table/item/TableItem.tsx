import {Button, TableCell, TableRow} from "@mui/material";
import {RowsType} from "../Table.tsx";
import {FC} from "react";

interface ITableItem {
    row: RowsType
}

export const TableItem: FC<ITableItem> = ({row}) => {
    return (
        <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <Button>Add</Button>
            {/*<TableCell align="right">{row.carbs}</TableCell>*/}
            {/*<TableCell align="right">{row.protein}</TableCell>*/}
        </TableRow>
    );
};