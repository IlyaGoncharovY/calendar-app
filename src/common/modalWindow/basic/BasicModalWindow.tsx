import {FC, ReactNode} from "react";
import {Box, Modal} from "@mui/material";

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

interface IBasicModalWindow {
    open: boolean
    setOpen: (value: boolean) => void
    children: ReactNode
}

export const BasicModalWindow: FC<IBasicModalWindow> = ({open, setOpen, children}) => {

    const handleClose = () => setOpen(false)

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
};