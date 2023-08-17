import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface initialStateType {
    task: string,
    selectedTask: string
}

const initialState: initialStateType = {
    task: "",
    selectedTask: ""
}

const dateForUsersSlice = createSlice({
    name: "dateForUser",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<string>) => {
            state.task = action.payload
        },
        setSelectedTasks: (state, action: PayloadAction<string>) => {
            state.selectedTask = action.payload
        }
    }
})
export const {setTasks, setSelectedTasks} = dateForUsersSlice.actions

export default dateForUsersSlice.reducer