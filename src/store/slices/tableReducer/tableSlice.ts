import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {AppThunk} from "../../config/store.ts";
import {setError, setLoading} from "../appSlice.ts";

export type RowsType = {
    name: string,
    task: string,
    location: string,
}

export type CommentsType = {
    id: string
    value: string
}

export interface RowsTypeWithDate extends RowsType {
    date: string
    rowId: string
    comments: CommentsType[] | null
}

export interface initialStateTableType {
    rows: RowsTypeWithDate[]
}

const initialState: initialStateTableType = {
    rows: [],
}

/**
 * util function for addCommentsToRow and saveCommentsToLocal
 * @param state
 * @param rowId
 * @param comments
 */
const updateComments = (state: initialStateTableType, rowId: string, comments: CommentsType[]) => {
    const rowIndex = state.rows.findIndex((row) => row.rowId === rowId);
    if (rowIndex !== -1) {
        state.rows[rowIndex].comments = comments.map((comment) => ({
            id: comment.id,
            value: comment.value,
        }));
    }
};

const tableSlice = createSlice({
    name: "tableReducer",
    initialState,
    reducers: {
        getRowsData: (state) => {
            state.rows = JSON.parse(localStorage.getItem("rowsData") || "[]")
        },
        addRowsData: (state, action: PayloadAction<RowsTypeWithDate>) => {
            state.rows.push(action.payload)
        },
        changeRowsData: (state, action: PayloadAction<RowsTypeWithDate>) => {
            const {rowId, ...updatedData} = action.payload
            const rowIndex = state.rows.findIndex(row => row.rowId === rowId)
            if (rowIndex !== -1) {
                state.rows[rowIndex] = {
                    ...state.rows[rowIndex],
                    ...updatedData
                }
            }
        },
        removeRowsData: (state, action: PayloadAction<string>) => {
            state.rows = state.rows.filter(row => row.rowId !== action.payload)
        },
        addCommentsToRow: (state, action: PayloadAction<{ rowId: string; comments: CommentsType[] }>) => {
            const { rowId, comments } = action.payload
            updateComments(state, rowId, comments)
            localStorage.setItem("rowsData", JSON.stringify(state.rows))
        },
        saveCommentsToLocal: (state, action: PayloadAction<{ rowId: string; comments: CommentsType[] }>) => {
            const { rowId, comments } = action.payload
            updateComments(state, rowId, comments)
            localStorage.setItem(`comments-${rowId}`, JSON.stringify(comments))
        },
    }
})
export const {
    addRowsData,
    getRowsData,
    removeRowsData,
    changeRowsData,
    addCommentsToRow,
    saveCommentsToLocal
} = tableSlice.actions

export const addRowsDataTC = (newRow: RowsTypeWithDate): AppThunk =>
    async (dispatch) => {
        dispatch(setLoading(true))
        try {
            dispatch(addRowsData(newRow))
            const existingData = JSON.parse(localStorage.getItem("rowsData") || "[]")
            const newData = [...existingData, newRow]
            localStorage.setItem("rowsData", JSON.stringify(newData))
            dispatch(setLoading(false))
        } catch (e) {
            const error = e as string
            dispatch(setError(error))
        }
    }

export const changeRowsDataTC = (updateRow: RowsTypeWithDate): AppThunk =>
    async (dispatch, getState) => {
        dispatch(setLoading(true))
        try {
            dispatch(changeRowsData(updateRow))
            const updatedRows = getState().tableDate.rows
            localStorage.setItem("rowsData", JSON.stringify(updatedRows))
            dispatch(setLoading(false))
        } catch (e) {
            const error = e as string
            dispatch(setError(error))
        }
    }

export const removeRowsDataTC = (rowId: string): AppThunk =>
    async (dispatch) => {
        dispatch(setLoading(true))
        try {
            dispatch(removeRowsData(rowId))
            const existingData = JSON.parse(localStorage.getItem("rowsData") || "[]")
            const newData = existingData.filter((row: RowsTypeWithDate) => row.rowId !== rowId)
            localStorage.setItem("rowsData", JSON.stringify(newData))
            dispatch(setLoading(false))
        } catch (e) {
            const error = e as string
            dispatch(setError(error))
        }
    }

export const saveCommentsToLocalThunk = (rowId: string, comments: CommentsType[]): AppThunk => async (dispatch) => {
    try {
        dispatch(saveCommentsToLocal({ rowId, comments }))
    } catch (e) {
        const error = e as string
        dispatch(setError(error))
    }
};

export default tableSlice.reducer
