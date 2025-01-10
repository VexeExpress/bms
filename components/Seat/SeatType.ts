export interface SeatMapType {
    id: number;
    name: string;
    floor: number;
    column: number;
    row: number;
    companyId: number;
    seats: SeatType[];
}
export interface SeatType {
    id: number;
    code: string;
    name: string;
    type: number;
    floor: number;
    column: number;
    row: number;
}
export interface SeatChartNameType {
    id: number;
    name: string;
}
