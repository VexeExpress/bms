import { useEffect, useState } from "react";
import { LicensePlateData } from "../types/LicensePlateData";
import { getListLicensePlateByCompanyId } from "../api/vehicleAPI";

const useLicensePlate = (companyId: number) => {
  const [licensePlate, setLicensePlate] = useState<LicensePlateData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSeatingChartName = async () => {
      setLoading(true);
      try {
        const data = await getListLicensePlateByCompanyId(companyId);
        setLicensePlate(data);
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
      fetchSeatingChartName();
    }
  }, [companyId]);

  return {
    licensePlate,
    loading,
    error,
  };
};

export default useLicensePlate;
