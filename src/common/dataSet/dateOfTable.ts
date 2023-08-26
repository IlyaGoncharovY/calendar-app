export type tableRowsArrayType = {
    id: number
    title: string
    width: number
    align: "center" | "left" | "right" | "inherit" | "justify" | undefined
}

export type tasksArrayType = {
    task: string
}
export const tableRowsArray: tableRowsArrayType[] = [
    {
        id: 1,
        title: "Ф.И.О",
        width: 100,
        align: "right"
    },
    {
        id: 2,
        title: "Работы",
        width: 120,
        align: "right"
    },
    {
        id: 3,
        title: "Станция/Перегон",
        width: 120,
        align: "right"
    },
    {
        id: 4,
        title: "Действия",
        width: 120,
        align: "center"
    },
]

export const tasksArray: tasksArrayType[] = [
    {task: "Комиссионный"},
    {task: "Стрелочный"},
    {task: "Волновод"},
    {task: "Рабочая комиссия"},
]