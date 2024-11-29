import { useEffect, useState } from "react";
import { TripData } from "../types/TripData";
import {
  createTripAPI,
  deleteTripAPI,
  getTripsByCompanyIdAndRouteIdAndDate,
} from "../api/tripAPI";
import { format } from "date-fns";
import Toast from "@/lib/Toast";
import { NewTripData } from "../types/NewTripData";

const useTrips = (
  companyId: number,
  selectedRouteId: number | null,
  selectedDate: Date | null,
) => {
  const [trips, setTrips] = useState<TripData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchTrips = async () => {
      if (selectedRouteId === null || selectedDate === null) return;

      setLoading(true);
      try {
        const dateDeparture = format(selectedDate, "yyyy-MM-dd");
        const response = await getTripsByCompanyIdAndRouteIdAndDate(
          companyId,
          selectedRouteId,
          dateDeparture,
        );
        console.log(dateDeparture);
        setTrips(response);
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

    fetchTrips();
  }, [companyId, selectedRouteId, selectedDate]);

  const deleteTrip = async (tripId: number) => {
    try {
      await deleteTripAPI({ id: tripId });
      setTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      Toast.success("Xóa chuyến đi thành công");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Toast.error(error.message);
      } else {
        Toast.error("Đã xảy ra lỗi");
      }
    }
  };
  const createTrip = async (newTripData: NewTripData) => {
    try {
      const response = await createTripAPI(newTripData);
      console.log("Data response:", response);
      setTrips((prevTrips) => [...prevTrips, response]);
      Toast.success("Tạo chuyến thành công");
    } catch (error: unknown) {
      if (error instanceof Error) {
        Toast.error(error.message);
      } else {
        Toast.error("Đã xảy ra lỗi");
      }
    }
  };

  return {
    trips,
    loading,
    error,
    deleteTrip,
    createTrip,
  };
};
export default useTrips;
