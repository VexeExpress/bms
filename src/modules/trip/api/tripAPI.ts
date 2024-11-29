import apiClient from "@/config/apiClient";
import { NewTripData } from "../types/NewTripData";
export const getTripsByCompanyIdAndRouteIdAndDate = async (
  companyId: number,
  routeId: number,
  dateDeparture: string,
) => {
  try {
    const response = await apiClient.get(`/trip/search-trip`, {
      params: {
        companyId,
        routeId,
        dateDeparture,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createTripAPI = async (newTripData: NewTripData) => {
  try {
    console.log("newTripData", newTripData);
    const response = await apiClient.post("/trip/create", newTripData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteTripAPI = async (tripId: { id: number }) => {
  try {
    await apiClient.delete(`/trip/delete/${tripId.id}`);
  } catch (error) {
    throw error;
  }
};
