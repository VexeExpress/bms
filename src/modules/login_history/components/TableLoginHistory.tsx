import { useState } from "react";
import { LoginHistory } from "../types/LoginHistory";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
interface Column {
    id: 'ipAddress' | 'browserName' | 'operatingSystem' | 'timeLogin' | 'dateLogin' | 'username' | 'fullName';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string | number) => string;
}
const columns: readonly Column[] = [
    { id: 'ipAddress', label: 'IP', minWidth: 170 },
    { id: 'browserName', label: 'Trình duyệt', minWidth: 150 },
    { id: 'operatingSystem', label: 'Thiết bị', minWidth: 150 },
    { id: 'timeLogin', label: 'Thời gian', minWidth: 150 },
    { id: 'dateLogin', label: 'Ngày', minWidth: 170 },
    { id: 'username', label: 'Tài khoản', minWidth: 170 },
    { id: 'fullName', label: 'Họ tên', minWidth: 170 },
];
interface LoginHistoryTableProps {
    data: LoginHistory[];
}
const LoginHistoryTable: React.FC<LoginHistoryTableProps> = ({ data }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(9);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const sortedData = [...data].sort((a, b) => {
        const aDate = new Date(`${a.dateLogin} ${a.timeLogin}`);
        const bDate = new Date(`${b.dateLogin} ${b.timeLogin}`);
        return bDate.getTime() - aDate.getTime(); // Sắp xếp theo thứ tự giảm dần (mới nhất lên trên)
    });

    // Phân trang dữ liệu sau khi sắp xếp
    const paginatedData = sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }} >
            <TableContainer sx={{ maxHeight: 700 }} >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                    className="font-rounded"
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, index) => (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    return (
                                        <TableCell key={column.id} align={column.align} className="font-rounded">
                                            {value}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default LoginHistoryTable;