import * as PizZip from "pizzip";
import {saveAs} from "file-saver";
import Docxtemplater from "docxtemplater";

import {RowsTypeWithDate} from "../../store/slices/tableSlice.ts";

const WORKS = {
    komiss: "Комиссионный",
    strel: "Стрелочный",
    volnovod: "Волновод",
    rabochka: "Рабочая комиссия"
}

export const handleFileDownload = async (rowId: string, rows: RowsTypeWithDate[]) => {

    const filteredRows = rows.filter(el => el.rowId === rowId)

    const dateForDocument = {
        name: filteredRows[0].name,
        hasKomiss: filteredRows[0].task === WORKS.komiss,
        hasStrel: filteredRows[0].task === WORKS.strel,
        hasVolnovod: filteredRows[0].task === WORKS.volnovod,
        hasRabochka: filteredRows[0].task === WORKS.rabochka,
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