import LoadingIndicator from "@/lib/Loading";
import useTicket from "../hook/useTicket";
import { TicketData } from "../types/TicketData";
import { Room } from "@mui/icons-material";
import style from '../style/Ticket.module.css'
interface TicketMapProps {
    tripId: number;
}
const groupBy = <T, K extends string | number | symbol>(array: T[], key: (item: T) => K): Map<K, T[]> => {
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
            className={`${ticket.ticketStatus ? "bg-white border-[#3ca8f0]" : "bg-gray-500 border-red-500"} ${style.container}`}
        >
            <div className="flex justify-between items-center mb-2">
                <div className="text-[16px] text-[#53a026] font-semibold">{ticket.ticketName}</div>
                {ticket.ticketPhone && (
                    <div className="text-[16px] text-black px-2 py-[1px] rounded border border-[#3d3d3d] font-semibold">
                        {ticket.ticketPhone}
                    </div>
                )}
            </div>
            {ticket.customerName && (
                <div className="text-left mb-1">
                    <span className="block text-sm text-black font-medium">{ticket.customerName}</span>
                </div>
            )}

            <div className="text-sm mb-1">
                {ticket.ticketPointUp && (
                    <div className="flex items-center">
                        <Room className="text-[15px] text-[#0072bc]" />
                        <span className="text-black font-medium pb-[1px] pl-[1px]">{ticket.ticketPointUp}</span>
                    </div>
                )}
                {ticket.ticketPointDown && (
                    <div className="flex items-center">
                        <Room className="text-[15px] text-[#c03030]" />
                        <span className="text-black font-medium pb-[1px] pl-[1px]">{ticket.ticketPointDown}</span>
                    </div>
                )}
            </div>
            {ticket.ticketPhone && (
                <div className="text-right text-xs">
                    <span className="block text-black font-medium">(1) {ticket.id}</span>
                </div>
            )}
            {ticket.ticketNote && (
                <div className="text-left mt-[3px]">
                    <span className="block text-blue-600 font-medium text-[14px]">* ghi chú thông tin vé hoặc thông tin khách hàng</span>
                </div>
            )}

            {ticket.paymentType && (
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center">
                        <span className="text-[13px] text-black font-medium">0/</span>
                        <span className="text-[13px] text-black font-medium">350,000</span>
                    </div>
                    <div className="text-[13px] text-black font-medium">TTTMTQ</div>
                </div>
            )}
            {ticket.paymentType && (
                <div className="w-full mt-[1px]">
                    <div className="progress h-[5px] bg-gray-300 rounded">
                        <div className="progress-bar bg-blue-600 h-full rounded" style={{ width: '100%' }}></div>
                    </div>
                </div>
            )}
            {ticket.paymentType && (
                <div className="flex justify-between items-center mt-1 text-xs">
                    <span className="text-[12px] text-black font-medium">B: Trần Thị Lan / VP Cư Jút</span>
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
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500"><LoadingIndicator /></p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-red-500">Lỗi khi tải sơ đồ ghế: {error}</p>
            </div>
        );
    }
    const groupedByFloor = groupBy(ticket, t => t.ticketFloor);
    return (
        <section className="flex">
            {Array.from(groupedByFloor.entries()).map(([floor, tickets]) => {
                const groupedByRow = groupBy(tickets, t => t.ticketRow);

                return (
                    <div key={floor} className="mb-8 flex-1">
                        {/* <h2 className="text-xl font-bold mb-4">Floor {floor}</h2> */}
                        <div className=" rounded-md mt-2">
                            {Array.from(groupedByRow.entries()).map(([row, rowTickets]) => (
                                <div key={row} className="flex justify-center mb-2">
                                    {rowTickets.sort((a, b) => a.ticketColumn - b.ticketColumn).map((t) => (
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