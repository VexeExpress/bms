import apiClient from "@/config/apiClient";
export const getListTicketByTripId = async (tripId: number) => {
  try {
    const response = await apiClient.get(`/ticket/list-ticket/${tripId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
