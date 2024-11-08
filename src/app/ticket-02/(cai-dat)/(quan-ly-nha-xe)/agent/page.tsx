"use client";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function AgentPage() {
  return (
    <div className="bg-white p-0">
      <div className="mb-10 flex items-center justify-between">
        <span className="m-0 text-[20px] font-semibold text-black">
          Danh sách văn phòng
        </span>
        <Button variant="contained" startIcon={<Add />}>
          Thêm nhân viên
        </Button>
      </div>

      {/* {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : error ? (
        <p>Error loading employees: {error}</p>
      ) : (
        <TableLoginHistory data={loginHistory} />
      )} */}
    </div>
  );
}
