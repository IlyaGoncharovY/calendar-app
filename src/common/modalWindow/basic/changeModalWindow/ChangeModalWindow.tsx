import {FC} from "react";
import {Button, TextField, Typography} from "@mui/material";

import {BasicModalWindow} from "../BasicModalWindow.tsx";
import {GroupSelect} from "../../../commonComponents/GroupSelect.tsx";
import {useAppDispatch, useAppSelector} from "../../../../store/config/hook.ts";
import {changeRowsDataTC, RowsTypeWithDate} from "../../../../store/slices/tableSlice.ts";

interface IModal {
    open: boolean
    setOpen: (value: boolean) => void
    selectedDateObject: Date | null
    rowIdToChange: string
}

export const ChangeModalWindow: FC<IModal> = ({
                                                  open,
                                                  setOpen,
                                                  selectedDateObject,
                                                  rowIdToChange
                                              }) => {

    const rows = useAppSelector((state) => state.tableDate.rows)
    const selectedTask = useAppSelector(state => state.dateUsers.selectedTask)

    const dispatch = useAppDispatch();

    const handleClose = () => setOpen(false);

    const rowToChange = rows.find((row) => row.rowId === rowIdToChange)

    const changeRowHandler = () => {
        const nameInput = document.getElementById("name-input") as HTMLInputElement
        const locationInput = document.getElementById("location-input") as HTMLInputElement
        if (rowToChange) {
            const updatedRow: RowsTypeWithDate = {
                name: nameInput.value,
                task: selectedTask,
                location: locationInput.value,
                date: selectedDateObject!.toISOString(),
                rowId: rowIdToChange
            }

            dispatch(changeRowsDataTC(updatedRow))
            handleClose()
        }
    }

    return (
        <div>
            <BasicModalWindow open={open} setOpen={setOpen}>
                {"Изменить"}
                <Typography id="modal-modal-description1" variant="h6" component="h2">
                    <TextField id="name-input" label="Ф.И.О" variant="standard"/>
                </Typography>
                <Typography id="modal-modal-description2" sx={{mt: 2}}>
                    <GroupSelect/>
                </Typography>
                <Typography id="modal-modal-" sx={{mt: 2}}>
                    <TextField id="location-input" label="Станция/Перегон" variant="standard"/>
                </Typography>
                <Button onClick={changeRowHandler} disabled={false} sx={{mt: 2}}>Изменить</Button>
            </BasicModalWindow>
        </div>
    );
};

