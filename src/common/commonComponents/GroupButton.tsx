import {FC} from "react";
import {Button, ButtonGroup} from "@mui/material";

import {useAppDispatch} from "../../store/config/hook.ts";
import {removeRowsDataTC} from "../../store/slices/tableSlice.ts";

interface IGroupButton {
    dateId: string
}

export const GroupButton: FC<IGroupButton> = ({dateId}) => {

    const dispatch = useAppDispatch()

    const removeClickHandler = (dateId: string) => {
        dispatch(removeRowsDataTC(dateId))
    }

    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button disabled={true}>Печать</Button>
            <Button disabled={true}>Изменить</Button>
            <Button onClick={() => removeClickHandler(dateId)}>Удалить</Button>
        </ButtonGroup>
    );
};

