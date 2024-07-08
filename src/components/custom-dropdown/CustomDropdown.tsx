import React, { useState, useEffect, useRef } from "react";
import styles from './CustomDropdown.module.css';

interface CustomDropdownProps {
    columns: { id: string; title: string }[];
    onSelectColumn: (columnId: string) => void;
    onDeselectColumn: (columnId: string) => void;
    onSelectAll: () => void;
    onClearAll: () => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
                                                           columns,
                                                           onSelectColumn,
                                                           onDeselectColumn,
                                                           onSelectAll,
                                                           onClearAll
                                                       }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState<string[]>(columns.map(col => col.id)); // Initialize with all column IDs
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => {
        setIsOpen(prev => !prev);
    };

    const handleColumnToggle = (columnId: string) => {
        if (selectedColumns.includes(columnId)) {
            setSelectedColumns(prev => prev.filter(col => col !== columnId));
            onDeselectColumn(columnId);
        } else {
            setSelectedColumns(prev => [...prev, columnId]);
            onSelectColumn(columnId);
        }
    };

    const handleSelectAll = () => {
        setSelectedColumns(columns.map(col => col.id));
        onSelectAll();
    };

    const handleClearAll = () => {
        setSelectedColumns([]);
        onClearAll();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        onSelectAll();

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.dropdown} ref={dropdownRef}>
            <button className={styles.dropdownButton} onClick={toggleDropdown}>
                Columns <span className={styles.dropdownIcon}>&#9662;</span>
            </button>
            {isOpen && (
                <div className={styles.dropdownContent}>
                    {selectedColumns.length != columns.length ? <button className={styles.dropdownButton} onClick={handleSelectAll}>
                        Select All
                    </button> :
                    <button className={styles.dropdownButton} onClick={handleClearAll}>
                        Clear All
                    </button>}
                    {columns.map((col) => (
                        <label key={col.id} className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={selectedColumns.includes(col.id)}
                                onChange={() => handleColumnToggle(col.id)}
                            />
                            {col.title}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
