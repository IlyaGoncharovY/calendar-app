import {FC} from "react";
import {TableCell, TableRow} from "@mui/material";

import {RowsType} from "../../../../../store/slices/tableSlice.ts";
import {GroupButton} from "../../../../../common/commonComponents/GroupButton.tsx";

interface ITableItem {
    row: RowsType
    dateId: string
}

export const TableItem: FC<ITableItem> = ({row, dateId}) => {
    return (
        <TableRow
            key={row.name}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.task}</TableCell>
            <TableCell align="right">{row.location}</TableCell>
            <TableCell align="right">
                <GroupButton dateId={dateId}/>
            </TableCell>
        </TableRow>
    );
};