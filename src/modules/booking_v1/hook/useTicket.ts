import { useEffect, useState } from "react";
import { TicketData } from "../types/TicketData";
import { getListTicketByTripId } from "../api/ticketAPI";

const useTicket = (tripId: number) => {
    const [ticket, setTicket] = useState<TicketData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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

    return { ticket, loading, error };

}
export default useTicket;