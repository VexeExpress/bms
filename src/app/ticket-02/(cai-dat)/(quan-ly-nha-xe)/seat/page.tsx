"use client"
import ModalSeatMap from "@/modules/seat/components/ModalSeatMap";
import { NewSeatMap } from "@/modules/seat/types/NewSeatMap";
import { SeatMap } from "@/modules/seat/types/SeatMapData";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

export default function SeatPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedSeatMap, setSelectedSeatMap] = useState<SeatMap | null>(
    null,
  );
  const handleAddSeatMapClick = () => {
    setModalMode("create");
    setSelectedSeatMap(null);
    setIsModalOpen(true);
  };
  const handleEdit = (office: SeatMap) => {
    setModalMode("edit");
    setSelectedSeatMap(office);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // const handleDelete = (officeId: number) => {
  //   const isConfirmed = window.confirm(
  //     "Bạn có chắc chắn muốn xóa phương tiện này?",
  //   );
  //   if (isConfirmed) {
  //     deleteVehicle(officeId);
  //   }
  // };
  const handleSaveSeatMap = async (
    seatMapData: SeatMap | NewSeatMap,
  ) => {
    if (modalMode === "create") {
      const newSeatMap: NewSeatMap = {
        ...seatMapData,
      };
      console.log("Saving new newSeatMap:", newSeatMap);
      await createVehicle(newSeatMap);
    } else if (modalMode === "edit" && (seatMapData as SeatMap).id) {
      const updatedSeatMap: SeatMap = seatMapData as SeatMap;
      console.log("Updating updatedSeatMap:", updatedSeatMap);
      await updateVehicle(updatedSeatMap.id, updatedSeatMap);
    }
    handleCloseModal();
  };
  return (
    <div className="bg-white p-0">
      <div className="mb-10 flex items-center justify-between">
        <span className="m-0 text-[20px] font-semibold text-black">
          Danh sách sơ đồ ghế
        </span>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddSeatMapClick}
        >
          Thêm sơ đồ ghế
        </Button>
      </div>

      {/* {loading ? (
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
    /> */}
      <ModalSeatMap
        open={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        seatMapData={selectedSeatMap}
        onSave={handleSaveSeatMap}
      />
    </div>
  );
}
