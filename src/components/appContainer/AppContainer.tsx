import {AppBar, Box, Toolbar, Typography} from "@mui/material";

import {CalendarPage} from "./calendar/CalendarPage";

export const AppContainer = () => {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Hello!
                    </Typography>
                </Toolbar>
            </AppBar>
            <CalendarPage/>
        </Box>
    );
};