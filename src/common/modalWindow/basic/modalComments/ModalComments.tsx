import {FC, useEffect, useState} from "react";
import {v1} from "uuid";
import {Button, TextField, Typography} from "@mui/material";

import {BasicModalWindow} from "../BasicModalWindow.tsx";
import {useAppDispatch} from "../../../../store/config/hook.ts";
import {addCommentsToRow, saveCommentsToLocalThunk} from "../../../../store/slices/tableReducer/tableSlice.ts";

interface IModalComments {
    open: boolean
    setOpen: (value: boolean) => void
    rowId: string
}

export const ModalComments: FC<IModalComments> = ({open, setOpen, rowId}) => {

    const [valueInputs, setValueInputs] = useState<{value: string}[]>([{value: ""}])

    const dispatch = useAppDispatch()

    const addInputHandler = () => {
        setValueInputs(prevState => ([...prevState, {value: ''}]))
    }

    const deleteInputHandler = () => {
        if (valueInputs.length > 1) {
            const newChangeInput = [...valueInputs]
            newChangeInput.pop()
            setValueInputs(newChangeInput)
        }
    }

    const addCommentHandler = () => {
        const commentId = v1()
        const commentsArray = valueInputs.map((input) => ({
            id: commentId,
            value: input.value,
        }));
        dispatch(addCommentsToRow({ rowId, comments: commentsArray }))
        dispatch(saveCommentsToLocalThunk(rowId, commentsArray))
        setOpen(false)
    };

    useEffect(() => {
        if (open) {
            const storedComments = localStorage.getItem(`comments-${rowId}`)
            if (storedComments) {
                const commentsArray = JSON.parse(storedComments)
                setValueInputs(commentsArray)
            }
        }
    }, [open, rowId])

    return (
        <div>
            <BasicModalWindow open={open} setOpen={setOpen}>
                <Typography id="modal-modal-description1" variant="h6" component="h2">
                    {valueInputs.map((input, index) => <div key={index}>
                        <TextField
                            id={`comments-input-${index}`}
                            label="Добавить замечания"
                            variant="standard"
                            value={input.value}
                            onChange={(e) => {
                                const newValueInputs = [...valueInputs]
                                newValueInputs[index] = { value: e.currentTarget.value }
                                setValueInputs(newValueInputs)
                            }}
                        />
                    </div>)}
                </Typography>
                <Button onClick={addInputHandler} variant={"contained"} style={{margin: "5px"}}>+</Button>
                <Button onClick={deleteInputHandler} variant={"contained"} disabled={valueInputs.length <= 1}>-</Button>
                <Button onClick={addCommentHandler}>Сохранить</Button>
            </BasicModalWindow>
        </div>
    );
};
