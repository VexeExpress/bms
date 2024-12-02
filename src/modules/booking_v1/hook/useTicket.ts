import { useEffect, useState } from "react";
import { TicketData } from "../types/TicketData";
import { getListTicketByTripId, updateTicketAPI } from "../api/ticketAPI";
import { getStorage_EmployeeId, getStorage_OfficeId } from "@/lib/cookie";
import Toast from "@/lib/Toast";

const useTicket = (tripId: number) => {
  const [ticket, setTicket] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingTickets, setLoadingTickets] = useState<number[]>([]); // Danh sách ID vé đang loading

  useEffect(() => {
    const fetchTickets = async () => {
      if (!tripId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getListTicketByTripId(tripId);
        setTicket(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to fetch tickets");
        } else {
          setError("Failed to fetch tickets");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [tripId]);

  const updateTickets = async (updatedTicketData: TicketData[]) => {
    const ticketIds = updatedTicketData.map((ticket) => ticket.id);

    try {
      // Bật trạng thái loading cho các vé được cập nhật
      setLoadingTickets((prev) => [...prev, ...ticketIds]);

      console.log("Data page:", JSON.stringify(updatedTicketData, null, 2));

      const enrichedTicketData = updatedTicketData.map((ticket) => ({
        ...ticket,
        officeId: Number(getStorage_OfficeId()),
        employeeId: Number(getStorage_EmployeeId()),
      }));
      const commonData = { ...enrichedTicketData[0] };

      const response = await updateTicketAPI(ticketIds, commonData);

      if (response) {
        console.log("Cập nhật vé thành công:", response);

        // Cập nhật trực tiếp các vé trong danh sách
        setTicket((prevTickets) =>
          prevTickets.map((ticket) => {
            const updatedTicket = updatedTicketData.find(
              (updated) => updated.id === ticket.id,
            );
            return updatedTicket ? { ...ticket, ...updatedTicket } : ticket; // Cập nhật vé nếu có thay đổi
          }),
        );
      } else {
        Toast.error("Có lỗi khi cập nhật vé");
      }
    } catch (error) {
      console.error("Có lỗi khi cập nhật vé", error);
      Toast.error("Có lỗi hệ thống. Vui lòng thử lại");
    } finally {
      // Tắt trạng thái loading cho các vé được cập nhật
      setLoadingTickets((prev) => prev.filter((id) => !ticketIds.includes(id)));
    }
  };
  const isLoadingTicket = (ticketId: number) =>
    loadingTickets.includes(ticketId);
  return { ticket, loading, error, updateTickets, isLoadingTicket };
};

export default useTicket;
