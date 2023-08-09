import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import {TableItem} from "./item/TableItem.tsx";
import {tableRowsArray} from "../../../common/dataSet/dateOfTable.ts";
import {useAppSelector} from "../../../store/config/hook.ts";

export const TableComponent = () => {

    const rows = useAppSelector(state => state.tableDate.rows)

    return (
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {tableRowsArray.map((tableRow, index)=>
                                    <TableCell align="right" key={index}>{tableRow.title}</TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableItem key={index} row={row}/>
                            ))}
                        </TableBody>
                    </Table>
            </TableContainer>
    );
};

