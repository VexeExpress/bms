
export interface EmployeeType {
    id: number;
    accessBms: boolean;
    accessCms: boolean;
    accessTms: boolean;
    username: string;
    roles: string[];
    fullName: string;
    phone: string;
    startDate: string;
    birthDate: string;
    gender: number;
    email: string;
    address: string;
    status: boolean;
    password: string;
    companyId: number;
}
