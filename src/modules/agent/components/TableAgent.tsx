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
import { AgentData } from "../types/AgentData";
import { Delete, Mode } from "@mui/icons-material";

type TableAgentProps = {
  data: AgentData[];
  onDelete: (id: number) => void;
  onEdit: (agent: AgentData) => void;
};
export default function TableAgent({
  data,
  onDelete,
  onEdit,
}: TableAgentProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="route table">
        <TableHead>
          <TableRow>
            <TableCell className="font-rounded">STT</TableCell>
            <TableCell className="font-rounded">Tên đại lý</TableCell>
            <TableCell className="font-rounded">SĐT liên hệ</TableCell>
            <TableCell className="font-rounded">Địa chỉ</TableCell>
            <TableCell className="font-rounded">Chiết khấu vé</TableCell>
            <TableCell className="font-rounded">Chiết khấu hàng</TableCell>
            <TableCell className="font-rounded">Ghi chú</TableCell>
            <TableCell className="font-rounded">Tuỳ chọn</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((agent, index) => (
            <TableRow
              key={agent.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" className="font-rounded">
                {index + 1}
              </TableCell>
              <TableCell className="font-rounded">{agent.name}</TableCell>
              <TableCell className="font-rounded">{agent.phone}</TableCell>
              <TableCell className="font-rounded">{agent.address}</TableCell>
              <TableCell className="font-rounded">
                {agent.discountTicketType === 1
                  ? `${agent.discountTicket} %`
                  : `${Number(agent.discountTicket).toLocaleString("vi-VN")} đ`}
              </TableCell>
              <TableCell className="font-rounded">
                {agent.discountGoodsType === 1
                  ? `${agent.discountGoods} %`
                  : `${Number(agent.discountGoods).toLocaleString("vi-VN")} đ`}
              </TableCell>
              <TableCell className="font-rounded">{agent.note}</TableCell>
              <TableCell className="py-2">
                <IconButton
                  color="info"
                  aria-label="Edit"
                  title="Chỉnh sửa thông tin"
                  onClick={() => onEdit(agent)}
                >
                  <Mode />
                </IconButton>
                <IconButton
                  color="error"
                  aria-label="Delete"
                  title="Xóa"
                  onClick={() => onDelete(agent.id)}
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
