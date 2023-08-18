import {useEffect} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import {TableItem} from "./item/TableItem.tsx";
import {getRowsData} from "../../../../store/slices/tableSlice.ts";
import {tableRowsArray} from "../../../../common/dataSet/dateOfTable.ts";
import {useAppDispatch, useAppSelector} from "../../../../store/config/hook.ts";

export const TableComponent = () => {

    const selectedDate = useAppSelector(state => state.selectedDate.selectedDate)
    const rows = useAppSelector(state => state.tableDate.rows)

    const filteredRows = selectedDate
        ? rows.filter((row) => row.date === selectedDate)
        : rows

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getRowsData());
    }, [dispatch])

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
                            {filteredRows.map((row, index) => (
                                <TableItem key={index} row={row} rowId={row.rowId}/>
                            ))}
                        </TableBody>
                    </Table>
            </TableContainer>
    );
};

