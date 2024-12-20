import apiClient from "@/config/apiClient";
import { TicketData } from "../types/TicketData";
export const getListTicketByTripId = async (tripId: number) => {
  try {
    const response = await apiClient.get(`/ticket/list-ticket/${tripId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateTicketAPI = async (
  ticketIds: number[],
  data: TicketData,
) => {
  try {
    const response = await apiClient.put(`/ticket/update-tickets`, {
      ticketIds,
      commonData: data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
