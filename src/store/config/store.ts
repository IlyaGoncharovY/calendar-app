import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit";

import calendarReducer from "../slices/calendarSlice.ts"
import tableReducer from "../slices/tableSlice.ts"

export const store = configureStore({
    reducer: {
        selectedDate: calendarReducer,
        tableDate: tableReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;