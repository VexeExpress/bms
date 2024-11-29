export interface TripData {
  id: number;
  note: string;
  timeDeparture: string;
  dateDeparture: string;
  drivers: string[] | null;
  assistant: string[] | null;
  licensePlate: string;
  seatingChartName: string;
  routeId: number;
  seatingChartId: number;
  driversDetail: string[];
  assistantDetail: string[];
  phoneVehicle: string;
}
