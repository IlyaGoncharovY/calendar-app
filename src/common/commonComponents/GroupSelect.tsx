import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material"

import {tasksArray} from "../dataSet/dateOfTable.ts";
import {useAppDispatch, useAppSelector} from "../../store/config/hook.ts";
import {setSelectedTasks, setTasks} from "../../store/slices/dateForUsersSlice.ts";

export const GroupSelect = () => {

    const task = useAppSelector(state => state.dateUsers.task)

    const dispatch = useAppDispatch()

    const handleTaskSelect = (task: string) => {
        dispatch(setSelectedTasks(task))
    }

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setTasks(event.target.value))
        handleTaskSelect(event.target.value)
    };

    return (
        <div>
            <FormControl variant="standard" sx={{m: 1, minWidth: 120}}>
                <InputLabel id="demo-simple-select-standard-label">Работы</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={task}
                    onChange={handleChange}
                    label="Работы"
                >
                    {tasksArray.map((jobs, index) =>
                        <MenuItem key={index} value={jobs.task}>
                            {jobs.task}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
        </div>
    );
};