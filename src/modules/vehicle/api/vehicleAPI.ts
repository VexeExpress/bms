import apiClient from "@/config/apiClient";
import { VehicleData } from "../types/VehicleData";
import { NewVehicleData } from "../types/NewVehicleData";

export const getListVehicleByCompanyId = async (companyId: number) => {
  try {
    const response = await apiClient.get(`/vehicle/list-vehicle/${companyId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateVehicleById = async (
  vehicleId: number,
  updatedData: VehicleData,
) => {
  try {
    const response = await apiClient.put(
      `/vehicle/update/${vehicleId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteVehicleById = async (vehicleId: number) => {
  try {
    const response = await apiClient.delete(`/vehicle/delete/${vehicleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createVehicleByCompanyId = async (
  companyId: number | null,
  newVehicleData: NewVehicleData,
) => {
  try {
    const payload = companyId
      ? { ...newVehicleData, companyId }
      : newVehicleData;
    const response = await apiClient.post("/vehicle/create", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
