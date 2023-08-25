import {FC} from "react";
import dayjs from "dayjs";
import {Button, ButtonGroup} from "@mui/material";

import {useModalWindow} from "../hooks/useModalWindow.ts";
import {handleFileDownload} from "../utils/utilFileDownload.ts";
import {removeRowsDataTC} from "../../store/slices/tableSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/config/hook.ts";
import {ModalActionWindow} from "../modalWindow/basic/modalAction/ModalActionWindow.tsx";

interface IGroupButton {
    rowId: string
}

export const GroupButton: FC<IGroupButton> = ({rowId}) => {

    const rows = useAppSelector(state => state.tableDate.rows)
    const selectedDate = useAppSelector(state => state.selectedDate.selectedDate)
    const selectedDateObject = selectedDate ? dayjs(selectedDate) : null

    const {open, setOpen, handleOpen} = useModalWindow()

    const dispatch = useAppDispatch()

    const removeClickHandler = (rowId: string) => {
        dispatch(removeRowsDataTC(rowId))
    }

    return (
        <>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => handleFileDownload(rowId, rows)}>Печать</Button>
                <Button onClick={handleOpen}>Изменить</Button>
                <Button onClick={() => removeClickHandler(rowId)}>Удалить</Button>
            </ButtonGroup>
            <ModalActionWindow open={open} setOpen={setOpen} rowIdToChange={rowId} selectedDateObject={selectedDateObject}/>
        </>
    );
};

