import LoadingIndicator from "@/lib/Loading";
import useTicket from "../hook/useTicket";
import { TicketData } from "../types/TicketData";

import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import BookingTicket from "./TicketMap/BookingTicket";
import TicketItem from "./TicketMap/TicketItem";

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

const TicketMap = ({ tripId }: TicketMapProps) => {
  const {
    ticket: listTicket,
    loading,
    error,
    updateTickets,
    isLoadingTicket,
  } = useTicket(tripId);
  const [open, setOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    setSelectedTickets([]);
  }, [tripId]);

  const handleUpdateTickets = async (updatedTicketData: TicketData[]) => {
    await updateTickets(updatedTicketData);
    setSelectedTickets([]);
  };

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
                            isLoading={isLoadingTicket(ticket.id)}
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
            onUpdate={handleUpdateTickets}
          />
        )}
      </Drawer>
    </div>
  );
};

export default TicketMap;
