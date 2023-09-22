import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TaskType} from "./tableReducer/tableSlice.ts";

interface initialStateType {
    task: string,
    selectedTask: TaskType | ""
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
        setSelectedTasks: (state, action: PayloadAction<TaskType | "">) => {
            state.selectedTask = action.payload
        }
    }
})
export const {setTasks, setSelectedTasks} = dateForUsersSlice.actions

export default dateForUsersSlice.reducer
