import { useEffect, useState } from "react";
import {
  getAssistantByCompanyId,
  getDriverByCompanyId,
} from "../api/employeeAPI";
import { AssistantData } from "../types/AssistantData";
import { DriverData } from "../types/DriverData";

const useEmployeeAvailable = (companyId: number) => {
  const [drivers, setDrivers] = useState<DriverData[]>([]);
  const [assistants, setAssistants] = useState<AssistantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getDrivers = async () => {
      try {
        const data = await getDriverByCompanyId(companyId);
        console.log("Fetched drivers:", data);
        setDrivers(data);
      } catch (err) {
        console.error("Failed to fetch drivers:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    const getAssistants = async () => {
      try {
        const data = await getAssistantByCompanyId(companyId);
        console.log("Fetched assistants:", data);
        setAssistants(data);
      } catch (err) {
        console.error("Failed to fetch assistants:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      getDrivers();
      getAssistants();
    }
  }, [companyId]);

  return { drivers, assistants, loading, error };
};

export default useEmployeeAvailable;
