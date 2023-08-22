import {FC} from "react";
import {v1} from "uuid";
import {Button, TextField, Typography} from "@mui/material";

import {BasicModalWindow} from "../BasicModalWindow.tsx";
import {GroupSelect} from "../../../commonComponents/GroupSelect.tsx";
import {useAppDispatch, useAppSelector } from "../../../../store/config/hook.ts";
import {addRowsDataTC, RowsTypeWithDate} from "../../../../store/slices/tableSlice.ts";

interface IModal {
    open: boolean
    setOpen: (value: boolean) => void
    selectedDateObject: Date | null
}

export const AddModalWindow: FC<IModal> = ({open, setOpen, selectedDateObject}) => {

    const selectedTask = useAppSelector(state => state.dateUsers.selectedTask)
    const rowId = v1()

    const dispatch = useAppDispatch()

    const handleClose = () => setOpen(false)

    const addNewRowHandler = () => {
        const nameInput = document.getElementById("name-input") as HTMLInputElement
        const locationInput = document.getElementById("location-input") as HTMLInputElement

        const newRow: RowsTypeWithDate = {
            name: nameInput.value,
            task: selectedTask,
            location: locationInput.value,
            date: selectedDateObject!.toISOString(),
            rowId: rowId
        }
        dispatch(addRowsDataTC(newRow))
        handleClose()
    }

    return (
        <div>
            <BasicModalWindow open={open} setOpen={setOpen}>
                {"Добавить"}
                <Typography id="modal-modal-description1" variant="h6" component="h2">
                    <TextField id="name-input" label="Ф.И.О" variant="standard"/>
                </Typography>
                <Typography id="modal-modal-description2" sx={{mt: 2}}>
                    <GroupSelect/>
                </Typography>
                <Typography id="modal-modal-" sx={{mt: 2}}>
                    <TextField id="location-input" label="Станция/Перегон" variant="standard"/>
                </Typography>
                    <Button onClick={addNewRowHandler} disabled={false} sx={{mt: 2}}>Добавить</Button>
            </BasicModalWindow>
        </div>
    );
};

