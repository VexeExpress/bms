import apiClient from "@/config/apiClient";
export const login = async (
  username: string,
  password: string,
  ipAddress: string,
  browserName: string,
  operatingSystem: string,
) => {
  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
      ipAddress,
      browserName,
      operatingSystem,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
