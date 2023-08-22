import {useState} from "react";

export const useModalWindow = () => {
    /**
     * status for the modal window
     */
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)

    return {
        open, setOpen, handleOpen
    }
}