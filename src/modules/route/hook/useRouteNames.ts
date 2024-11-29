import { useEffect, useState } from "react";
import { getRouteNameByCompanyId } from "../api/routeAPI";
import { RouteNameData } from "../types/RouteNameData";

const useRouteNames = (companyId: number) => {
  const [routesName, setRouteNames] = useState<RouteNameData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchRouteNames = async () => {
      setLoading(true);
      try {
        const data = await getRouteNameByCompanyId(companyId);
        setRouteNames(data);
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
      fetchRouteNames();
    }
  }, [companyId]);

  return {
    routesName,
    loading,
    error,
  };
};

export default useRouteNames;
