"use client";
import { getStorage_CompanyId } from "@/lib/cookie";
import LoadingIndicator from "@/lib/Loading";
import ModalRoute from "@/modules/route/components/ModalRoute";
import TableRoute from "@/modules/route/components/TableRoute";
import useRoute from "@/modules/route/hook/useRoute";
import { RouteData } from "@/modules/route/types/RouteData";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";

export default function RoutePage() {
  const companyId = Number(getStorage_CompanyId());
  const { route, loading, error, updateRoute, deleteRoute, createRoute } =
    useRoute(companyId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selecteRoute, setSelecteRoute] = useState<RouteData | null>(null);
  const handleAddRouteClick = () => {
    setModalMode("create");
    setSelecteRoute(null);
    setIsModalOpen(true);
  };
  const handleEdit = (route: RouteData) => {
    setModalMode("edit");
    setSelecteRoute(route);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDelete = (routeId: number) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa tuyến này?");
    if (isConfirmed) {
      deleteRoute(routeId);
    }
  };
  const handleSaveRoute = async (routeData: RouteData) => {
    if (modalMode === "create") {
      console.log("Saving new route:", routeData);
      await createRoute(routeData);
    } else if (modalMode === "edit") {
      console.log("Updating route:", routeData);
      await updateRoute(routeData.id, routeData);
    }
    handleCloseModal();
  };
  return (
    <div className="bg-white p-0">
      <div className="mb-10 flex items-center justify-between">
        <span className="m-0 text-[20px] font-semibold text-black">
          Danh sách tuyến
        </span>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddRouteClick}
        >
          Thêm tuyến
        </Button>
      </div>

      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : error ? (
        <p>Error loading route: {error}</p>
      ) : (
        <TableRoute data={route} onDelete={handleDelete} onEdit={handleEdit} />
      )}
      <ModalRoute
        open={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
        routeData={selecteRoute}
        onSave={handleSaveRoute}
      />
    </div>
  );
}
