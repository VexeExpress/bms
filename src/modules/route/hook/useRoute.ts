import { useEffect, useState } from "react";
import { RouteNameData } from "../types/RouteNameData";
import { getRouteNameByCompanyId } from "../api/routeAPI";

const useRoute = (companyId: number) => {
  const [routesName, setRoutesName] = useState<RouteNameData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    const fetchRouteName = async () => {
      setLoading(true);
      try {
        const response = await getRouteNameByCompanyId(companyId);
        setRoutesName(response);
        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    if (companyId) {
      fetchRouteName();
    }
  }, [companyId]);
  return { routesName, loading, error };
};
export default useRoute;
