export type tableRowsArrayType = {
    title: string
}

export type tasksArrayType = {
    task: string
}
export const tableRowsArray: tableRowsArrayType[] = [
    {title: "Ф.И.О"},
    {title: "Работы"},
    {title: "Станция/Перегон"},
    {title: "Действия"},
]

export const tasksArray: tasksArrayType[] = [
    {task: "Комиссионный"},
    {task: "Стрелочный"},
    {task: "Волновод"},
    {task: "Рабочая комиссия"},
]