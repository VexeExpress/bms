export interface Seat {
  id?: number;
  seatCode: string;
  seatName: string;
  seatStatus: boolean;
  floor: number;
  row: number;
  column: number;
}
