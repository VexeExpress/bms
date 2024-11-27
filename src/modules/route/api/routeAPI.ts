import apiClient from "@/config/apiClient";
export const getRouteNameByCompanyId = async (companyId: number) => {
  try {
    const response = await apiClient.get(`/route/list-route-name/${companyId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
