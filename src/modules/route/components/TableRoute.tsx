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
import { RouteData } from "../types/RouteData";
import { Delete, Mode } from "@mui/icons-material";

type TableRouteProps = {
  data: RouteData[];
  onDelete: (id: number) => void;
  onEdit: (route: RouteData) => void;
};
export default function TableRoute({
  data,
  onDelete,
  onEdit,
}: TableRouteProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="route table">
        <TableHead>
          <TableRow>
            <TableCell className="font-rounded">STT</TableCell>
            <TableCell className="font-rounded">Tên tuyến</TableCell>
            <TableCell className="font-rounded">Tên rút gọn</TableCell>
            <TableCell className="font-rounded">Giá cơ bản</TableCell>
            <TableCell className="font-rounded">Trạng thái</TableCell>
            <TableCell className="font-rounded">Ghi chú</TableCell>
            <TableCell className="font-rounded">Tuỳ chọn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((route, index) => (
            <TableRow
              key={route.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="font-rounded">
                {index + 1}
              </TableCell>
              <TableCell className="font-rounded">{route.routeName}</TableCell>
              <TableCell className="font-rounded">
                {route.routeNameShort}
              </TableCell>
              <TableCell className="font-rounded">
                {route.displayPrice}
              </TableCell>
              <TableCell className="font-rounded">{route.status}</TableCell>
              <TableCell className="font-rounded">{route.note}</TableCell>
              <TableCell className="py-2">
                <IconButton
                  color="info"
                  aria-label="Edit"
                  title="Chỉnh sửa thông tin"
                  onClick={() => onEdit(route)}
                >
                  <Mode />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="Delete"
                  title="Xóa"
                  onClick={() => onDelete(route.id)}
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
