import {AppBar, Box, Toolbar, Typography} from "@mui/material";

import {CalendarPage} from "./calendar/CalendarPage";
import {useAppSelector} from "../../store/config/hook.ts";
import {ErrorAlert} from "../../common/commonComponents/ErrorAlert.tsx";

export const AppContainer = () => {

    const templateError = useAppSelector(state => state.app.templateError)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Hello!
                    </Typography>
                </Toolbar>
            </AppBar>
            {templateError && templateError.properties.errors.map((error, index) =>
                <div key={index}>
                    <ErrorAlert error={error}/>
                </div>)}
            <CalendarPage/>
        </Box>
    );
};