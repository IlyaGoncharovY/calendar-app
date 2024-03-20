import {FC} from "react";
import {Alert, AlertTitle, Stack} from "@mui/material";

import {TemplateErrorType} from "../../store/slices/appSlice.ts";

interface IErrorAlert {
    error: TemplateErrorType | string
}

export const ErrorAlert: FC<IErrorAlert> = ({error}) => {
    return (
        <Stack sx={{width: '100%'}} spacing={2}>
            <Alert severity="warning">
                <AlertTitle>
                    {typeof error === 'object' ? error.name : 'Error'}
                </AlertTitle>
                <div>
                    Message - {' '}
                    <strong>
                        {typeof error === 'object' ? error.message : error}
                    </strong>
                </div>
                {typeof error === 'object' && (
                    <div>
                        Explanation -{' '}
                        <strong>{error.properties.explanation}</strong>
                    </div>
                )}
            </Alert>
        </Stack>
    );
};

