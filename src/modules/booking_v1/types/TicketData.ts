export interface TicketData {
  filter(arg0: (t: any) => boolean): any;
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
}
