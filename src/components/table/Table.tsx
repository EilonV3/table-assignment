import React, { useState, useEffect, useReducer } from "react";
import { getTableData, saveData } from "../../api/dataApi";
import { TableData, TableColumn } from "../../types";
import styles from './Table.module.css';
import EditCell from "../edit-cell/EditCell";
import CustomDropdown from "../custom-dropdown/CustomDropdown";

type Action =
    | { type: 'SELECT_ROW', rowId: string }
    | { type: 'DESELECT_ROW', rowId: string }
    | { type: 'SELECT_ALL', rowIds: string[] }
    | { type: 'CLEAR_SELECTION' };

const selectedRowsReducer = (state: Set<string>, action: Action): Set<string> => {
    const newState = new Set(state);
    switch (action.type) {
        case 'SELECT_ROW':
            newState.add(action.rowId);
            break;
        case 'DESELECT_ROW':
            newState.delete(action.rowId);
            break;
        case 'SELECT_ALL':
            action.rowIds.forEach(id => newState.add(id));
            break;
        case 'CLEAR_SELECTION':
            newState.clear();
            break;
        default:
            throw new Error('Unhandled action type');
    }
    return newState;
};

const Table: React.FC = () => {
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [selectedRows, dispatch] = useReducer(selectedRowsReducer, new Set<string>());
    const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTableData();
            setTableData(data);
        };
        fetchData();
    }, []);

    const handleSelectRow = (rowId: string) => {
        dispatch({ type: 'SELECT_ROW', rowId });
    };

    const handleDeselectRow = (rowId: string) => {
        dispatch({ type: 'DESELECT_ROW', rowId });
    };

    const handleSelectAll = () => {
        if (tableData) {
            const allRowIds = tableData.data.map(row => row.id);
            dispatch({ type: 'SELECT_ALL', rowIds: allRowIds });
        }
    };

    const handleClearSelection = () => {
        dispatch({ type: 'CLEAR_SELECTION' });
    };

    const handleCellEdit = (rowId: string, colId: string, newValue: string | number | boolean) => {
        if (!tableData) return;

        const rowIndex = tableData.data.findIndex(row => row.id === rowId);

        if (rowIndex !== -1) {
            const updatedTableData = {
                ...tableData,
                data: [
                    ...tableData.data.slice(0, rowIndex),
                    {
                        ...tableData.data[rowIndex],
                        [colId]: newValue
                    },
                    ...tableData.data.slice(rowIndex + 1)
                ]
            };
            setTableData(updatedTableData);
            saveData(updatedTableData);
        }
    };

    const handleColumnSelect = (columnId: string) => {
        setVisibleColumns(prev => [...prev, columnId]);
    };

    const handleColumnDeselect = (columnId: string) => {
        setVisibleColumns(prev => prev.filter(col => col !== columnId));
    };

    const handleSelectAllColumns = () => {
        const allColumnIds = tableData?.columns.map(col => col.id) || [];
        setVisibleColumns(allColumnIds);
    };

    const handleClearAllColumns = () => {
        setVisibleColumns([]);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = tableData?.data.filter(row =>
        Object.values(row).some(value =>
            typeof value === 'string' ? value.toLowerCase().includes(searchTerm.toLowerCase()): typeof value === "number" &&
                value == Number(searchTerm)
        )
    );

    if (!tableData) return <h1>Loading Data...</h1>;

    return (
        <div className={styles.container}>
            <div className={styles.buttoncontainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <CustomDropdown
                    columns={tableData.columns}
                    onSelectColumn={handleColumnSelect}
                    onDeselectColumn={handleColumnDeselect}
                    onClearAll={handleClearAllColumns}
                    onSelectAll={handleSelectAllColumns}
                />
                {tableData.data.length === selectedRows.size ?
                    <button onClick={handleClearSelection}>Clear All</button> :
                    <button onClick={handleSelectAll}>Select All</button>}
            </div>
            {!visibleColumns.length ? <div className={styles.noColumnsMessage}>
                <p>No columns selected to display.</p>
                <p>Please select columns using the dropdown above.</p>
            </div> : <div className={styles.tablewrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={tableData.data.length === selectedRows.size}
                                onChange={tableData.data.length === selectedRows.size ? handleClearSelection : handleSelectAll}
                            />
                        </th>
                        {tableData.columns.map((col) => (
                            visibleColumns.includes(col.id) &&
                            <th key={col.id}>{col.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData?.map((row) => (
                        <tr key={row.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.has(row.id)}
                                    onChange={() =>
                                        selectedRows.has(row.id)
                                            ? handleDeselectRow(row.id)
                                            : handleSelectRow(row.id)
                                    }
                                />
                            </td>
                            {tableData.columns.map((col) => (
                                visibleColumns.includes(col.id) &&
                                <EditCell
                                    key={`${row.id}-${col.id}`}
                                    value={row[col.id]}
                                    onSaveEdit={(newValue) => handleCellEdit(row.id, col.id, newValue)}
                                    type={col.type as 'string' | 'number' | 'boolean' | 'select'}
                                    options={col.type === 'boolean' ? ['true', 'false'] : col.options}
                                />
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
};

export default Table;
