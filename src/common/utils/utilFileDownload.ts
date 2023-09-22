import PizZip from 'pizzip';
import {saveAs} from "file-saver";
import Docxtemplater from "docxtemplater";
import PizZipUtils from 'pizzip/utils/index.js';

import {AppDispatch} from "../../store/config/store.ts";
import {setErrorTemplate, TemplateBaseType} from "../../store/slices/appSlice.ts";
import {CommentsType, RowsTypeWithDate} from "../../store/slices/tableReducer/tableSlice.ts";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import file from "../../assets/files/raport.docx"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fileComments from "../../assets/files/raport2.docx"

export const WORKS = {
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

    let selectedFile = file
    let dateForDocument: {
        name: string
        hasKomiss: boolean
        hasStrel: boolean
        hasVolnovod: boolean
        hasRabochka: boolean
        task: string
        location: string
        date: string
    } & (
        {
            comments: CommentsType[]
        } | object
        )

    function formatDate(isoDate: string) {
        const dateObj = new Date(isoDate)
        dateObj.setDate(dateObj.getDate() + 1)
        const day = dateObj.getUTCDate().toString().padStart(2, '0')
        const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0')
        const year = dateObj.getUTCFullYear()
        return `${day}.${month}.${year}`
    }

    if (filteredRows[0] && Array.isArray(filteredRows[0].comments)) {
        selectedFile = fileComments
        dateForDocument = {
            name: filteredRows[0].name,
            hasKomiss: filteredRows[0].task === WORKS.komiss,
            hasStrel: filteredRows[0].task === WORKS.strel,
            hasVolnovod: filteredRows[0].task === WORKS.volnovod,
            hasRabochka: filteredRows[0].task === WORKS.rabochka,
            task: filteredRows[0].task,
            location: filteredRows[0].location,
            comments: filteredRows[0].comments.map(value => value),
            date: formatDate(filteredRows[0].date),
        }
    } else {
        dateForDocument = {
            name: filteredRows[0].name,
            hasKomiss: filteredRows[0].task === WORKS.komiss,
            hasStrel: filteredRows[0].task === WORKS.strel,
            hasVolnovod: filteredRows[0].task === WORKS.volnovod,
            hasRabochka: filteredRows[0].task === WORKS.rabochka,
            task: filteredRows[0].task,
            location: filteredRows[0].location,
            date: formatDate(filteredRows[0].date),
        }
    }

    try {
        loadFile(selectedFile, function (error, content) {
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
