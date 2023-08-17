import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";

import tableReducer from "../slices/tableSlice.ts"
import calendarReducer from "../slices/calendarSlice.ts"
import dateForUsersReducer from "../slices/dateForUsersSlice.ts"

export const store = configureStore({
    reducer: {
        selectedDate: calendarReducer,
        tableDate: tableReducer,
        dateUsers: dateForUsersReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;