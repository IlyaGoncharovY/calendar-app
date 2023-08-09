import {Button, ButtonGroup} from "@mui/material";

export const GroupButton = () => {
    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button>Печать</Button>
            <Button>Изменить</Button>
            <Button>Удалить</Button>
        </ButtonGroup>
    );
};

