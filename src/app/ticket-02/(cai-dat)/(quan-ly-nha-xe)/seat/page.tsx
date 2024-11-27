"use client";
import { getStorage_CompanyId } from "@/lib/cookie";
import LoadingIndicator from "@/lib/Loading";
import ModalSeatingChart from "@/modules/seating_chart/components/ModalSeatingChart";
import TableSeatingChart from "@/modules/seating_chart/components/TableSeatingChart";
import useSeatingChart from "@/modules/seating_chart/hook/useSeatingChart";
import { NewSeatingChartData } from "@/modules/seating_chart/types/NewSeatingChartData";
import { SeatingChartData } from "@/modules/seating_chart/types/SeatingChartData";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

export default function SeatPage() {
  const companyId = Number(getStorage_CompanyId());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedSeat, setSelectedSeat] = useState<
    SeatingChartData | undefined
  >(undefined);

  const {
    seatingChart,
    loading,
    error,
    createSeatingChart,
    updateSeatingChart,
    deleteSeatingChart,
  } = useSeatingChart(companyId);
  const handleAddSeatClick = () => {
    setModalMode("create");
    setSelectedSeat(undefined);
    setIsModalOpen(true);
  };
  const handleDelete = (seatingChartId: number) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa sơ đồ ghế này?",
    );
    if (isConfirmed) {
      deleteSeatingChart(seatingChartId);
    }
  };
  const handleEdit = (seatingChart: SeatingChartData) => {
    setModalMode("edit");
    setSelectedSeat(seatingChart);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveSeatingChart = async (
    seatingChartData: NewSeatingChartData | SeatingChartData,
  ) => {
    if (modalMode === "create") {
      console.log("Create: " + JSON.stringify(seatingChartData, null, 2));
      await createSeatingChart(seatingChartData as NewSeatingChartData);
    } else if (modalMode === "edit" && selectedSeat?.id !== undefined) {
      console.log("Update: " + JSON.stringify(seatingChartData, null, 2));
      await updateSeatingChart(
        selectedSeat.id,
        seatingChartData as SeatingChartData,
      );
    }
    setIsModalOpen(false);
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
          onClick={handleAddSeatClick}
        >
          Thêm sơ đồ ghế
        </Button>
      </div>

      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : error ? (
        <p>Error loading seating chart: {error}</p>
      ) : (
        <TableSeatingChart
          data={seatingChart}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
      <ModalSeatingChart
        open={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        seatingChartData={selectedSeat}
        onSave={handleSaveSeatingChart}
      />
    </div>
  );
}
