import { useEffect, useState } from "react";
import { AgentData } from "../types/AgentData";
import Toast from "@/lib/Toast";
import axios from "axios";
import { NewAgentData } from "../types/NewAgentData";
import {
  createAgentByCompanyId,
  deleteAgentById,
  getListAgentByCompanyId,
  updateAgentById,
} from "../api/agentAPI";

const useAgent = (companyId: number) => {
  const [agent, setAgent] = useState<AgentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const response = await getListAgentByCompanyId(companyId);
        setAgent(response.data);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Đã xảy ra lỗi");
        }
        setLoading(false);
      }
    };
    if (companyId) {
      fetchVehicle();
    }
  }, [companyId]);

  const createAgent = async (newAgentData: NewAgentData) => {
    try {
      const createAgent = await createAgentByCompanyId(companyId, newAgentData);
      setAgent((prevAgents) => [...prevAgents, createAgent]);
      Toast.success("Tạo đại lý mới thành công");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { status } = err.response;
        switch (status) {
          case 422:
            Toast.error("Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại.");
            break;
          case 409:
            Toast.error("Đại lý đã tồn tại trong công ty.");
            break;
          case 404:
            Toast.error("Dữ liệu công ty không tồn tại");
            break;
          case 500:
            setError("Lỗi hệ thống. Vui lòng thử lại sau.");
            break;
          default:
            setError("Đã xảy ra lỗi không xác định. Vui lòng thử lại.");
            break;
        }
      } else {
        Toast.error("Không thể tạo đại lý mới. Vui lòng thử lại.");
        setError("Không thể tạo đại lý mới. Vui lòng thử lại.");
      }
    }
  };

  const updateAgent = async (agentId: number, updatedData: AgentData) => {
    try {
      const updateAgent = await updateAgentById(agentId, updatedData);
      setAgent((prevAgents) =>
        prevAgents.map((agent) =>
          agent.id === agentId ? { ...agent, ...updateAgent } : agent,
        ),
      );
      Toast.info("Cập nhật đại lý thành công");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 404:
            Toast.error("Không tìm thấy dữ liệu đại lý đã cho.");
            break;
          case 400:
            Toast.error("Dữ liệu cập nhật không hợp lệ.");
            break;
          case 500:
            setError("Lỗi hệ thống, vui lòng thử lại sau.");
            Toast.error("Lỗi hệ thống khi cập nhật đại lý");
            break;
          default:
            setError("Có lỗi xảy ra, vui lòng thử lại.");
            Toast.error("Không thể cập nhật đại lý.");
        }
      } else {
        setError("Lỗi không xác định.");
        Toast.error("Có lỗi xảy ra trong quá trình cập nhật.");
      }
    }
  };
  const deleteAgent = async (agentId: number) => {
    try {
      await deleteAgentById(agentId);
      setAgent((prevAgents) =>
        prevAgents.filter((agent) => agent.id !== agentId),
      );
      Toast.info("Xóa đại lý thành công");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          Toast.error("Không tìm thấy đại lý.");
        } else if (err.response?.status === 500) {
          Toast.error("Lỗi hệ thống, vui lòng thử lại sau.");
        } else {
          setError("Không thể xóa đại lý.");
          Toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
        }
      } else {
        setError("Không thể xóa đại lý.");
        Toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    }
  };

  return {
    agent,
    loading,
    error,
    createAgent,
    updateAgent,
    deleteAgent,
  };
};
export default useAgent;
