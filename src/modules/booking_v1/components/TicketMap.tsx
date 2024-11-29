import LoadingIndicator from "@/lib/Loading";
import useTicket from "../hook/useTicket";
import { TicketData } from "../types/TicketData";
import { Room } from "@mui/icons-material";
import style from "../style/Ticket.module.css";
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
const TicketItem = ({ ticket }: { ticket: TicketData }) => {
  return (
    <div
      key={ticket.id}
      className={`${ticket.ticketStatus ? "border-[#3ca8f0] bg-white" : "border-red-500 bg-gray-500"} ${style.container}`}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[16px] font-semibold text-[#53a026]">
          {ticket.ticketName}
        </div>
        {ticket.ticketPhone && (
          <div className="rounded border border-[#3d3d3d] px-2 py-[1px] text-[16px] font-semibold text-black">
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
        {ticket.ticketPointUp && (
          <div className="flex items-center">
            <Room className="text-[15px] text-[#0072bc]" />
            <span className="pb-[1px] pl-[1px] font-medium text-black">
              {ticket.ticketPointUp}
            </span>
          </div>
        )}
        {ticket.ticketPointDown && (
          <div className="flex items-center">
            <Room className="text-[15px] text-[#c03030]" />
            <span className="pb-[1px] pl-[1px] font-medium text-black">
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
            * ghi chú thông tin vé hoặc thông tin khách hàng
          </span>
        </div>
      )}

      {ticket.paymentType && (
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-[13px] font-medium text-black">0/</span>
            <span className="text-[13px] font-medium text-black">350,000</span>
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
            B: Trần Thị Lan / VP Cư Jút
          </span>
          {/* <span className="text-[12px] text-black font-medium">D: đại lý giọt đắng </span> */}
        </div>
      )}
    </div>
  );
};
const TicketMap = ({ tripId }: TicketMapProps) => {
  const { ticket, loading, error } = useTicket(tripId);
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
  const groupedByFloor = groupBy(ticket, (t) => t.ticketFloor);
  return (
    <section className="flex">
      {Array.from(groupedByFloor.entries()).map(([floor, tickets]) => {
        const groupedByRow = groupBy(tickets, (t) => t.ticketRow);

        return (
          <div key={floor} className="mb-8 flex-1">
            {/* <h2 className="text-xl font-bold mb-4">Floor {floor}</h2> */}
            <div className="mt-2 rounded-md">
              {Array.from(groupedByRow.entries()).map(([row, rowTickets]) => (
                <div key={row} className="mb-2 flex justify-center">
                  {rowTickets
                    .sort((a, b) => a.ticketColumn - b.ticketColumn)
                    .map((t) => (
                      <TicketItem key={t.id} ticket={t} />
                    ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default TicketMap;
