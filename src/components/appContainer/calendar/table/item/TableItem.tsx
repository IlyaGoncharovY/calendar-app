import {FC} from "react";
import {TableCell, TableRow} from "@mui/material";

import {GroupButton} from "../../../../../common/commonComponents/GroupButton.tsx";
import {RowsTypeWithDate} from "../../../../../store/slices/tableReducer/tableSlice.ts";

interface ITableItem {
    row:  RowsTypeWithDate
    rowId: string
}

export const TableItem: FC<ITableItem> = ({row, rowId}) => {
    return (
        <TableRow
            key={row.name}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
            style={row.comments ? {backgroundColor: "#e3c5d1"} : {backgroundColor: ""}}
        >
            <TableCell component="th" scope="row">
                {row.name}
            </TableCell>
            <TableCell align="right">{row.task}</TableCell>
            <TableCell align="right">{row.location}</TableCell>
            <TableCell align="right">
                <GroupButton rowId={rowId}/>
            </TableCell>
        </TableRow>
    );
};
