import {FC} from "react";
import {Alert, AlertTitle, Stack} from "@mui/material";

import {TemplateErrorType} from "../../store/slices/appSlice.ts";

interface IErrorAlert {
    error: TemplateErrorType
}

export const ErrorAlert: FC<IErrorAlert> = ({error}) => {
    return (
        <Stack sx={{width: '100%'}} spacing={2}>
            <Alert severity="warning">
                <AlertTitle>{error.name}</AlertTitle>
                <div>
                    Message - <strong>{error.message}</strong>
                </div>
                <div>
                    Explanation - <strong>{error.properties.explanation}</strong>
                </div>
            </Alert>
        </Stack>
    );
};

