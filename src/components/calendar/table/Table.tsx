import {FC} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

import {TableItem} from "./item/TableItem.tsx";

function createData(
    name: string,
    calories: string,
    fat: string,
    // carbs: number,
    // protein: number,
) {
    return { name, calories, fat};
}

export type RowsType = {
    name: string,
    calories: string,
    fat: string,
}

const rows: RowsType[] = [
    createData('Smirnov', "Komis", "VDNH"),
    createData('Ivanov', "Strel", "VDNH-BS"),
    createData('Sidoeov', "Strel", "VDNH-Aleks"),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

interface ITable {
    selectedDate: string
}
export const TableComponent: FC<ITable> = ({selectedDate}) => {
    return (
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            {selectedDate}
                            <TableRow>
                                <TableCell>Ф.И.О</TableCell>
                                <TableCell align="right">Комиссионный/Стрелочный</TableCell>
                                <TableCell align="right">Станция/Перегон</TableCell>
                                {/*<TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>*/}
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

