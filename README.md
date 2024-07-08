# React Table Assignment

## Overview

This project is a feature-rich table implementation using React, Vite, TypeScript, and Yarn. It provides various functionalities including data rendering, column filtering, cell editing, data persistence, search functionality, collapsible row grouping, efficient rendering for large data sets, and more.

## Features

- **Data Rendering**: Display various data types per column in an organized table format.
- **Column Filtering**: Select and deselect columns to display using a custom dropdown.
- **Cell Editing**: Edit cell values with instant updates and save changes.
- **Data Persistence**: Save and load table data using local storage to maintain state between sessions.
- **Search Functionality**: Search across all visible columns with a dynamic search input.
- **Row Selection**: Select and deselect individual rows or all rows at once.
- **Remove Rows**: Remove selected rows from the table.
- **Collapsible Row Grouping**: Group rows by a selected column and toggle the visibility of grouped rows.
- **Pagination**: Navigate through pages of table data and select the number of results per page for efficient data handling.

## Project Setup

### Prerequisites

- Node.js (version 18 or above)
- Yarn

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/EilonV3/table-assignment.git
    cd table-project
    ```

2. **Install dependencies:**

    ```sh
    yarn install
    ```

3. **Start the development server:**

    ```sh
    yarn dev
    ```

4. **Build the project:**

    ```sh
    yarn build
    ```

5. **Preview the production build:**

    ```sh
    yarn preview
    ```

## Usage

- **Custom Dropdown for Columns:**
    - Use the dropdown to select and deselect columns to be displayed in the table.
    - Clear all or select all columns with a single click.

- **Search Functionality:**
    - Enter a search term in the search input to filter rows based on visible column values.

- **Row Selection:**
    - Select individual rows using the checkboxes in the first column.
    - Select all or clear all selections with the provided buttons.

- **Remove Rows:**
    - After selecting rows, click the "Remove Selected Rows" button to delete them from the table.

- **Grouping and Collapsing:**
    - Enable or disable row grouping with a toggle button.
    - When grouping is enabled, select the column by which to group rows from the dropdown.
    - Collapse and expand grouped rows by clicking on the group header.

- **Pagination:**
    - Select the page number from the pagination dropdown to navigate through pages.
    - Adjust the number of results per page using the provided dropdown.

## Folder Structure

- **src/api/dataApi.ts:** Contains functions for loading, saving, clearing, and removing table data.
- **src/components/custom-dropdown/CustomDropdown.tsx:** Custom dropdown component for selecting columns.
- **src/components/edit-cell/EditCell.tsx:** Component for editable table cells.
- **src/components/table/Table.tsx:** Main table component implementing the features.
- **src/fake-data/fakeData.ts:** Fake data used to initialize the table.
- **src/types:** TypeScript types used in the project.

## License

This project is licensed under the MIT License.

