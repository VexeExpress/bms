/* eslint-disable react/jsx-no-undef */
"use client";
import { Add } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AllEmployeesTable } from "@/modules/employee/components/Table/AllEmployeesTable";
import { EmployeeTable } from "@/modules/employee/components/Table/EmployeeTable";
import { DriverTable } from "@/modules/employee/components/Table/DriverTable";
import { AssistantTable } from "@/modules/employee/components/Table/AssistantTable";
export default function EmployeeManagementPage() {
  const [value, setValue] = useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const router = useRouter();
  const handleBtnClick = () => {
    router.push("/ticket-02/employee-management/create");
  };
  return (
    <div className="bg-white p-0">
      <div className="mb-2 flex items-center justify-between">
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
      <Box sx={{ width: "100%", typography: "body1" }} className="mt-6">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="Employee">
              <Tab label="Tất cả" value="1" />
              <Tab label="Nhân viên" value="2" />
              <Tab label="Tài xế" value="3" />
              <Tab label="Phụ xe" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <AllEmployeesTable />
          </TabPanel>
          <TabPanel value="2">
            <EmployeeTable />
          </TabPanel>
          <TabPanel value="3">
            <DriverTable />
          </TabPanel>
          <TabPanel value="4">
            <AssistantTable />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
