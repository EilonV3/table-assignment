export interface Column {
    id: string;
    ordinalNo: number;
    title: string;
    type: string;
    width?: number;
    options?: string[];
}

export interface RowData {
    id: string;
    [columnId: string]: any;
}

export interface TableData {
    columns: Column[];
    data: RowData[]
}