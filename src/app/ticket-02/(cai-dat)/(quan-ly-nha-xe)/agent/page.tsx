"use client";
import { getStorage_CompanyId } from "@/lib/cookie";
import LoadingIndicator from "@/lib/Loading";
import ModalAgent from "@/modules/agent/components/ModalAgent";
import TableAgent from "@/modules/agent/components/TableAgent";
import useAgent from "@/modules/agent/hook/useAgent";
import { AgentData } from "@/modules/agent/types/AgentData";
import { NewAgentData } from "@/modules/agent/types/NewAgentData";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

export default function AgentPage() {
  const companyId = Number(getStorage_CompanyId());
  const { agent, loading, error, updateAgent, deleteAgent, createAgent } =
    useAgent(companyId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selecteAgent, setSelecteAgent] = useState<AgentData | null>(null);
  const handleAddAgentClick = () => {
    setModalMode("create");
    setSelecteAgent(null);
    setIsModalOpen(true);
  };
  const handleEdit = (agent: AgentData) => {
    setModalMode("edit");
    setSelecteAgent(agent);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (agentId: number) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa đại lý này?");
    if (isConfirmed) {
      deleteAgent(agentId);
    }
  };
  const handleSaveAgent = async (agentData: AgentData | NewAgentData) => {
    if (modalMode === "create") {
      const newAgent: NewAgentData = {
        ...agentData,
      };
      console.log("Saving new agent:", newAgent);
      await createAgent(newAgent);
    } else if (modalMode === "edit" && (agentData as AgentData).id) {
      const updatedAgent: AgentData = agentData as AgentData;
      console.log("Updating agent:", updatedAgent);
      await updateAgent(updatedAgent.id, updatedAgent);
    }
    handleCloseModal();
  };
  return (
    <div className="bg-white p-0">
      <div className="mb-10 flex items-center justify-between">
        <span className="m-0 text-[20px] font-semibold text-black">
          Danh sách đại lý
        </span>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddAgentClick}
        >
          Thêm đại lý
        </Button>
      </div>

      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : error ? (
        <p>Error loading agent: {error}</p>
      ) : (
        <TableAgent data={agent} onDelete={handleDelete} onEdit={handleEdit} />
      )}
      <ModalAgent
        open={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        agentData={selecteAgent}
        onSave={handleSaveAgent}
      />
    </div>
  );
}
