import { useEffect, useState } from "react";
import { fetchEmployees } from "../api/employeeAPI";

const useEmployees = (companyId: number) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getEmployees = async () => {
      try {
        const data = await fetchEmployees(companyId);
        console.log("Fetched employees:", data);
        setEmployees(data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      getEmployees();
    }
  }, [companyId]);

  return { employees, loading, error };
};

export default useEmployees;
