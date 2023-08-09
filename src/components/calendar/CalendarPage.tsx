import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";

import {TableComponent} from "./table/Table.tsx";
import {useAppDispatch, useAppSelector} from "../../store/config/hook.ts";
import {getDate} from "../../store/slices/calendarSlice.ts";

export const CalendarPage = () => {

    const selectedDate = useAppSelector(state => state.selectedDate.selectedDate)
    const selectedDateObject = selectedDate ? new Date(selectedDate) : null

    const dispatch = useAppDispatch()

    const handleDateChange = (date: Date | null) => {
        dispatch(getDate(date ? date.toISOString() : null))
    };

    console.log(selectedDateObject)

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    orientation="landscape"
                    value={selectedDateObject}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>

            {/*{selectedDateObject && (*/}
            {/*    <div>*/}
                    <TableComponent/>
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};
