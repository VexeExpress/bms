"use client";
import { getStorage_CompanyId } from "@/lib/cookie";
import LoadingIndicator from "@/lib/Loading";
import TableLoginHistory from "@/modules/login_history/components/TableLoginHistory";
import useLoginHistory from "@/modules/login_history/hook/useLoginHistory";

export default function DeviceLoginPage() {
  const companyId = Number(getStorage_CompanyId());
  const { loginHistory, loading, error } = useLoginHistory(companyId);
  return (
    <div className="bg-white p-0">
      <div className="mb-10 flex items-center justify-between">
        <span className="m-0 text-[20px] font-semibold text-black">
          Thiết bị đăng nhập
        </span>
      </div>

      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : error ? (
        <p>Error loading employees: {error}</p>
      ) : (
        <TableLoginHistory data={loginHistory} />
      )}
    </div>
  );
}
