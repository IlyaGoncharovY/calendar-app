import {describe, expect, it} from 'vitest'

import {WORKS} from "../../../common/utils/utilFileDownload.ts";
import reducer, {
    addRowsData,
    changeRowsData,
    getRowsData,
    initialStateTableType, removeRowsData,
    RowsTypeWithDate
} from "./tableSlice.ts";

describe("testing table slice", () => {

    const startState: initialStateTableType = {
        rows: [{
            name: "Ilya",
            task: WORKS.komiss,
            location: "ВДНХ",
            date: "123",
            rowId: "321"
        }]
    }

    it('should return the initial state', () => {

        const action = getRowsData();
        const endState = reducer(startState, action);

        expect(endState).toBe(endState)
    })

    it("a new row should be added", () => {

        const addedRows: RowsTypeWithDate = {
            name: "Ivan",
            task: WORKS.strel,
            location: "AAA",
            date: "321",
            rowId: "123"
        }

        const action = addRowsData(addedRows)
        const endState = reducer(startState, action)

        expect(true).toBe(endState.rows.some(el => el.name === "Ivan"))
        expect(true).equal(endState.rows.length === 2)
        expect(false).equal(endState.rows.length === 3)
    })

    it("should be change row", () => {

        const changedRow: RowsTypeWithDate = {
            name: "ChangeName",
            task: `change${WORKS.komiss}`,
            location: "ChangeLocation",
            date: "ChangeDate",
            rowId: "321"
        }

        const action = changeRowsData(changedRow)
        const endState = reducer(startState, action)

        const updatedRowId = endState.rows.find(el => el.rowId === changedRow.rowId)

        expect(endState.rows.length).toBe(1)
        expect(updatedRowId).toBeDefined()
        if (updatedRowId) {
            expect(updatedRowId.name).toBe('ChangeName')
            expect(updatedRowId.task).toBe(`change${WORKS.komiss}`)
            expect(updatedRowId.location).toBe('ChangeLocation')
            expect(updatedRowId.date).toBe('ChangeDate')
            expect(updatedRowId.rowId).toBe('321')
        }
    })

    it("should be delete row", () => {

        const rowId = startState.rows[0].rowId
        const action = removeRowsData(rowId)
        const endState = reducer(startState, action)

        expect(endState.rows.length).toBe(0)
    })
})