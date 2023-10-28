import {FC, useEffect} from "react";
import {v1} from "uuid";
import {Button, TextField, Typography} from "@mui/material";

import {BasicModalWindow} from "../BasicModalWindow.tsx";
import {useAppDispatch, useAppSelector} from "../../../../store/config/hook.ts";
import {addInput, deleteInput, setValueInputs} from "../../../../store/slices/inputCommentsSlice.ts";
import {addCommentsToRow, saveCommentsToLocalThunk} from "../../../../store/slices/tableReducer/tableSlice.ts";


interface IModalComments {
    open: boolean
    setOpen: (value: boolean) => void
    rowId: string
}

export const ModalComments: FC<IModalComments> = ({open, setOpen, rowId}) => {

    const valueInputs = useAppSelector(state => state.input.valueInputs)

    const dispatch = useAppDispatch()

    const addInputHandler = () => {
        dispatch(addInput())
    }

    const deleteInputHandler = (inputId: string) => {
        dispatch(deleteInput(inputId))
    }

    const updateInputValue = (index: number, newValue: string) => {
        const updatedInputs = valueInputs.map((input, i) =>
            i === index ? {...input, value: newValue} : input
        )
        dispatch(setValueInputs(updatedInputs))
    }

    const addCommentHandler = () => {
        const commentsArray = valueInputs.map((input) => ({
            id: input.id || v1(),
            value: input.value,
        }))
        if (commentsArray.length === 0) {
            dispatch(addCommentsToRow({rowId, comments: null}))
            dispatch(saveCommentsToLocalThunk(rowId, null))
        } else {
            dispatch(addCommentsToRow({rowId, comments: commentsArray}))
            dispatch(saveCommentsToLocalThunk(rowId, commentsArray))
        }
        setOpen(false)
    }

    useEffect(() => {
        if (open) {
            const storedComments = localStorage.getItem(`comments-${rowId}`)
            if (storedComments) {
                const commentsArray = JSON.parse(storedComments)
                dispatch(setValueInputs(commentsArray))
            }
        }
    }, [open, rowId])

    return (
        <div>
            <BasicModalWindow open={open} setOpen={setOpen}>
                <Typography id="modal-modal-description1" variant="h6" component="h2">
                    {valueInputs.map((input, index) => <div key={input.id}>
                        <TextField
                            id={`comments-input-${index}`}
                            label="Добавить замечания"
                            variant="standard"
                            value={input.value}
                            onChange={(e) => {
                                updateInputValue(index, e.currentTarget.value)
                            }}
                        />
                        <Button onClick={() => deleteInputHandler(input.id)} variant={"contained"}
                                size={"small"}>-</Button>
                    </div>)}
                </Typography>
                <Button onClick={addInputHandler} variant={"contained"} style={{margin: "5px"}}>+</Button>
                <Button onClick={addCommentHandler}>Сохранить</Button>
            </BasicModalWindow>
        </div>
    );
};
