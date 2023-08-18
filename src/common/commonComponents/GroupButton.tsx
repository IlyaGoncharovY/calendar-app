import {FC} from "react";
import {Button, ButtonGroup} from "@mui/material";

import {useAppDispatch} from "../../store/config/hook.ts";
import {removeRowsDataTC} from "../../store/slices/tableSlice.ts";

interface IGroupButton {
    rowId: string
}

export const GroupButton: FC<IGroupButton> = ({rowId}) => {

    const dispatch = useAppDispatch()

    const removeClickHandler = (rowId: string) => {
        dispatch(removeRowsDataTC(rowId))
    }

    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button disabled={true}>Печать</Button>
            <Button disabled={true}>Изменить</Button>
            <Button onClick={() => removeClickHandler(rowId)}>Удалить</Button>
        </ButtonGroup>
    );
};

