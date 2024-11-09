import { useEffect, useState } from "react";
import { RouteData } from "../types/RouteData";
import {
  createRouteByCompanyId,
  deleteRouteById,
  getListRouteByCompanyId,
  updateRouteById,
} from "../api/routeAPI";
import { NewRouteData } from "../types/NewRouteData";
import Toast from "@/lib/Toast";
import axios from "axios";

const useRoute = (companyId: number) => {
  const [route, setRoute] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchRoute = async () => {
      setLoading(true);
      try {
        const response = await getListRouteByCompanyId(companyId);
        setRoute(response.data);
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
      fetchRoute();
    }
  }, [companyId]);

  const createRoute = async (newData: NewRouteData) => {
    try {
      const createRoute = await createRouteByCompanyId(companyId, newData);
      setRoute((prevRoute) => [...prevRoute, createRoute]);
      Toast.success("Tạo tuyến mới thành công");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { status } = err.response;
        switch (status) {
          case 422:
            Toast.error("Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại.");
            break;
          case 409:
            Toast.error("Tuyến đã tồn tại trong công ty.");
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
        Toast.error("Không thể tạo dữ liệu mới. Vui lòng thử lại.");
        setError("Không thể tạo dữ liệu mới. Vui lòng thử lại.");
      }
    }
  };

  const updateRoute = async (routeId: number, updatedData: RouteData) => {
    try {
      const updateRoute = await updateRouteById(routeId, updatedData);
      setRoute((prevRoute) =>
        prevRoute.map((route) =>
          route.id === routeId ? { ...route, ...updateRoute } : route,
        ),
      );
      Toast.info("Cập nhật tuyến thành công");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 404:
            Toast.error("Không tìm thấy dữ liệu tuyến đã cho.");
            break;
          case 400:
            Toast.error("Dữ liệu cập nhật không hợp lệ.");
            break;
          case 500:
            setError("Lỗi hệ thống, vui lòng thử lại sau.");
            Toast.error("Lỗi hệ thống khi cập nhật tuyến");
            break;
          default:
            setError("Có lỗi xảy ra, vui lòng thử lại.");
            Toast.error("Không thể cập nhật tuyến.");
        }
      } else {
        setError("Lỗi không xác định.");
        Toast.error("Có lỗi xảy ra trong quá trình cập nhật.");
      }
    }
  };
  const deleteRoute = async (routeId: number) => {
    try {
      await deleteRouteById(routeId);
      setRoute((prevRoute) =>
        prevRoute.filter((route) => route.id !== routeId),
      );
      Toast.info("Xóa tuyến thành công");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          Toast.error("Không tìm thấy tuyến.");
        } else if (err.response?.status === 500) {
          Toast.error("Lỗi hệ thống, vui lòng thử lại sau.");
        } else {
          setError("Không thể xóa tuyến.");
          Toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
        }
      } else {
        setError("Không thể xóa tuyến.");
        Toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    }
  };

  return {
    route,
    loading,
    error,
    createRoute,
    updateRoute,
    deleteRoute,
  };
};
export default useRoute;
