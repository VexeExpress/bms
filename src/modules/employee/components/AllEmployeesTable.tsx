import React from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper } from "@mui/material";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID',  sortable: false,  },
  { field: 'firstName', headerName: 'Tên', flex: 1, },
  { field: 'lastName', headerName: 'Tài khoản', flex: 1, },
  {
    field: 'age',
    headerName: 'Thông tin liên hệ',
    type: 'number',
    flex: 1,
  },
  {
    field: 'fullName',
    headerName: 'Trạng thái',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    flex: 1,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const paginationModel = { page: 0, pageSize: 6 };

export const AllEmployeesTable = () => {
  return (
    <Paper sx={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
