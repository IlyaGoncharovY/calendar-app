import {FC, useEffect, useState} from "react";
import {v1} from "uuid";
import {Dayjs} from "dayjs";
import {Button, TextField, Typography} from "@mui/material";

import {BasicModalWindow} from "../BasicModalWindow.tsx";
import {GroupSelect} from "../../../commonComponents/GroupSelect.tsx";
import {useAppDispatch, useAppSelector} from "../../../../store/config/hook.ts";
import {addRowsDataTC, changeRowsDataTC, RowsTypeWithDate} from "../../../../store/slices/tableReducer/tableSlice.ts";


interface IModalActionWindow {
    open: boolean
    setOpen: (value: boolean) => void
    selectedDateObject: Dayjs | null
    rowIdToChange?: string
    rows?: RowsTypeWithDate[]
}

export const ModalActionWindow: FC<IModalActionWindow> = ({
                                                              open,
                                                              setOpen,
                                                              rowIdToChange,
                                                              selectedDateObject,
                                                              rows
                                                          }) => {

    const selectedTask = useAppSelector(state => state.dateUsers.selectedTask)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')

    const modalTitle = rowIdToChange ? "Изменить" : "Добавить"

    const dispatch = useAppDispatch()
    const handleClose = () => setOpen(false)

    const handleModalAction = () => {

        const rowData: RowsTypeWithDate = {
            name: name,
            task: selectedTask,
            location: location,
            date: selectedDateObject!.toISOString(),
            rowId: rowIdToChange || v1(),
            comments: null
        }

        if (rowIdToChange) {
            dispatch(changeRowsDataTC(rowData))
        } else {
            dispatch(addRowsDataTC(rowData))
        }

        handleClose()
    }

    useEffect(() => {
        if (rowIdToChange) {
            const selectedRow = rows?.find(row => row.rowId === rowIdToChange)
            if (selectedRow) {
                setName(selectedRow.name)
                setLocation(selectedRow.location)
            }
        }
    }, [rowIdToChange, rows])

    return (
        <div>
            <BasicModalWindow open={open} setOpen={setOpen}>
                {modalTitle}
                <Typography id="modal-modal-description1" variant="h6" component="h2">
                    <TextField id="name-input" label="Ф.И.О" variant="standard"  value={name}
                               onChange={(e) => setName(e.currentTarget.value)} />
                </Typography>
                <Typography id="modal-modal-description2" sx={{mt: 2}}>
                    <GroupSelect/>
                </Typography>
                <Typography id="modal-modal-" sx={{ mt: 2 }}>
                    <TextField id="location-input" label="Станция/Перегон" variant="standard" value={location}
                               onChange={(e) => setLocation(e.currentTarget.value)}/>
                </Typography>
                <Button onClick={handleModalAction} disabled={false} sx={{mt: 2}}>
                    {modalTitle}
                </Button>
            </BasicModalWindow>
        </div>
    )
}
