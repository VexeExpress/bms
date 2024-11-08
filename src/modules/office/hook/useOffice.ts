import { useEffect, useState } from "react";
import { OfficeData } from "../types/OfficeData";
import {
  createOfficeByCompanyId,
  deleteOfficeById,
  getListOfficeByCompanyId,
  updateOfficeById,
} from "../api/officeAPI";
import { NewOfficeData } from "../types/NewOfficeData";
import axios from "axios";
import Toast from "@/lib/Toast";

const useOffice = (companyId: number) => {
  const [offices, setOffices] = useState<OfficeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchOffice = async () => {
      setLoading(true);
      try {
        const response = await getListOfficeByCompanyId(companyId);
        setOffices(response.data);
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
      fetchOffice();
    }
  }, [companyId]);

  const createOffice = async (newOfficeData: NewOfficeData) => {
    try {
      const createdOffice = await createOfficeByCompanyId(
        companyId,
        newOfficeData,
      );
      setOffices((prevOffices) => [...prevOffices, createdOffice]);
      Toast.success("Tạo văn phòng mới thành công");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { status } = err.response;
        switch (status) {
          case 422:
            Toast.error("Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại.");
            break;
          case 409:
            Toast.error("Văn phòng đã tồn tại trong công ty.");
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
        Toast.error("Không thể tạo văn phòng mới. Vui lòng thử lại.");
        setError("Không thể tạo văn phòng mới. Vui lòng thử lại.");
      }
    }
  };

  const updateOffice = async (officeId: number, updatedData: OfficeData) => {
    try {
      const updatedOffice = await updateOfficeById(officeId, updatedData);
      setOffices((prevOffices) =>
        prevOffices.map((office) =>
          office.id === officeId ? { ...office, ...updatedOffice } : office,
        ),
      );
      Toast.info("Cập nhật văn phòng thành công");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        switch (err.response?.status) {
          case 404:
            Toast.error("Không tìm thấy dữ liệu văn phòng đã cho.");
            break;
          case 400:
            Toast.error("Dữ liệu cập nhật không hợp lệ.");
            break;
          case 500:
            setError("Lỗi hệ thống, vui lòng thử lại sau.");
            Toast.error("Lỗi hệ thống khi cập nhật văn phòng.");
            break;
          default:
            setError("Có lỗi xảy ra, vui lòng thử lại.");
            Toast.error("Không thể cập nhật văn phòng.");
        }
      } else {
        setError("Lỗi không xác định.");
        Toast.error("Có lỗi xảy ra trong quá trình cập nhật.");
      }
    }
  };
  const deleteOffice = async (officeId: number) => {
    try {
      await deleteOfficeById(officeId);
      setOffices((prevOffices) =>
        prevOffices.filter((office) => office.id !== officeId),
      );
      Toast.info("Xóa văn phòng thành công");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          Toast.error("Không tìm thấy văn phòng.");
        } else if (err.response?.status === 500) {
          Toast.error("Lỗi hệ thống, vui lòng thử lại sau.");
        } else {
          setError("Không thể xóa văn phòng.");
          Toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
        }
      } else {
        setError("Không thể xóa văn phòng.");
        Toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
      }
    }
  };

  return { offices, loading, error, createOffice, updateOffice, deleteOffice };
};
export default useOffice;
