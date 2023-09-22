import {FC, useState} from "react";
import dayjs from "dayjs";
import {Button, ButtonGroup} from "@mui/material";

import {useModalWindow} from "../hooks/useModalWindow.ts";
import {handleFileDownload} from "../utils/utilFileDownload.ts";
import {useAppDispatch, useAppSelector} from "../../store/config/hook.ts";
import {removeRowsDataTC} from "../../store/slices/tableReducer/tableSlice.ts";
import {ModalComments} from "../modalWindow/basic/modalComments/ModalComments.tsx";
import {ModalActionWindow} from "../modalWindow/basic/modalAction/ModalActionWindow.tsx";

interface IGroupButton {
    rowId: string
}

export const GroupButton: FC<IGroupButton> = ({rowId}) => {

    const rows = useAppSelector(state => state.tableDate.rows)
    const selectedDate = useAppSelector(state => state.selectedDate.selectedDate)
    const selectedDateObject = selectedDate ? dayjs(selectedDate) : null

    const [commentsModal, setCommentsModal] = useState<boolean>(false)
    const {open, setOpen, handleOpen} = useModalWindow()

    const dispatch = useAppDispatch()

    const removeClickHandler = (rowId: string) => {
        dispatch(removeRowsDataTC(rowId))
    }
    const handleCommentsModal = () => setCommentsModal(true)

    return (
        <>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => handleFileDownload(rowId, rows, dispatch)}>Печать</Button>
                <Button onClick={handleCommentsModal}>Добавить замечания</Button>
                <Button onClick={handleOpen}>Изменить</Button>
                <Button onClick={() => removeClickHandler(rowId)}>Удалить</Button>
            </ButtonGroup>
            <ModalActionWindow open={open}
                               setOpen={setOpen}
                               rowIdToChange={rowId}
                               selectedDateObject={selectedDateObject}
                               rows={rows}
            />
            <ModalComments open={commentsModal} setOpen={setCommentsModal} rowId={rowId}/>
        </>
    );
};

