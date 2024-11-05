import apiClient from "@/config/apiClient";

export const addEmployee = async (employeeData: object) => {
    try {
        console.log(employeeData)
        const response = await apiClient.post("/employee/create", employeeData);
        return response.data;
    } catch (error) {
        throw error;
    }
};