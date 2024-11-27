import apiClient from "@/config/apiClient";
import { NewSeatingChartData } from "../types/NewSeatingChartData";
import { SeatingChartData } from "../types/SeatingChartData";

export const createSeatingChartAPI = async (
  newSeatingChart: NewSeatingChartData,
  companyId: number | null,
) => {
  try {
    const payload = companyId
      ? { ...newSeatingChart, companyId }
      : newSeatingChart;
    const response = await apiClient.post("/seating-chart/create", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating seating chart:", error);
    throw error;
  }
};
export const getListSeatChartByCompanyId = async (companyId: number) => {
  try {
    const response = await apiClient.get(
      `/seating-chart/list-chart/${companyId}`,
    );
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateSeatingChartAPI = async (
  seatChartId: number,
  updatedData: SeatingChartData,
): Promise<SeatingChartData> => {
  try {
    console.log("SeatChartId:", seatChartId);
    console.log("Updated Data:", updatedData);
    const response = await apiClient.put(
      `/seating-chart/update/${seatChartId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    console.error("Error while updating seating chart:", error);
    throw error;
  }
};
export const deleteSeatingChartAPI = async (seatChartId: number) => {
  try {
    const response = await apiClient.delete(
      `/seating-chart/delete/${seatChartId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
