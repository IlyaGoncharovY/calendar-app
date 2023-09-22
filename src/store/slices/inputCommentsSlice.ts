import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";

export interface IValueType {
    id: string
    value: string
}

export interface initialStateTableType {
    valueInputs: IValueType[]
}

const initialState: initialStateTableType = {
    valueInputs: [{id: '', value: ''}],
}

const inputCommentsSlice = createSlice({
    name: "inputCommentsReducer",
    initialState,
    reducers: {
        setValueInputs: (state, action: PayloadAction<IValueType[]>) => {
            state.valueInputs = action.payload
        },
        addInput: (state) => {
            state.valueInputs.push({id: v1(), value: ''})
        },
        deleteInput: (state, action: PayloadAction<string>) => {
            state.valueInputs = state.valueInputs.filter((input) => input.id !== action.payload);
        },
    }
})
export const {
    setValueInputs,
    addInput,
    deleteInput,
} = inputCommentsSlice.actions

export default inputCommentsSlice.reducer
