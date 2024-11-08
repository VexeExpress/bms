import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { OfficeData } from "../types/OfficeData";
import { Delete, Mode } from "@mui/icons-material";

type TableOfficeProps = {
  data: OfficeData[];
  onDelete: (id: number) => void;
  onEdit: (office: OfficeData) => void;
};
export default function TableOffice({
  data,
  onDelete,
  onEdit,
}: TableOfficeProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="office table">
        <TableHead>
          <TableRow>
            <TableCell className="font-rounded">Tên văn phòng</TableCell>
            <TableCell className="font-rounded">Ngày tạo</TableCell>
            <TableCell className="font-rounded">Tuỳ chọn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((office) => (
            <TableRow
              key={office.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="font-rounded">
                {office.officeName}
              </TableCell>
              <TableCell className="font-rounded">{office.createdAt}</TableCell>
              <TableCell className="py-2">
                <IconButton
                  color="info"
                  aria-label="Edit"
                  title="Chỉnh sửa thông tin"
                  onClick={() => onEdit(office)}
                >
                  <Mode />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="Delete"
                  title="Xóa"
                  onClick={() => onDelete(office.id)}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
