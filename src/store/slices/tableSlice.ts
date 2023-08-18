import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../config/store.ts";

export type RowsType = {
    name: string,
    task: string,
    location: string,
}
export interface RowsTypeWithDate extends RowsType {
    date: string
    rowId: string
}

interface initialStateType {
    rows: RowsTypeWithDate[]
}

const initialState: initialStateType = {
    rows: []
}

const tableSlice = createSlice({
    name: "selectedDate",
    initialState,
    reducers: {
        getRowsData: (state) => {
            const existingData = JSON.parse(localStorage.getItem("rowsData") || "[]")
            state.rows = existingData
        },
        addRowsData: (state, action:PayloadAction<RowsTypeWithDate>) => {
            state.rows.push(action.payload)
        },
        removeRowsData: (state, action: PayloadAction<string>) => {
            state.rows = state.rows.filter(row => row.rowId !== action.payload)
        }
    }
})
export const {addRowsData, getRowsData, removeRowsData} = tableSlice.actions

export const addRowsDataTC = (newRow: RowsTypeWithDate): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(addRowsData(newRow))
            const existingData = JSON.parse(localStorage.getItem("rowsData") || "[]")
            const newData = [...existingData, newRow]
            localStorage.setItem("rowsData", JSON.stringify(newData))
        } catch (e) {
            console.log({ e })
        }
    }

export const removeRowsDataTC = (rowId: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(removeRowsData(rowId)) // Remove from Redux state
            const existingData = JSON.parse(localStorage.getItem("rowsData") || "[]")
            const newData = existingData.filter((row: RowsTypeWithDate) => row.rowId !== rowId)
            localStorage.setItem("rowsData", JSON.stringify(newData))
        } catch (e) {
            console.log({ e })
        }
    }

export default tableSlice.reducer