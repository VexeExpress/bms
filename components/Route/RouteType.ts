export interface RouteType {
    id: number;
    companyId: number;
    routeName: string;
    routeNameShort: string;
    displayPrice: number;
    status: boolean;
    note: string;
    displayOrder: number;
}
export interface RouteNameType {
    id: number;
    routeName: string;
}