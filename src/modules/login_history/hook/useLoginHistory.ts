import { useEffect, useState } from "react";
import { LoginHistory } from "../types/LoginHistory";
import { getLoginHistory } from "../api/loginHistoryAPI";

const useLoginHistory = (companyId: number) => {
  const [loginHistory, setLoginHistory] = useState<LoginHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchLoginHistory = async () => {
      setLoading(true);
      try {
        const response = await getLoginHistory(companyId);
        setLoginHistory(response.data);
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
      fetchLoginHistory();
    }
  }, [companyId]);

  return { loginHistory, loading, error };
};

export default useLoginHistory;
