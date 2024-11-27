import apiClient from "@/config/apiClient";
import { RouteData } from "../types/RouteData";
import { NewRouteData } from "../types/NewRouteData";
export const getListRouteByCompanyId = async (companyId: number) => {
  try {
    const response = await apiClient.get(`/route/list-route/${companyId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateRouteById = async (
  routeId: number,
  updatedData: RouteData,
) => {
  try {
    const response = await apiClient.put(
      `/route/update/${routeId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteRouteById = async (routeId: number) => {
  try {
    const response = await apiClient.delete(`/route/delete/${routeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createRouteByCompanyId = async (
  companyId: number | null,
  newData: NewRouteData,
) => {
  try {
    const payload = companyId ? { ...newData, companyId } : newData;
    const response = await apiClient.post("/route/create", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
