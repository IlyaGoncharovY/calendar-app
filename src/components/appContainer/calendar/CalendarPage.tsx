import {Button} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";

import {TableComponent} from "./table/TableComponent.tsx";
import {getDate} from "../../../store/slices/calendarSlice.ts";
import {useModalWindow} from "../../../common/hooks/useModalWindow.ts";
import {useAppDispatch, useAppSelector} from "../../../store/config/hook.ts";
import {ModalActionWindow} from "../../../common/modalWindow/basic/modalAction/ModalActionWindow.tsx";

export const CalendarPage = () => {

    const selectedDate = useAppSelector(state => state.selectedDate.selectedDate)
    const selectedDateObject = selectedDate ? new Date(selectedDate) : null

    const {open, setOpen, handleOpen} = useModalWindow()

    const dispatch = useAppDispatch()

    const handleDateChange = (date: Date | null) => {
        dispatch(getDate(date ? date.toISOString() : null))
    };

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
            <ModalActionWindow open={open} setOpen={setOpen} selectedDateObject={selectedDateObject}/>
        </div>
    );
};
