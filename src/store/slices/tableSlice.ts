import {createSlice} from "@reduxjs/toolkit";

export type RowsType = {
    name: string,
    task: string,
    location: string,
}
interface initialStateType {
    rows: RowsType[]
}

const initialState: initialStateType = {
    rows: [
        {name: "Smirnov", task: "Komis", location: "VDNH"},
        {name: "Ivanov", task: "Strel", location: "VDNH-BS"},
        {name: "Sidorov", task: "Strel", location: "VDNH-Aleks"},
    ]
}

const tableSlice = createSlice({
    name: "selectedDate",
    initialState,
    reducers: {
        getRowsData: (state, action) => {

        }
    }
})
export const {getRowsData} = tableSlice.actions

export default tableSlice.reducer