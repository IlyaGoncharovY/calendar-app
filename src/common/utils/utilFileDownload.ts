import PizZip from 'pizzip';
import {saveAs} from "file-saver";
import Docxtemplater from "docxtemplater";
import PizZipUtils from 'pizzip/utils/index.js';

import {AppDispatch} from "../../store/config/store.ts";
import {RowsTypeWithDate} from "../../store/slices/tableSlice.ts";
import {setErrorTemplate, TemplateBaseType} from "../../store/slices/appSlice.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import file from "../../assets/files/raport.docx"

const WORKS = {
    komiss: "Комиссионный",
    strel: "Стрелочный",
    volnovod: "Волновод",
    rabochka: "Рабочая комиссия"
}

function loadFile(url: string, callback: (err: Error, data: string) => void) {
    PizZipUtils.getBinaryContent(url, callback);
}

export const handleFileDownload = async (rowId: string, rows: RowsTypeWithDate[], dispatch: AppDispatch) => {

    const filteredRows = rows.filter(el => el.rowId === rowId)

    function formatDate(isoDate: string) {
        const dateObj = new Date(isoDate)
        dateObj.setDate(dateObj.getDate() + 1)
        const day = dateObj.getUTCDate().toString().padStart(2, '0')
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0')
        const year = dateObj.getUTCFullYear()
        return `${day}.${month}.${year}`
    }

    const dateForDocument = {
        name: filteredRows[0].name,
        hasKomiss: filteredRows[0].task === WORKS.komiss,
        hasStrel: filteredRows[0].task === WORKS.strel,
        hasVolnovod: filteredRows[0].task === WORKS.volnovod,
        hasRabochka: filteredRows[0].task === WORKS.rabochka,
        task: filteredRows[0].task,
        location: filteredRows[0].location,
        date: formatDate(filteredRows[0].date),
    }

    // const docxFileUrl = "../../../public/files/raport.docx"

    try {
        loadFile(file, function (error, content) {
            if (error) {
                throw error;
            }

            const zip = new PizZip(content);

            const templateDoc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true
            });

            templateDoc.render(dateForDocument);

            const generatedDoc = templateDoc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                compression: "DEFLATE"
            });

            saveAs(generatedDoc, `raport${filteredRows[0].task}.docx`);
        });
    } catch (error) {
        const e = error as TemplateBaseType;
        dispatch(setErrorTemplate(e));
        console.log('Error: ' + error);
    }
}