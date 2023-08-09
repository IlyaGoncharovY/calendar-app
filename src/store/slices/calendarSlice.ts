import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface initialStateType {
    selectedDate: string | null
}

const initialState: initialStateType = {
    selectedDate: null,
}

const calendarSlice = createSlice({
    name: "selectedDate",
    initialState,
    reducers: {
        getDate: (state, action: PayloadAction<string | null>) => {
            state.selectedDate = action.payload
        }
    }
})
export const {getDate} = calendarSlice.actions

export default calendarSlice.reducer