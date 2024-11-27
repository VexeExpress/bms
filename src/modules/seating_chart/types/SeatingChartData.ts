import { Seat } from "./Seat";

export interface SeatingChartData {
  id?: number;
  seatingChartName: string;
  seats: Seat[];
  totalFloors: number;
  totalRows: number;
  totalColumns: number;
}
