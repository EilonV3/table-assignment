import { fakeTableData } from '../fake-data/fakeData.ts';
import { TableData, RowData } from '../types';
const DATA_STORAGE_KEY = 'tableStorageKey';

export const loadData = () => {
    const data = localStorage.getItem(DATA_STORAGE_KEY);
    return data ? JSON.parse(data): initData();
};

export const initData = () => {
    const data: TableData = fakeTableData;
    saveData(data);
    return data;
};

export const saveData = (data: TableData) => {
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(data));
};

export const clearData = () => {
    localStorage.removeItem(DATA_STORAGE_KEY);
}

export const getTableData = (): TableData => loadData()