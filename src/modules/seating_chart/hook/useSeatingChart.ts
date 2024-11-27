import { useEffect, useState } from "react";
import { SeatingChartData } from "../types/SeatingChartData";
import { NewSeatingChartData } from "../types/NewSeatingChartData";
import {
  createSeatingChartAPI,
  deleteSeatingChartAPI,
  getListSeatChartByCompanyId,
  updateSeatingChartAPI,
} from "../api/apiSeatingChart";
import Toast from "@/lib/Toast";

const useSeatingChart = (companyId: number) => {
  const [seatingChart, setSeatingChart] = useState<SeatingChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchSeatingChart = async () => {
      setLoading(true);
      try {
        const response = await getListSeatChartByCompanyId(companyId);
        setSeatingChart(response.data);
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
      fetchSeatingChart();
    }
  }, [companyId]);
  const createSeatingChart = async (newSeatingChart: NewSeatingChartData) => {
    setLoading(true);
    try {
      console.log("Create data: " + JSON.stringify(newSeatingChart, null, 2));
      const data = await createSeatingChartAPI(newSeatingChart, companyId);
      setSeatingChart((prev) => [...prev, data]);
      setLoading(false);
      Toast.success("Tạo sơ đồ ghế thành công");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        Toast.error("Tạo sơ đồ ghế thất bại");
      } else {
        setError("Đã xảy ra lỗi");
        Toast.error("Tạo sơ đồ ghế thất bại");
      }
      setLoading(false);
    }
  };
  const updateSeatingChart = async (
    seatChartId: number,
    updatedData: SeatingChartData,
  ) => {
    setLoading(true);
    try {
      const data = await updateSeatingChartAPI(seatChartId, updatedData);
      setSeatingChart((prev) =>
        prev.map((chart) => (chart.id === seatChartId ? data : chart)),
      );
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
  const deleteSeatingChart = async (seatChartId: number) => {
    setLoading(true);
    try {
      await deleteSeatingChartAPI(seatChartId);
      setSeatingChart((prev) =>
        prev.filter((chart) => chart.id !== seatChartId),
      );
      setLoading(false);
      Toast.success("Xóa sơ đồ ghế thành công");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        Toast.error("Xóa sơ đồ ghế thất bại");
      } else {
        setError("Đã xảy ra lỗi");
        Toast.error("Xóa sơ đồ ghế thất bại");
      }
      setLoading(false);
    }
  };
  return {
    seatingChart,
    loading,
    error,
    createSeatingChart,
    updateSeatingChart,
    deleteSeatingChart,
  };
};
export default useSeatingChart;
