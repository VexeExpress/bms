"use client";
import { getStorage_CompanyId } from "@/lib/cookie";
import LoadingIndicator from "@/lib/Loading";
import ModalOffice from "@/modules/office/components/ModalOffice";
import TableOffice from "@/modules/office/components/TableOffice";
import useOffice from "@/modules/office/hook/useOffice";
import { NewOfficeData } from "@/modules/office/types/NewOfficeData";
import { OfficeData } from "@/modules/office/types/OfficeData";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

export default function OfficePage() {
  const companyId = Number(getStorage_CompanyId());
  const { offices, loading, error, updateOffice, deleteOffice, createOffice } =
    useOffice(companyId);
  console.log(offices);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedOffice, setSelectedOffice] = useState<OfficeData | null>(null);
  const handleAddOfficeClick = () => {
    setModalMode("create");
    setSelectedOffice(null);
    setIsModalOpen(true);
  };
  const handleEdit = (office: OfficeData) => {
    setModalMode("edit");
    setSelectedOffice(office);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (officeId: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa văn phòng này?",
    );
    if (isConfirmed) {
      deleteOffice(officeId);
    }
  };

  const handleSaveOffice = async (officeData: NewOfficeData | OfficeData) => {
    if (modalMode === "create") {
      await createOffice(officeData as NewOfficeData);
    } else if (modalMode === "edit" && selectedOffice?.id !== undefined) {
      await updateOffice(selectedOffice.id, officeData as OfficeData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white p-0">
      <div className="mb-10 flex items-center justify-between">
        <span className="m-0 text-[20px] font-semibold text-black">
          Danh sách văn phòng
        </span>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddOfficeClick}
        >
          Thêm văn phòng
        </Button>
      </div>

      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : error ? (
        <p>Error loading offices: {error}</p>
      ) : (
        <TableOffice
          data={offices}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <ModalOffice
        open={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        officeData={selectedOffice}
        onSave={handleSaveOffice}
      />
    </div>
  );
}
