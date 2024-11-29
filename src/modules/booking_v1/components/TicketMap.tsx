import LoadingIndicator from "@/lib/Loading";
import useTicket from "../hook/useTicket";
import { TicketData } from "../types/TicketData";
import {
  FileCopy,
  LocalPrintshop,
  OpenWith,
  Room,
  SaveAs,
  History,
  Delete,
  AutoMode,
} from "@mui/icons-material";
import style from "../style/Ticket.module.css";
import {
  Button,
  Chip,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import bk from "../style/BookingTicket.module.css";
import { getStorage_EmployeeId, getStorage_OfficeId } from "@/lib/cookie";
import { updateTicket } from "../api/ticketAPI";
interface TicketMapProps {
  tripId: number;
}
const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  key: (item: T) => K,
): Map<K, T[]> => {
  return array.reduce((acc, item) => {
    const group = key(item);
    if (!acc.has(group)) {
      acc.set(group, []);
    }
    acc.get(group)!.push(item);
    return acc;
  }, new Map<K, T[]>());
};

const TicketItem = ({
  ticket,
  onClick,
  isActive,
}: {
  ticket: TicketData;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <div
      key={ticket.id}
      className={`${ticket.ticketStatus ? "border-[#3ca8f0] bg-white" : "border-red-500 bg-gray-500"} ${style.container} ${isActive ? `${bk.active}` : ""}`}
      onClick={onClick}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[16px] font-semibold text-[#248d3b]">
          {ticket.ticketName}
        </div>
        {ticket.ticketPhone && (
          <div className="ml-2 rounded border border-[#3d3d3d] px-2 py-[1px] text-[16px] font-semibold text-black">
            {ticket.ticketPhone}
          </div>
        )}
      </div>
      {ticket.customerName && (
        <div className="mb-1 text-left">
          <span className="block text-sm font-medium text-black">
            {ticket.customerName}
          </span>
        </div>
      )}

      <div className="mb-1 text-sm">
        {ticket.ticketPhone && (
          <div className="flex items-center pb-[1px]">
            <Room className="text-[15px] text-[#0072bc]" />
            <span className="pl-[1px] font-medium text-black">
              {ticket.ticketPointUp}
            </span>
          </div>
        )}
        {ticket.ticketPhone && (
          <div className="flex items-center pb-[1px]">
            <Room className="text-[15px] text-[#c03030]" />
            <span className="pl-[1px] font-medium text-black">
              {ticket.ticketPointDown}
            </span>
          </div>
        )}
      </div>
      {ticket.ticketPhone && (
        <div className="text-right text-xs">
          <span className="block font-medium text-black">(1) {ticket.id}</span>
        </div>
      )}
      {ticket.ticketNote && (
        <div className="mt-[3px] text-left">
          <span className="block text-[14px] font-medium text-blue-600">
            * {ticket.ticketNote}
          </span>
        </div>
      )}

      <div>
        {ticket.paymentType && (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-[13px] font-medium text-black">
                {ticket.ticketPrice}
              </span>
            </div>
            <div className="text-[13px] font-medium text-black">TTTMTQ</div>
          </div>
        )}
        {ticket.paymentType && (
          <div className="mt-[1px] w-full">
            <div className="progress h-[5px] rounded bg-gray-300">
              <div
                className="progress-bar h-full rounded bg-blue-600"
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        )}
        {ticket.paymentType && (
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-[12px] font-medium text-black">
              B: {ticket.employeeName} / {ticket.officeName}
            </span>
            {/* <span className="text-[12px] text-black font-medium">D: đại lý giọt đắng </span> */}
          </div>
        )}
      </div>
    </div>
  );
};
const TicketMap = ({ tripId }: TicketMapProps) => {
  const { ticket: listTicket, loading, error } = useTicket(tripId);
  const [open, setOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    setSelectedTickets([]);
  }, [tripId]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Thêm vé vào selectedTickets để hiển thị vào Drawer Booking
  const handleSelectTicket = (ticket: TicketData) => {
    // Check if there are any tickets with a valid ticketPhone
    const hasValidTicket = selectedTickets.some(
      (t: TicketData) => t.ticketPhone,
    );

    // Function to clear selected tickets
    const clearSelectedTickets = () => {
      if (selectedTickets.length > 0) {
        setSelectedTickets([]);
      }
    };

    if (!ticket.ticketPhone) {
      // For tickets without ticketPhone, toggle the ticket's selection
      if (hasValidTicket) {
        clearSelectedTickets();
      }

      setSelectedTickets((prevTickets) => {
        const ticketIndex = prevTickets.findIndex((t) => t.id === ticket.id);
        return ticketIndex !== -1
          ? prevTickets.filter((t) => t.id !== ticket.id) // Remove the ticket
          : [...prevTickets, ticket]; // Add the ticket
      });
    } else {
      // For tickets with ticketPhone, manage by ticketPhone
      if (!hasValidTicket) {
        clearSelectedTickets();
      }

      // Filter selected tickets based on ticketPhone
      const updatedTickets = selectedTickets.some(
        (t) => t.ticketPhone === ticket.ticketPhone,
      )
        ? selectedTickets.filter((t) => t.ticketPhone !== ticket.ticketPhone) // Remove all with the same ticketPhone
        : listTicket.filter((z) => z.ticketPhone === ticket.ticketPhone); // Add matching tickets

      setSelectedTickets(updatedTickets);
    }

    if (!open) {
      setOpen(true);
    }
  };

  // Xóa Chip và cập nhật acctive vé ngoài sơ đồ
  const handleDeleteChip = (ticketId: number) => {
    setSelectedTickets((prevSelectedTickets) => {
      const newSelectedTickets = prevSelectedTickets.filter(
        (t) => t.id !== ticketId,
      );

      if (newSelectedTickets.length === 0) {
        setOpen(false);
      }

      return newSelectedTickets;
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">
          <LoadingIndicator />
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-red-500">Lỗi khi tải sơ đồ ghế: {error}</p>
      </div>
    );
  }
  const groupedByFloor = groupBy(listTicket, (t) => t.ticketFloor);
  const sortedFloors = Array.from(groupedByFloor.entries()).sort(
    ([a], [b]) => a - b,
  );

  const isActiveTicket = (ticket: TicketData) => {
    return selectedTickets.includes(ticket);
  };
  return (
    <div className="flex">
      <section
        className={`flex-1 ${open && selectedTickets.length > 0 ? "mr-[270px]" : ""} flex flex-wrap`}
      >
        {sortedFloors.map(([floor, tickets]) => {
          const maxRow = Math.max(...tickets.map((t) => t.ticketRow));
          const maxColumn = Math.max(...tickets.map((t) => t.ticketColumn));
          return (
            <div key={floor} className="mb-8 min-w-[50%] flex-1">
              <div className="mt-2 rounded-md">
                {/* <div className="text-xl font-bold mb-4">Floor {floor}</div> */}
                {Array.from({ length: maxRow + 1 }).map((_, rowIndex) => (
                  <div key={rowIndex} className="mb-2 flex justify-center">
                    {Array.from({ length: maxColumn + 1 }).map(
                      (_, colIndex) => {
                        const ticket = tickets.find(
                          (t) =>
                            t.ticketRow === rowIndex &&
                            t.ticketColumn === colIndex,
                        );
                        return ticket ? (
                          <TicketItem
                            key={ticket.id}
                            ticket={ticket}
                            onClick={() => handleSelectTicket(ticket)}
                            isActive={isActiveTicket(ticket)}
                          />
                        ) : (
                          <div
                            key={`${rowIndex}-${colIndex}`}
                            className="flex w-full items-center justify-center rounded-lg border bg-transparent p-4 text-sm font-bold text-white shadow-md"
                            style={{ borderRadius: "8px", margin: "2px" }}
                          ></div>
                        );
                      },
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        variant="persistent"
      >
        {selectedTickets.length > 0 && (
          <BookingTicket
            tickets={selectedTickets}
            onDelete={handleDeleteChip}
          />
        )}
      </Drawer>
    </div>
  );
};

const BookingTicket = ({
  tickets,
  onDelete,
}: {
  tickets: TicketData[];
  onDelete: (ticketId: number) => void;
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
  const handleUpdate = async () => {
    const ticketsToUpdate = tickets.map((ticket) => ({
      ticketId: ticket.id,
    }));

    const data = {
      phone,
      name,
      pickup,
      dropoff,
      note,
      paymentType,
      price,
      officeId: Number(getStorage_OfficeId()),
      employeeId: Number(getStorage_EmployeeId()),
    };

    try {
      const updatedTickets = await updateTicket(
        ticketsToUpdate.map((ticket) => ticket.ticketId),
        data,
      );
      console.log("Cập nhật thành công các vé:", updatedTickets);
    } catch (error) {
      console.error("Update failed:", error);
    }
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

export default TicketMap;
