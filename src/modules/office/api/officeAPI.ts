import apiClient from "@/config/apiClient";
import { OfficeData } from "../types/OfficeData";
import { NewOfficeData } from "../types/NewOfficeData";
export const getListOfficeByCompanyId = async (companyId: number) => {
  try {
    const response = await apiClient.get(`/office/list-office/${companyId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateOfficeById = async (
  officeId: number,
  updatedData: OfficeData,
) => {
  try {
    const response = await apiClient.put(
      `/office/update/${officeId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteOfficeById = async (officeId: number) => {
  try {
    const response = await apiClient.delete(`/office/delete/${officeId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createOfficeByCompanyId = async (
  companyId: number | null,
  newOfficeData: NewOfficeData,
) => {
  try {
    const payload = companyId ? { ...newOfficeData, companyId } : newOfficeData;
    const response = await apiClient.post("/office/create", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getOfficeNameByCompanyId = async (companyId: number) => {
  try {
    const response = await apiClient.get(`/office/list-office-name/${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
