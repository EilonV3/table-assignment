import React, { useState, useEffect, useReducer } from "react";
import {getTableData, removeRows, saveData} from "../../api/dataApi.ts";
import { TableData } from "../../types";
import styles from './Table.module.css';
import EditCell from "../edit-cell/EditCell.tsx";
import CustomDropdown from "../custom-dropdown/CustomDropdown.tsx";

const selectedRowsReducer = (state: Set<string>, action: { type: any; rowId: string; rowIds: any[]; }): Set<string> => {
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
            return new Set();
        default:
            throw new Error('Unhandled action type');
    }
    return newState;
};

export const Table: React.FC = () => {
    const [tableData, setTableData] = useState<TableData | null>(null);
    const [selectedRows, dispatch] = useReducer(selectedRowsReducer, new Set<string>());
    const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
    const [groupedData, setGroupedData] = useState<{ [key: string]: TableData }>({});
    const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());
    const [groupColumn, setGroupColumn] = useState<string>('active');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isGrouping, setIsGrouping] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    useEffect(() => {
        const data = getTableData();
        setTableData(data);
        setGroupedData(groupByColumn(data, groupColumn));
    }, [groupColumn]);

    useEffect(() => {
        if (tableData) {
            const filteredData = {
                columns: tableData.columns,
                data: tableData.data.filter(row => {
                    return visibleColumns.some(colId => {
                        const cellValue = row[colId]?.toString().toLowerCase();
                        return cellValue && cellValue.includes(searchTerm.toLowerCase());
                    });
                })
            };
            setGroupedData(groupByColumn(filteredData, groupColumn));
        }
    }, [tableData, groupColumn, visibleColumns, searchTerm]);

    const handleSelectRow = (rowId: string) => {
        dispatch({
            type: 'SELECT_ROW', rowId,
            rowIds: []
        });
    };

    const handleDeselectRow = (rowId: string) => {
        dispatch({
            type: 'DESELECT_ROW', rowId,
            rowIds: []
        });
    };

    const handleSelectAll = () => {
        if (tableData) {
            const allRowIds = tableData.data.map(row => row.id);
            dispatch({
                type: 'SELECT_ALL', rowIds: allRowIds,
                rowId: ""
            });
        }
    };

    const handleClearSelection = () => {
        dispatch({
            type: 'CLEAR_SELECTION',
            rowId: "",
            rowIds: []
        });
    };

    const handleCellEdit = (rowId: string, colId: string, newValue: string | number | boolean) => {
        const rowIndex = tableData?.data.findIndex(row => row.id === rowId);

        if (rowIndex !== -1 && tableData) {
            const updatedTableData = {
                ...tableData,
                data: [
                    ...tableData.data.slice(0, rowIndex),
                    {
                        // @ts-ignore
                        ...tableData.data[rowIndex],
                        [colId]: newValue
                    },
                    // @ts-ignore
                    ...tableData.data.slice(rowIndex + 1)
                ]
            };
            setTableData(updatedTableData);
            saveData(updatedTableData);
            setGroupedData(groupByColumn(updatedTableData, groupColumn));
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

    const handleGroupColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGroupColumn(e.target.value);
    };

    const toggleGroupCollapse = (groupKey: string) => {
        setCollapsedGroups(prev => {
            const newSet = new Set(prev);
            if (newSet.has(groupKey)) {
                newSet.delete(groupKey);
            } else {
                newSet.add(groupKey);
            }
            return newSet;
        });
    };

    const groupByColumn = (data: TableData, columnId: string) => {
        return data.data.reduce((acc, row) => {
            const key = row[columnId];
            if (!acc[key]) {
                acc[key] = { columns: data.columns, data: [] };
            }
            acc[key].data.push(row);
            return acc;
        }, {} as { [key: string]: TableData });
    };

    const filteredData = tableData ? {
        columns: tableData.columns,
        data: tableData.data.filter(row => {
            return visibleColumns.some(colId => {
                const cellValue = row[colId]?.toString().toLowerCase();
                return cellValue && cellValue.includes(searchTerm.toLowerCase());
            });
        })
    } : null;

    const totalPages = filteredData ? Math.ceil(filteredData.data.length / rowsPerPage) : 1;

    const paginatedData = filteredData ? {
        columns: filteredData.columns,
        data: filteredData.data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    } : null;

    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(Number(e.target.value));
    };

    if (!tableData) return <h1> Loading Data! </h1>;

    const handleRemoveSelectedRows = () => {
        if (selectedRows.size > 0) {
            const updatedTableData = removeRows(Array.from(selectedRows));
            setTableData(updatedTableData);
            setGroupedData(groupByColumn(updatedTableData, groupColumn));
            handleClearSelection();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.buttoncontainer}>
                {selectedRows.size > 0 && <button onClick={handleRemoveSelectedRows}>{selectedRows.size > 1 ? 'Remove Selected Rows': 'Remove Selected Row'}</button>}
                <CustomDropdown
                    columns={tableData.columns}
                    onSelectColumn={handleColumnSelect}
                    onDeselectColumn={handleColumnDeselect}
                    onClearAll={handleClearAllColumns}
                    onSelectAll={handleSelectAllColumns}
                />
                {tableData?.data.length === selectedRows.size ?
                    <button onClick={handleClearSelection}>Clear All</button> :
                    <button onClick={handleSelectAll}>Select All</button>}

                <button onClick={() => setIsGrouping(!isGrouping)}>
                    {isGrouping ? 'Disable Grouping' : 'Enable Grouping'}
                </button>
                {isGrouping &&
                    <select value={groupColumn} onChange={handleGroupColumnChange} className={styles.selectDropdown}>
                        {tableData.columns.map(col => (
                            <option key={col.id} value={col.id}>{col.title}</option>
                        ))}
                    </select>}
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={styles.searchInput}
                />
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
                                checked={tableData?.data.length === selectedRows.size}
                                onChange={tableData?.data.length === selectedRows.size ? handleClearSelection : handleSelectAll}
                            />
                        </th>
                        {tableData.columns.map((col) => (
                            visibleColumns.includes(col.id) &&
                            <th key={col.id}>{col.title}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {isGrouping ? Object.keys(groupedData).map(groupKey => (
                        <React.Fragment key={groupKey}>
                            <tr className={styles.groupHeader} onClick={() => toggleGroupCollapse(groupKey)}>
                                <td colSpan={tableData.columns.length + 1}>
                                    {groupKey} ({groupedData[groupKey].data.length})
                                </td>
                            </tr>
                            {collapsedGroups.has(groupKey) && groupedData[groupKey].data.map((row) => (
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
                        </React.Fragment>
                    )) : paginatedData?.data.map((row) => (
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
            <div className={styles.buttoncontainer}>
                <label>Rows per page:</label>
                <select value={rowsPerPage} onChange={handleRowsPerPageChange}
                        className={styles.selectPagination}>
                    {[10, 25, 50].map(num => (
                        <option key={num} value={num}>{num}</option>
                    ))}
                </select>
                <label>Page:</label>
                <select value={currentPage} onChange={handlePageChange} className={styles.selectPagination}>
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(page => (
                        <option key={page} value={page}>{page}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Table;
