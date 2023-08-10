import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {FC} from "react";
import {addRowsDataTC, RowsTypeWithDate} from "../../store/slices/tableSlice.ts";
import {useAppDispatch} from "../../store/config/hook.ts";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IModal {
    open: boolean
    setOpen: (value: boolean) => void
    selectedDateObject: Date | null
}

export const ModalWindow: FC<IModal> = ({open, setOpen, selectedDateObject}) => {

    const dispatch = useAppDispatch()

    const handleClose = () => setOpen(false)

    const addNewRowHandler = () => {
        const nameInput = document.getElementById("name-input") as HTMLInputElement
        const taskInput = document.getElementById("task-input") as HTMLInputElement
        const locationInput = document.getElementById("location-input") as HTMLInputElement

        const newRow: RowsTypeWithDate = {
            name: nameInput.value,
            task: taskInput.value,
            location: locationInput.value,
            date: selectedDateObject!.toISOString()
        }

        dispatch(addRowsDataTC(newRow))
        handleClose()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-description1" variant="h6" component="h2">
                        <TextField id="name-input" label="Ф.И.О" variant="standard"/>
                    </Typography>
                    <Typography id="modal-modal-description2" sx={{mt: 2}}>
                        <TextField id="task-input" label="Работы" variant="standard"/>
                    </Typography>
                    <Typography id="modal-modal-" sx={{mt: 2}}>
                        <TextField id="location-input" label="Станция/Перегон" variant="standard"/>
                    </Typography>
                    <Button onClick={addNewRowHandler} sx={{mt: 2}}>Добавить</Button>
                </Box>
            </Modal>
        </div>
    );
};

