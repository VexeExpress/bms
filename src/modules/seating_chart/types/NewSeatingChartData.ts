import { Seat } from "./Seat";

export interface NewSeatingChartData {
  seatingChartName: string;
  seats: Seat[];
  totalFloors: number;
  totalRows: number;
  totalColumns: number;
}
