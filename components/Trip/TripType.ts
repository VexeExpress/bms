export interface TripScheduleType {
    id: number;
    valueTime: string;
    valueRoute: number;
    valueSeatChart: number;
    valueDateStart: string;
    valueDateEnd: string;
    valueEnableDateEnd: boolean;
    companyId: number;
    employeeId: number;

    chart: string;
    route: string;
    employee: string;
    createdAt: string;
}
export interface TripDataType {
    id: number;
    timeDeparture: string;
    dateDeparture: string;
    note: string;

    seatChartId: number;
    vehicleId: number;
    seatChartName: string;
    licensePlate: string;
}
