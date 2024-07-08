import React, { useState } from "react";
import styles from './EditCell.module.css';

interface EditCellProps {
    value: string | number | boolean;
    onSaveEdit: (newValue: string | number | boolean) => void;
    type: 'string' | 'number' | 'boolean' | 'select';
    options?: string[];
}

const EditCell: React.FC<EditCellProps> = ({ value, onSaveEdit, type, options }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedValue, setEditedValue] = useState(value);

    const handleEditStart = () => {
        setEditedValue(value);
        setEditMode(true);
    };

    const handleSave = () => {
        onSaveEdit(editedValue);
        setEditMode(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newValue = type === 'number' ? Number(event.target.value) : event.target.value;
        setEditedValue(newValue);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSave();
        }
    };

    const handleInputBlur = () => {
        handleSave();
    };

    return (
        <td className={`${styles.editableCell} ${editMode ? styles.editing : ''}`} onClick={handleEditStart}>
            <div className={styles.cellContent}>
                {editMode ? (
                    type === 'boolean' ? (
                        <select
                            value={editedValue ? 'true' : 'false'}
                            onChange={(e) => setEditedValue(e.target.value === 'true')}
                            onBlur={handleSave}
                            autoFocus
                            className={styles.editInput}
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    ) : type === 'select' ? (
                        <select value={editedValue as string} onChange={handleInputChange} onBlur={handleSave} className={styles.editInput} autoFocus>
                            {options?.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={type}
                            value={editedValue as string}
                            onChange={handleInputChange}
                            onBlur={handleInputBlur}
                            onKeyDown={handleInputKeyDown}
                            autoFocus
                            className={styles.editInput}
                        />
                    )
                ) : (
                    value.toString()
                )}
            </div>
        </td>
    );
};

export default EditCell;
