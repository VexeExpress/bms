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
import { SeatingChartData } from "../types/SeatingChartData";
import { Delete, Mode } from "@mui/icons-material";

type TableSeatingChartProps = {
  data: SeatingChartData[];
  onDelete: (id: number) => void;
  onEdit: (seatingChart: SeatingChartData) => void;
};
export default function TableSeatingChart({
  data,
  onDelete,
  onEdit,
}: TableSeatingChartProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="seating chart table">
        <TableHead>
          <TableRow>
            <TableCell className="font-rounded">STT</TableCell>
            <TableCell className="font-rounded">Tên sơ đồ</TableCell>
            <TableCell className="font-rounded">Loại xe</TableCell>
            <TableCell className="font-rounded">Tuỳ chọn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((seatchart, index) => (
            <TableRow
              key={seatchart.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="font-rounded">
                {index + 1}
              </TableCell>
              <TableCell className="font-rounded">
                {seatchart.seatingChartName}
              </TableCell>
              <TableCell className="font-rounded">
                {seatchart.totalFloors} tầng
              </TableCell>
              <TableCell className="py-2">
                <IconButton
                  color="info"
                  aria-label="Edit"
                  title="Chỉnh sửa thông tin"
                  onClick={() => onEdit(seatchart)}
                >
                  <Mode />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="Delete"
                  title="Xóa"
                  onClick={() =>
                    seatchart.id !== undefined && onDelete(seatchart.id)
                  }
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
