import {useState} from 'react';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";
import {TableComponent} from "./table/Table.tsx";

export const CalendarPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    orientation="portrait"
                    value={selectedDate}
                    onChange={handleDateChange}
                />
            </LocalizationProvider>

            {selectedDate && (
                <div>
                    <TableComponent selectedDate={selectedDate.toString()}/>
                </div>
            )}
        </div>
    );
};
