export interface TicketData {
  id: number;
  ticketFloor: number;
  ticketRow: number;
  ticketColumn: number;
  ticketCode: string;
  ticketName: string;
  ticketStatus: boolean;

  ticketPhone: string;
  ticketPointUp: string;
  ticketPointDown: string;
  ticketNote: string;
  paymentType: number;
  customerName: string;
  ticketPrice: number;
  employeeName: string;
  officeName: string;
  bookingStatus: boolean;
  officeId: number;
  employeeId: number;
}
export interface TicketList {
  filter: (arg0: (t: TicketData) => boolean) => TicketData[];
}

// // Example usage
// const tickets: TicketData[] = [
//   // array of ticket data
// ];

// const filteredTickets = tickets.filter(t => t.ticketStatus);
