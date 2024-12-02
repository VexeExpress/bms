import { useEffect, useState } from "react";
import { TicketData } from "../../types/TicketData";
import {
  Button,
  Chip,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import {
  AutoMode,
  Delete,
  FileCopy,
  LocalPrintshop,
  OpenWith,
  SaveAs,
  History,
} from "@mui/icons-material";
import bk from "../../style/BookingTicket.module.css";
const BookingTicket = ({
  tickets,
  onDelete,
  onUpdate,
}: {
  tickets: TicketData[];
  onDelete: (ticketId: number) => void;
  onUpdate: (updatedTicketData: TicketData[]) => void;
}) => {
  const sharedInfo = tickets[0] || {};
  const [phone, setPhone] = useState(sharedInfo.ticketPhone || "");
  const [name, setName] = useState(sharedInfo.customerName || "");
  const [pickup, setPickup] = useState(sharedInfo.ticketPointUp || "");
  const [dropoff, setDropoff] = useState(sharedInfo.ticketPointDown || "");
  const [note, setNote] = useState(sharedInfo.ticketNote || "");
  const [paymentType, setPaymentType] = useState(sharedInfo.paymentType || 2);
  const [price, setPrice] = useState(sharedInfo.ticketPrice || 0);
  useEffect(() => {
    if (tickets.length > 0) {
      const newInfo = tickets[0];
      setPhone(newInfo.ticketPhone || "");
      setName(newInfo.customerName || "");
      setPickup(newInfo.ticketPointUp || "");
      setDropoff(newInfo.ticketPointDown || "");
      setNote(newInfo.ticketNote || "");
      setPaymentType(newInfo.paymentType || 2);
      setPrice(newInfo.ticketPrice || 0);
    } else {
      setPhone("");
      setName("");
      setPickup("");
      setDropoff("");
      setNote("");
      setPaymentType(2);
      setPrice(0);
    }
  }, [tickets]);
  const selectedTickets = tickets;

  const handleUpdate = () => {
    const updatedTicketDataList = selectedTickets.map((ticket) => ({
      ...ticket,
      ticketPhone: phone,
      customerName: name,
      ticketPointUp: pickup,
      ticketPointDown: dropoff,
      ticketNote: note,
      paymentType,
      ticketPrice: price,
    }));
    console.log(
      "Data components:",
      JSON.stringify(updatedTicketDataList, null, 2),
    );

    onUpdate(updatedTicketDataList);
  };

  return (
    <div className={bk.container}>
      <div className="mt-[64px]">
        <div className="w-full bg-slate-300 px-1 pb-1">
          {tickets.map((ticket) => (
            <Chip
              key={ticket.id}
              label={`${ticket.ticketName} - ${ticket.id}`}
              onDelete={() => onDelete(ticket.id)}
              className="mr-1 mt-1"
            />
          ))}
        </div>
        <div className="h-[550px] overflow-y-auto bg-[#f3f3f3] px-2 py-2">
          <h2 className="font-rounded text-[15px] font-semibold text-black">
            THÔNG TIN HÀNH KHÁCH
          </h2>
          <hr />
          <div className="py-1">
            <label
              htmlFor="outlined-basic"
              className="font-rounded text-[14px] font-semibold text-[#3f3f3f]"
            >
              Số điện thoại
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              className={bk.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="py-1">
            <label
              htmlFor="outlined-basic"
              className="font-rounded text-[14px] font-semibold text-[#3f3f3f]"
            >
              Họ tên
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              className={bk.input}
              maxRows={2}
              multiline
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="py-1">
            <label
              htmlFor="outlined-basic"
              className="font-rounded text-[14px] font-semibold text-[#3f3f3f]"
            >
              Địa chỉ đón
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              className={bk.input}
              maxRows={4}
              multiline
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
          </div>
          <div className="py-1">
            <label
              htmlFor="outlined-basic"
              className="font-rounded text-[14px] font-semibold text-[#3f3f3f]"
            >
              Địa chỉ trả
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              className={bk.input}
              maxRows={4}
              multiline
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
            />
          </div>
          <div className="py-1">
            <label
              htmlFor="outlined-basic"
              className="font-rounded text-[14px] font-semibold text-[#3f3f3f]"
            >
              Ghi chú
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              className={bk.input}
              maxRows={4}
              multiline
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <h2 className="mt-2 font-rounded text-[15px] font-semibold text-black">
            THÔNG TIN THANH TOÁN
          </h2>
          <hr />
          <div className="py-1">
            <label
              htmlFor="outlined-basic"
              className="font-rounded text-[14px] font-semibold text-[#3f3f3f]"
            >
              Giá vé thực thu
            </label>
            <TextField
              id="outlined-basic"
              variant="outlined"
              size="small"
              className={bk.input}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>
          <div className="mb-10 py-1">
            <label
              htmlFor="demo-simple-select-label"
              className="font-rounded text-[14px] font-semibold text-[#3f3f3f]"
            >
              Hình thức thanh toán
            </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              size="small"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value as number)}
              fullWidth
            >
              <MenuItem value={1} className="font-rounded" disabled>
                Thanh toán trực tuyến
              </MenuItem>
              <MenuItem value={2} className="font-rounded">
                Thanh toán trên xe
              </MenuItem>
              <MenuItem value={3} className="font-rounded">
                Thanh toán tại quầy
              </MenuItem>
            </Select>
          </div>
        </div>
      </div>
      <div className="mb-2 flex space-x-3 px-2 py-2">
        <Tooltip title="Sao chép vé" arrow>
          <IconButton
            color="primary"
            aria-label="Sao chép vé"
            className="bg-[#e2e2e2]"
          >
            <FileCopy />
          </IconButton>
        </Tooltip>
        <Tooltip title="Di chuyển vé" arrow>
          <IconButton
            color="primary"
            aria-label="Di chuyển vé"
            className="bg-[#e2e2e2]"
          >
            <OpenWith />
          </IconButton>
        </Tooltip>
        <Tooltip title="Lịch sử vé" arrow>
          <IconButton
            color="primary"
            aria-label="Lịch sử vé"
            className="bg-[#e2e2e2]"
          >
            <History />
          </IconButton>
        </Tooltip>
        <Tooltip title="Hủy vé" arrow>
          <IconButton
            color="primary"
            aria-label="Hủy vé"
            className="bg-[#e2e2e2]"
          >
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chuyển xuống danh sách chờ xử lý" arrow>
          <IconButton
            color="primary"
            aria-label="Chuyển xuống danh sách chờ xử lý"
            className="bg-[#e2e2e2]"
          >
            <AutoMode />
          </IconButton>
        </Tooltip>
      </div>
      <div className="flex space-x-1 px-1 py-2">
        <Button
          className="w-full flex-1"
          size="small"
          variant="outlined"
          startIcon={<SaveAs />}
          onClick={handleUpdate}
        >
          Cập nhật
        </Button>
        <Button
          className="w-full flex-1 py-[5px]"
          size="small"
          variant="outlined"
          color="warning"
          startIcon={<LocalPrintshop />}
        >
          In vé
        </Button>
      </div>
    </div>
  );
};
export default BookingTicket;
