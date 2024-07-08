// import { TableData } from '../types';
//
// export const fakeTableData: TableData = {
//     columns: [
//         { id: 'projectName', ordinalNo: 1, title: 'Project Name', type: 'string' },
//         { id: 'issue', ordinalNo: 2, title: 'Issue', type: 'string' },
//         { id: 'description', ordinalNo: 3, title: 'Description', type: 'string' },
//         { id: 'dateReported', ordinalNo: 4, title: 'Date Reported', type: 'string' },
//         { id: 'severity', ordinalNo: 5, title: 'Severity', type: 'string' },
//         { id: 'status', ordinalNo: 6, title: 'Status', type: 'string' },
//         { id: 'responsibleParty', ordinalNo: 7, title: 'Responsible Party', type: 'string' }
//     ],
//     data: [
//         { id: '1', projectName: 'Skyscraper A', issue: 'Delay', description: 'Unexpected weather conditions caused delays', dateReported: '2023-01-15', severity: 'High', status: 'Open', responsibleParty: 'Alice Johnson' },
//         { id: '2', projectName: 'Bridge B', issue: 'Budget Overrun', description: 'Material costs exceeded budget estimates', dateReported: '2021-11-10', severity: 'Medium', status: 'Closed', responsibleParty: 'Bob Smith' },
//         { id: '3', projectName: 'Mall C', issue: 'Safety Concern', description: 'Worker safety protocols not followed', dateReported: '2023-06-05', severity: 'High', status: 'Open', responsibleParty: 'Carol White' },
//         { id: '4', projectName: 'Highway D', issue: 'Environmental Impact', description: 'Construction impacting local wildlife', dateReported: '2022-08-12', severity: 'Medium', status: 'Open', responsibleParty: 'David Brown' },
//         { id: '5', projectName: 'Hospital E', issue: 'Quality Issue', description: 'Defective materials used in construction', dateReported: '2021-05-22', severity: 'Low', status: 'Closed', responsibleParty: 'Evelyn Green' },
//         { id: '6', projectName: 'School F', issue: 'Regulatory Compliance', description: 'Building codes not met', dateReported: '2023-04-30', severity: 'High', status: 'Open', responsibleParty: 'Frank Wright' },
//         { id: '7', projectName: 'Airport G', issue: 'Delay', description: 'Delays due to labor strikes', dateReported: '2020-09-15', severity: 'High', status: 'Closed', responsibleParty: 'Grace Lee' },
//         { id: '8', projectName: 'Library H', issue: 'Funding Issue', description: 'Insufficient funds to continue construction', dateReported: '2022-07-20', severity: 'Medium', status: 'Open', responsibleParty: 'Hannah King' },
//         { id: '9', projectName: 'Stadium I', issue: 'Safety Concern', description: 'Structural integrity issues found', dateReported: '2023-02-28', severity: 'High', status: 'Open', responsibleParty: 'Ivan Turner' },
//         { id: '10', projectName: 'Park J', issue: 'Community Opposition', description: 'Local community opposition to project', dateReported: '2021-10-05', severity: 'Low', status: 'Closed', responsibleParty: 'Julia Clark' }
//     ]
// };

// import { TableData } from '../types';
//
// export const fakeTableData: TableData = {
//     columns: [
//         { id: 'projectName', ordinalNo: 1, title: 'Project Name', type: 'string' },
//         { id: 'issue', ordinalNo: 2, title: 'Issue', type: 'string' },
//         { id: 'description', ordinalNo: 3, title: 'Description', type: 'string' },
//         { id: 'dateReported', ordinalNo: 4, title: 'Date Reported', type: 'string' },
//         { id: 'severity', ordinalNo: 5, title: 'Severity', type: 'string' },
//         { id: 'status', ordinalNo: 6, title: 'Status', type: 'string' },
//         { id: 'responsibleParty', ordinalNo: 7, title: 'Responsible Party', type: 'string' },
//         { id: 'isCritical', ordinalNo: 8, title: 'Critical Issue', type: 'boolean' }, // boolean column
//         { id: 'priority', ordinalNo: 9, title: 'Priority', type: 'select', options: ['Low', 'Medium', 'High'] } // select column
//     ],
//     data: [
//         { id: '1', projectName: 'Skyscraper A', issue: 'Delay', description: 'Unexpected weather conditions caused delays', dateReported: '2023-01-15', severity: 'High', status: 'Open', responsibleParty: 'Alice Johnson', isCritical: true, priority: 'High' },
//         { id: '2', projectName: 'Bridge B', issue: 'Budget Overrun', description: 'Material costs exceeded budget estimates', dateReported: '2021-11-10', severity: 'Medium', status: 'Closed', responsibleParty: 'Bob Smith', isCritical: false, priority: 'Medium' },
//         { id: '3', projectName: 'Mall C', issue: 'Safety Concern', description: 'Worker safety protocols not followed', dateReported: '2023-06-05', severity: 'High', status: 'Open', responsibleParty: 'Carol White', isCritical: true, priority: 'High' },
//         { id: '4', projectName: 'Highway D', issue: 'Environmental Impact', description: 'Construction impacting local wildlife', dateReported: '2022-08-12', severity: 'Medium', status: 'Open', responsibleParty: 'David Brown', isCritical: false, priority: 'Medium' },
//         { id: '5', projectName: 'Hospital E', issue: 'Quality Issue', description: 'Defective materials used in construction', dateReported: '2021-05-22', severity: 'Low', status: 'Closed', responsibleParty: 'Evelyn Green', isCritical: false, priority: 'Low' },
//         { id: '6', projectName: 'School F', issue: 'Regulatory Compliance', description: 'Building codes not met', dateReported: '2023-04-30', severity: 'High', status: 'Open', responsibleParty: 'Frank Wright', isCritical: true, priority: 'High' },
//         { id: '7', projectName: 'Airport G', issue: 'Delay', description: 'Delays due to labor strikes', dateReported: '2020-09-15', severity: 'High', status: 'Closed', responsibleParty: 'Grace Lee', isCritical: true, priority: 'High' },
//         { id: '8', projectName: 'Library H', issue: 'Funding Issue', description: 'Insufficient funds to continue construction', dateReported: '2022-07-20', severity: 'Medium', status: 'Open', responsibleParty: 'Hannah King', isCritical: false, priority: 'Medium' },
//         { id: '9', projectName: 'Stadium I', issue: 'Safety Concern', description: 'Structural integrity issues found', dateReported: '2023-02-28', severity: 'High', status: 'Open', responsibleParty: 'Ivan Turner', isCritical: true, priority: 'High' },
//         { id: '10', projectName: 'Park J', issue: 'Community Opposition', description: 'Local community opposition to project', dateReported: '2021-10-05', severity: 'Low', status: 'Closed', responsibleParty: 'Julia Clark', isCritical: false, priority: 'Low' }
//     ]
// };
//
// src/fakeData.ts

import { TableData } from '../types';

export const fakeTableData: TableData = {
    columns: [
        { id: 'id', ordinalNo: 1, title: 'ID', type: 'number' },
        { id: 'name', ordinalNo: 2, title: 'Name', type: 'string' },
        { id: 'age', ordinalNo: 3, title: 'Age', type: 'number' },
        { id: 'email', ordinalNo: 4, title: 'Email', type: 'string' },
        { id: 'city', ordinalNo: 5, title: 'City', type: 'string' },
        { id: 'country', ordinalNo: 6, title: 'Country', type: 'string' },
        { id: 'isActive', ordinalNo: 7, title: 'Active', type: 'boolean' },
        { id: 'role', ordinalNo: 8, title: 'Role', type: 'select', options: ['Admin', 'User', 'Manager'] },
        { id: 'startDate', ordinalNo: 9, title: 'Start Date', type: 'string' },
        { id: 'endDate', ordinalNo: 10, title: 'End Date', type: 'string' },
        { id: 'salary', ordinalNo: 11, title: 'Salary', type: 'number' },
        { id: 'department', ordinalNo: 12, title: 'Department', type: 'string' },
        { id: 'manager', ordinalNo: 13, title: 'Manager', type: 'string' },
        { id: 'skills', ordinalNo: 14, title: 'Skills', type: 'string' },
        { id: 'experience', ordinalNo: 15, title: 'Experience', type: 'string' }
    ],
    data: generateFakeData(100)
};

function generateFakeData(count: number): any[] {
    const data: any[] = [];
    for (let i = 1; i <= count; i++) {
        data.push({
            id: i,
            name: `Person ${i}`,
            age: Math.floor(Math.random() * 50) + 20,
            email: `person${i}@example.com`,
            city: ['New York', 'London', 'Paris', 'Tokyo'][Math.floor(Math.random() * 4)],
            country: ['USA', 'UK', 'France', 'Japan'][Math.floor(Math.random() * 4)],
            isActive: Math.random() > 0.5,
            role: ['Admin', 'User', 'Manager'][Math.floor(Math.random() * 3)],
            startDate: randomDate(new Date(2010, 0, 1), new Date()),
            endDate: randomDate(new Date(2022, 0, 1), new Date()),
            salary: Math.floor(Math.random() * 90000) + 30000,
            department: ['IT', 'HR', 'Finance', 'Operations'][Math.floor(Math.random() * 4)],
            manager: `Manager ${Math.floor(Math.random() * 5) + 1}`,
            skills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'][Math.floor(Math.random() * 5)],
            experience: `${Math.floor(Math.random() * 15) + 1} years`
        });
    }
    return data;
}

function randomDate(start: Date, end: Date): string {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

export default fakeTableData;
