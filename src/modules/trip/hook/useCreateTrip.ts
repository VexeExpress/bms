import { useState } from "react";
import Toast from "@/lib/Toast";
import { NewTripData } from "../types/NewTripData";
import { createTripAPI } from "../api/tripAPI";

const useCreateTrip = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const createTrip = async (newTripData: NewTripData) => {
    setLoading(true);
    setError("");

    try {
      const newTrip = await createTripAPI(newTripData);
      Toast.success("Tạo chuyến mới thành công");
      return newTrip;
    } catch (err) {
      const errorMessage =
        (err as Error)?.message || "Không thể tạo chuyến. Vui lòng thử lại.";
      Toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createTrip,
    loading,
    error,
  };
};

export default useCreateTrip;
