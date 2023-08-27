import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";

import appReducer from "../slices/appSlice.ts"
import tableReducer from "../slices/tableSlice.ts"
import calendarReducer from "../slices/calendarSlice.ts"
import dateForUsersReducer from "../slices/dateForUsersSlice.ts"

export const store = configureStore({
    reducer: {
        app: appReducer,
        tableDate: tableReducer,
        selectedDate: calendarReducer,
        dateUsers: dateForUsersReducer,
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;