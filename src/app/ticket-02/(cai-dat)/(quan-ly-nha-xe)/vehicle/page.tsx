"use client";
import { getStorage_CompanyId } from "@/lib/cookie";
import LoadingIndicator from "@/lib/Loading";
import ModalVehicle from "@/modules/vehicle/components/ModalVehicle";
import TableVehicle from "@/modules/vehicle/components/TableVehicle";
import useVehicle from "@/modules/vehicle/hook/useVehicle";
import { NewVehicleData } from "@/modules/vehicle/types/NewVehicleData";
import { VehicleData } from "@/modules/vehicle/types/VehicleData";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

export default function VehiclePage() {
  const companyId = Number(getStorage_CompanyId());
  const {
    vehicles,
    loading,
    error,
    updateVehicle,
    deleteVehicle,
    createVehicle,
  } = useVehicle(companyId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleData | null>(
    null,
  );
  const handleAddVehicleClick = () => {
    setModalMode("create");
    setSelectedVehicle(null);
    setIsModalOpen(true);
  };
  const handleEdit = (office: VehicleData) => {
    setModalMode("edit");
    setSelectedVehicle(office);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (officeId: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa phương tiện này?",
    );
    if (isConfirmed) {
      deleteVehicle(officeId);
    }
  };
  // const handleSaveVehicle = async (vehicleData: VehicleData) => {
  //   if (modalMode === "create") {
  //     console.log("Saving new vehicle:", vehicleData);
  //     await createVehicle(vehicleData);
  //   } else if (modalMode === "edit") {
  //     console.log("Updating vehicle:", vehicleData);
  //     await updateVehicle(vehicleData.id, vehicleData);
  //   }
  //   handleCloseModal();
  // };
  const handleSaveVehicle = async (
    vehicleData: VehicleData | NewVehicleData,
  ) => {
    if (modalMode === "create") {
      const newVehicle: NewVehicleData = {
        ...vehicleData,
      };
      console.log("Saving new vehicle:", newVehicle);
      await createVehicle(newVehicle);
    } else if (modalMode === "edit" && (vehicleData as VehicleData).id) {
      const updatedVehicle: VehicleData = vehicleData as VehicleData;
      console.log("Updating vehicle:", updatedVehicle);
      await updateVehicle(updatedVehicle.id, updatedVehicle);
    }
    handleCloseModal();
  };
  return (
    <div className="bg-white p-0">
      <div className="mb-10 flex items-center justify-between">
        <span className="m-0 text-[20px] font-semibold text-black">
          Danh sách phương tiện
        </span>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddVehicleClick}
        >
          Thêm phương tiện
        </Button>
      </div>

      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : error ? (
        <p>Error loading vehicle: {error}</p>
      ) : (
        <TableVehicle
          data={vehicles}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      <ModalVehicle
        open={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        vehicleData={selectedVehicle}
        onSave={handleSaveVehicle}
      />
    </div>
  );
}
