import apiClient from "@/config/apiClient";
import { AgentData } from "../types/AgentData";
import { NewAgentData } from "../types/NewAgentData";

export const getListAgentByCompanyId = async (companyId: number) => {
  try {
    const response = await apiClient.get(`/agent/list-agent/${companyId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateAgentById = async (
  agentId: number,
  updatedData: AgentData,
) => {
  try {
    const response = await apiClient.put(
      `/agent/update/${agentId}`,
      updatedData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deleteAgentById = async (agentId: number) => {
  try {
    const response = await apiClient.delete(`/agent/delete/${agentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createAgentByCompanyId = async (
  companyId: number | null,
  newAgentData: NewAgentData,
) => {
  try {
    const payload = companyId ? { ...newAgentData, companyId } : newAgentData;
    const response = await apiClient.post("/agent/create", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
