export interface NewTripData {
  id?: number;
  routeId: number | null;
  timeDeparture: string;
  driverIds: number[];
  assistantIds: number[];
  seatChartId: number | null;
  note: string;
  companyId: number;
  vehicleId: number | null;
  dateDeparture: string;
}
