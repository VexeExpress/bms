export interface TicketType {
    id: number;
    floor: number;
    column: number;
    row: number;
    code: string;
    name: string;
    bookingStatus: boolean;
    phoneNumber: string;
    fullName: string;
}