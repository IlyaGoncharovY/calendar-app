import {useState} from "react";
import {Button} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";

import {TableComponent} from "./table/TableComponent.tsx";
import {getDate} from "../../../store/slices/calendarSlice.ts";
import {ModalWindow} from "../../../common/modalWindow/ModalWindow.tsx";
import {useAppDispatch, useAppSelector} from "../../../store/config/hook.ts";

export const CalendarPage = () => {

    const selectedDate = useAppSelector(state => state.selectedDate.selectedDate)
    const selectedDateObject = selectedDate ? new Date(selectedDate) : null
    /**
     * status for the modal window
     */
    const [open, setOpen] = useState(false);

    const dispatch = useAppDispatch()

    const handleOpen = () => setOpen(true)

    const handleDateChange = (date: Date | null) => {
        dispatch(getDate(date ? date.toISOString() : null))
    };

    // console.log(selectedDateObject)

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    orientation="landscape"
                    value={selectedDateObject}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>
            {selectedDateObject && <Button onClick={handleOpen}>Добавить событие</Button>}
            <TableComponent/>
            <ModalWindow open={open} setOpen={setOpen} selectedDateObject={selectedDateObject}/>
        </div>
    );
};
