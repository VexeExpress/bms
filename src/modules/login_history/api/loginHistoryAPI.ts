import apiClient from "@/config/apiClient";
export const getLoginHistory = async (companyId: number) => {
  try {
    const response = await apiClient.get(`/auth/login-history/${companyId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
