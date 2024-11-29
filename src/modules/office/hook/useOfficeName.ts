import { useState, useEffect } from "react";
import { OfficeNameData } from "../types/OfficeNameData";
import { getOfficeNameByCompanyId } from "../api/officeAPI";


const useOfficeName = (companyId: number) => {
    const [officeName, setOfficeName] = useState<OfficeNameData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchOfficeName = async () => {
            setLoading(true);
            try {
                const response = await getOfficeNameByCompanyId(companyId);
                setOfficeName(response);
                setLoading(false);
            } catch (error: unknown) {
                setError("Failed to fetch office names");
                setLoading(false);
            }
        };
        fetchOfficeName();
    }, [companyId]);

    return { officeName, loading, error };
};

export default useOfficeName;