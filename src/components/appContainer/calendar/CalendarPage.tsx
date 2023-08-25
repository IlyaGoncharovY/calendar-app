import dayjs, {Dayjs} from "dayjs";
import {Badge, Button} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, PickersDay, PickersDayProps, StaticDatePicker} from "@mui/x-date-pickers";

import {TableComponent} from "./table/TableComponent.tsx";
import {getDate} from "../../../store/slices/calendarSlice.ts";
import {useModalWindow} from "../../../common/hooks/useModalWindow.ts";
import {useAppDispatch, useAppSelector} from "../../../store/config/hook.ts";
import {ModalActionWindow} from "../../../common/modalWindow/basic/modalAction/ModalActionWindow.tsx";

export const CalendarPage = () => {

    const selectedDate = useAppSelector(state => state.selectedDate.selectedDate)
    const selectedDateObject = selectedDate ? dayjs(selectedDate) : null
    const rows = useAppSelector(state => state.tableDate.rows)

    const {open, setOpen, handleOpen} = useModalWindow()

    const dispatch = useAppDispatch()

    const handleDateChange = (date: Dayjs | null) => {
        dispatch(getDate(date ? date.toISOString() : null))
    }

    const datesWithRows = rows.map(row => new Date(row.date))

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    orientation="landscape"
                    value={selectedDateObject}
                    onChange={handleDateChange}
                    slots={{
                        day: CustomDaySlot,
                    }}
                    slotProps={{
                        day: {
                            datesWithRows,
                        } as any
                    }}
                />
            </LocalizationProvider>
            {selectedDateObject && <Button onClick={handleOpen}>Добавить событие</Button>}
            <TableComponent/>
            <ModalActionWindow open={open} setOpen={setOpen} selectedDateObject={selectedDateObject}/>
        </div>
    )
}
/**
 * a slot for rendering an icon 💪, when there is an event
 * @param props
 * @constructor
 */
const CustomDaySlot = (props: PickersDayProps<Dayjs> & { datesWithRows?: Date[] }) => {
    const { datesWithRows, day, outsideCurrentMonth, ...other } = props
    const hasRowsForSelectedDate = datesWithRows && datesWithRows.some(date => date.getTime() === day.toDate().getTime())

    return (
        <Badge
            key={props.day.toString()}
            overlap="circular"
            badgeContent={hasRowsForSelectedDate ? '💪' : undefined}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    )
}

