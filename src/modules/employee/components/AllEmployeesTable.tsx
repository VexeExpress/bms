import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Paper } from "@mui/material";
import { Employee } from "../types/Employee";

interface AllEmployeesTableProps {
  employees: Employee[];
}
const columns: GridColDef[] = [
  { field: "fullName", headerName: "Họ tên", flex: 1 },
  { field: "username", headerName: "Tài khoản", flex: 1 },
  { field: "phone", headerName: "Số điện thoại", flex: 1 },
  {
    field: "status",
    headerName: "Trạng thái",
    flex: 1,
    valueGetter: (value, row) =>
      row.status === true ? "Hoạt động" : "Không hoạt động",
  },
  {
    field: "role",
    headerName: "Vai trò",
    flex: 1,
    valueGetter: (value, row) =>
      row.role === 1
        ? "Nhân viên"
        : row.role === 2
          ? "Tài xế"
          : row.role === 3
            ? "Phụ xe"
            : row.role === 4
              ? "Admin"
              : "Chưa xác định",
  },
];

const paginationModel = { page: 0, pageSize: 10 };

export const AllEmployeesTable: React.FC<AllEmployeesTableProps> = ({
  employees,
}) => {
  return (
    <Paper sx={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={employees}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        className="font-rounded"
      />
    </Paper>
  );
};
