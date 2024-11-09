import { useEffect, useState } from "react";
import { VehicleData } from "../types/VehicleData";
import {
  createVehicleByCompanyId,
  deleteVehicleById,
  getListVehicleByCompanyId,
  updateVehicleById,
} from "../api/vehicleAPI";
import { NewVehicleData } from "../types/NewVehicleData";
import Toast from "@/lib/Toast";
import axios from "axios";

const useVehicle = (companyId: number) => {
  const [vehicles, setVehicles] = useState<VehicleData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      try {
        const response = await getListVehicleByCompanyId(companyId);
        setVehicles(response.data);
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

  const createVehicle = async (newVehicleData: NewVehicleData) => {
    try {
      const createdVehicle = await createVehicleByCompanyId(
        companyId,
        newVehicleData,
      );
      setVehicles((prevVehicles) => [...prevVehicles, createdVehicle]);
      Toast.success("Tạo phương tiện mới thành công");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { status } = err.response;
        switch (status) {
          case 422:
            Toast.error("Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại.");
            break;
          case 409:
            Toast.error("Phương tiện đã tồn tại trong công ty.");
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
        Toast.error("Không thể tạo phương tiện mới. Vui lòng thử lại.");
        setError("Không thể tạo phương tiện mới. Vui lòng thử lại.");
      }
    }
  };

  const updateVehicle = async (vehicleId: number, updatedData: VehicleData) => {
    try {
      const updatedVehicle = await updateVehicleById(vehicleId, updatedData);
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.id === vehicleId
            ? { ...vehicle, ...updatedVehicle }
            : vehicle,
        ),
      );
      Toast.info("Cập nhật phương tiện thành công");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 404:
            Toast.error("Không tìm thấy dữ liệu phương tiện đã cho.");
            break;
          case 400:
            Toast.error("Dữ liệu cập nhật không hợp lệ.");
            break;
          case 500:
            setError("Lỗi hệ thống, vui lòng thử lại sau.");
            Toast.error("Lỗi hệ thống khi cập nhật phương tiện");
            break;
          default:
            setError("Có lỗi xảy ra, vui lòng thử lại.");
            Toast.error("Không thể cập nhật phương tiện.");
        }
      } else {
        setError("Lỗi không xác định.");
        Toast.error("Có lỗi xảy ra trong quá trình cập nhật.");
      }
    }
  };
  const deleteVehicle = async (vehicleId: number) => {
    try {
      await deleteVehicleById(vehicleId);
      setVehicles((prevVehicles) =>
        prevVehicles.filter((vehicle) => vehicle.id !== vehicleId),
      );
      Toast.info("Xóa phương tiện thành công");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          Toast.error("Không tìm thấy phương tiện.");
        } else if (err.response?.status === 500) {
          Toast.error("Lỗi hệ thống, vui lòng thử lại sau.");
        } else {
          setError("Không thể xóa phương tiện.");
          Toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
        }
      } else {
        setError("Không thể xóa phương tiện.");
        Toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    }
  };

  return {
    vehicles,
    loading,
    error,
    createVehicle,
    updateVehicle,
    deleteVehicle,
  };
};
export default useVehicle;
