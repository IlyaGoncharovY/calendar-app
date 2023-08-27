import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TemplateBaseType = {
    message: string
    name: string
    stack: string
    properties: PropertyType
}

type PropertyType = {
    explanation: string
    id: string
    errors: TemplateErrorType[]
}

export interface TemplateErrorType {
    name: string
    message: string
    stack: string
    properties: {
        xtag: string
        id: string
        context: string
        offset: number
        explanation: string
        file: string
    }
}

interface initialStateType {
    error: string
    templateError: TemplateBaseType | null
    loading: boolean
}

const initialState: initialStateType = {
    error: "",
    templateError: null,
    loading: false
}

const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload
        },
        setErrorTemplate: (state, action: PayloadAction<TemplateBaseType>) => {
            state.templateError = action.payload
        },
        setLoading: (state, action:PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})
export const {setError, setLoading, setErrorTemplate} = appSlice.actions

export default appSlice.reducer