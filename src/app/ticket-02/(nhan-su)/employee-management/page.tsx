/* eslint-disable react/jsx-no-undef */
"use client";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

import { useRouter } from "next/navigation";
import { AllEmployeesTable } from "@/modules/employee/components/AllEmployeesTable";

export default function EmployeeManagementPage() {

  const router = useRouter();
  const handleBtnClick = () => {
    router.push("/ticket-02/employee-management/create");
  };
  return (
    <div className="bg-white p-0">
      <div className="mb-10 flex items-center justify-between">
        <span className="m-0 text-[20px] font-semibold text-black">
          Danh sách nhân viên
        </span>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleBtnClick}
        >
          Thêm nhân viên
        </Button>
      </div>

      <AllEmployeesTable/>
    </div>
  );
}
