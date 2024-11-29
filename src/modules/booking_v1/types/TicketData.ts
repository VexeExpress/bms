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
}
