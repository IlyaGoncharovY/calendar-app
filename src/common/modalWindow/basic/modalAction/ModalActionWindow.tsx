import {FC} from "react";
import {v1} from "uuid";
import {Button, TextField, Typography} from "@mui/material";

import {BasicModalWindow} from "../BasicModalWindow.tsx";
import {GroupSelect} from "../../../commonComponents/GroupSelect.tsx";
import {useAppDispatch, useAppSelector} from "../../../../store/config/hook.ts";
import {addRowsDataTC, changeRowsDataTC, RowsTypeWithDate} from "../../../../store/slices/tableSlice.ts";

interface IModalActionWindow {
    open: boolean
    setOpen: (value: boolean) => void
    selectedDateObject: Date | null
    rowIdToChange?: string
}

export const ModalActionWindow: FC<IModalActionWindow> = ({
                                                              open,
                                                              setOpen,
                                                              rowIdToChange,
                                                              selectedDateObject
                                                          }) => {

    const selectedTask = useAppSelector(state => state.dateUsers.selectedTask)

    const modalTitle = rowIdToChange ? "Изменить" : "Добавить"

    const dispatch = useAppDispatch()
    const handleClose = () => setOpen(false)

    const handleModalAction = () => {
        const nameInput = document.getElementById("name-input") as HTMLInputElement;
        const locationInput = document.getElementById("location-input") as HTMLInputElement;

        const rowData: RowsTypeWithDate = {
            name: nameInput.value,
            task: selectedTask,
            location: locationInput.value,
            date: selectedDateObject!.toISOString(),
            rowId: rowIdToChange || v1(),
        }

        if (rowIdToChange) {
            dispatch(changeRowsDataTC(rowData))
        } else {
            dispatch(addRowsDataTC(rowData))
        }

        handleClose()
    }

    return (
        <div>
            <BasicModalWindow open={open} setOpen={setOpen}>
                {modalTitle}
                <Typography id="modal-modal-description1" variant="h6" component="h2">
                    <TextField id="name-input" label="Ф.И.О" variant="standard" />
                </Typography>
                <Typography id="modal-modal-description2" sx={{ mt: 2 }}>
                    <GroupSelect />
                </Typography>
                <Typography id="modal-modal-" sx={{ mt: 2 }}>
                    <TextField id="location-input" label="Станция/Перегон" variant="standard" />
                </Typography>
                <Button onClick={handleModalAction} disabled={false} sx={{ mt: 2 }}>
                    {modalTitle}
                </Button>
            </BasicModalWindow>
        </div>
    )
}