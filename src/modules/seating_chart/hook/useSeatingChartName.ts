import { useEffect, useState } from "react";
import { getListSeatingChartNameByCompanyId } from "../api/apiSeatingChart";
import { SeatingChartName } from "../types/SeatingChartName";

const useSeatingChartName = (companyId: number) => {
  const [seatingChartName, setSeatingChartName] = useState<SeatingChartName[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSeatingChartName = async () => {
      setLoading(true);
      try {
        const data = await getListSeatingChartNameByCompanyId(companyId);
        setSeatingChartName(data);
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
    seatingChartName,
    loading,
    error,
  };
};

export default useSeatingChartName;
