import {FC} from "react";
import * as PizZip from "pizzip";
import {saveAs} from "file-saver";
import Docxtemplater from "docxtemplater";
import {Button, ButtonGroup} from "@mui/material";

import {useModalWindow} from "../hooks/useModalWindow.ts";
import {removeRowsDataTC} from "../../store/slices/tableSlice.ts";
import {useAppDispatch, useAppSelector} from "../../store/config/hook.ts";
import {ChangeModalWindow} from "../modalWindow/basic/changeModalWindow/ChangeModalWindow.tsx";

interface IGroupButton {
    rowId: string
}

export const GroupButton: FC<IGroupButton> = ({rowId}) => {

    const rows = useAppSelector(state => state.tableDate.rows)

    const {open, setOpen, handleOpen} = useModalWindow()

    const dispatch = useAppDispatch()

    const removeClickHandler = (rowId: string) => {
        dispatch(removeRowsDataTC(rowId))
    }

    const handleFileDownload = async (rowId: string) => {

        const filteredRows = rows.filter(el => el.rowId === rowId)

        const dateForDocument = {
            name: filteredRows[0].name,
            hasKomiss: filteredRows[0].task === "Комиссионный",
            hasStrel: filteredRows[0].task === "Стрелочный",
            hasVolnovod: filteredRows[0].task === "Волновод",
            hasRabochka: filteredRows[0].task === "Рабочая комиссия",
            task: filteredRows[0].task,
            location: filteredRows[0].location,
            date: filteredRows[0].date,
        }

        const docxFileUrl = "../../../public/files/raport.docx"

        try {
            const response = await fetch(docxFileUrl);
            const data = await response.arrayBuffer();

            const zip = new PizZip(data);

            const templateDoc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true
            })

            templateDoc.render(dateForDocument);

            const generatedDoc = templateDoc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                compression: "DEFLATE"
            })

            saveAs(generatedDoc, `raport${filteredRows[0].task}.docx`);
        } catch (error) {
            console.log('Error: ' + error);
        }
    }

    return (
        <>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => handleFileDownload(rowId)}>Печать</Button>
                <Button onClick={handleOpen}>Изменить</Button>
                <Button onClick={() => removeClickHandler(rowId)}>Удалить</Button>
            </ButtonGroup>
            <ChangeModalWindow open={open} setOpen={setOpen}/>
        </>
    );
};

