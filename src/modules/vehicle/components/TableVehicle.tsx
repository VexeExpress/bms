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
import { VehicleData } from "../types/VehicleData";
import { Delete, Mode } from "@mui/icons-material";

type TableVehicleProps = {
  data: VehicleData[];
  onDelete: (id: number) => void;
  onEdit: (vehicle: VehicleData) => void;
};
export default function TableVehicle({
  data,
  onDelete,
  onEdit,
}: TableVehicleProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="vehicle table">
        <TableHead>
          <TableRow>
            <TableCell className="font-rounded">STT</TableCell>
            <TableCell className="font-rounded">Biển số xe</TableCell>
            <TableCell className="font-rounded">SĐT theo xe</TableCell>
            <TableCell className="font-rounded">Loại xe</TableCell>
            <TableCell className="font-rounded">Tình trạng</TableCell>
            <TableCell className="font-rounded">Hạn đăng kiểm</TableCell>
            <TableCell className="font-rounded">Hạn bảo dưỡng</TableCell>
            <TableCell className="font-rounded">Ghi chú</TableCell>
            <TableCell className="font-rounded">Tuỳ chọn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((office, index) => (
            <TableRow
              key={office.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="font-rounded">
                {index + 1}
              </TableCell>
              <TableCell className="font-rounded">
                {office.licensePlate}
              </TableCell>
              <TableCell className="font-rounded">{office.phone}</TableCell>
              <TableCell className="font-rounded">
                {office.typeVehicle}
              </TableCell>
              <TableCell className="font-rounded">{office.status}</TableCell>
              <TableCell className="font-rounded">
                {office.registrationPeriod}
              </TableCell>
              <TableCell className="font-rounded">
                {office.maintenancePeriod}
              </TableCell>
              <TableCell className="font-rounded">{office.note}</TableCell>
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
