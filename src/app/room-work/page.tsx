"use client"
import { getStorage_CompanyId, getStorage_CompanyName, getStorage_EmployeeId, getStorage_FullName, getStorage_OfficeId, setStorage_OfficeId } from "@/lib/cookie";
import LoadingIndicator from "@/lib/Loading";
import useOfficeName from "@/modules/office/hook/useOfficeName";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function RoomWorkPage() {
  const companyId = Number(getStorage_CompanyId());
  const { officeName, loading, error } = useOfficeName(companyId);
  const [selectedOffice, setSelectedOffice] = useState("");
  const router = useRouter();

  const handleOfficeChange = (event: SelectChangeEvent<string>) => {
    setSelectedOffice(event.target.value as string);
  };

  const handleContinue = () => {
    setStorage_OfficeId(selectedOffice);
    router.push("/ticket-02");
  };
  const userId = Number(getStorage_EmployeeId());
  const userName = getStorage_FullName();
  const companyName = getStorage_CompanyName();
  const officeId = getStorage_OfficeId();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <img src="/static/logo-2.png" alt="App Logo" className="mb-8 w-[400px]" />
      <h2 className="text-[20px] font-semibold text-[#0072bc] mb-4">Lựa chọn văn phòng làm việc</h2>
      <Select
        value={selectedOffice}
        onChange={handleOfficeChange}
        displayEmpty
        className="mb-4 w-full max-w-xs font-rounded"
      >
        <MenuItem value="" disabled className="font-rounded">
          Chọn văn phòng
        </MenuItem>
        {loading ? (
          <MenuItem disabled style={{ height: '100px' }}>
            <LoadingIndicator />
          </MenuItem>
        ) : error ? (
          <MenuItem disabled className="text-red-500 font-rounded">
            Lỗi hệ thống. Vui lòng đăng nhập lại
          </MenuItem>
        ) : (
          officeName.map((office) => (
            <MenuItem key={office.id} value={office.id} className="font-rounded">
              {office.officeName}
            </MenuItem>
          ))
        )}
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleContinue}
        disabled={!selectedOffice}
        className="w-full max-w-xs font-rounded"
      >
        Bắt đầu làm việc
      </Button>
    </div>
  );
}


