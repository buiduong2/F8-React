type ID = string

export type Row = {
    id: ID,
    name: string
}

export type Column = {
    id: ID,
    name: string,
    rows: Row[]
}