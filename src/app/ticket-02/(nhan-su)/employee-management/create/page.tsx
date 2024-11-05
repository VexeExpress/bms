"use client";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useCreateEmployee from "@/modules/employee/hook/useCreateEmployee";
import LoadingIndicator from "@/lib/Loading";
export default function CreateEmployeePage() {
  const {
    fullName,
    setFullName,
    phone,
    setPhone,
    role,
    setRole,
    startDate,
    setStartDate,
    birthDate,
    setBirthDate,
    gender,
    setGender,
    email,
    setEmail,
    address,
    setAddress,
    username,
    setUsername,
    password,
    setPassword,
    status,
    setStatus,
    loading,
    handleSubmit,
  } = useCreateEmployee();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toggleDetails = () => {
    setOpen(!open);
  };
  const handleClear = () => {
    setFullName("");
    setPhone("");
    setRole("");
    setStartDate("");
    setBirthDate("");
    setGender("");
    setEmail("");
    setAddress("");
    setUsername("");
    setPassword("");
    setStatus("");
  };
  const handleBack = () => {
    router.back();
  };

  if (loading) return <LoadingIndicator />;

  return (
    <form onSubmit={handleSubmit} className="bg-white">
      <div className="mb-2 flex items-center justify-between">
        <span className="m-0 text-[20px] font-semibold text-black">
          Thêm nhân viên
        </span>
      </div>
      <div className="mt-10 flex">
        <div className="mr-10 w-1/2 space-y-6">
          <span className="font-semibold">Thông tin cá nhân</span>
          <div>
            <label htmlFor="name" className="mb-2 block font-medium text-black">
              Họ và tên
            </label>
            <TextField
              id="fullName"
              variant="outlined"
              size="small"
              required
              className="w-full"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block font-medium text-black"
            >
              Số điện thoại
            </label>
            <TextField
              id="phone"
              variant="outlined"
              size="small"
              required
              className="w-full"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="role" className="mb-2 block font-medium text-black">
              Chức vụ
            </label>
            <Select
              labelId="role"
              id="demo-simple-select"
              value={role}
              size="small"
              required
              className="w-full"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value={1}>Nhân viên</MenuItem>
              <MenuItem value={2}>Tài xế </MenuItem>
              <MenuItem value={3}>Phụ xe</MenuItem>
            </Select>
          </div>
          <div>
            <div
              onClick={toggleDetails}
              className="cursor-pointer items-center justify-between p-4"
            >
              <span className="cursor-pointer text-[#0072bc]">
                Thông tin chi tiết
              </span>
              {open ? (
                <ExpandLess className="mb-1 text-[#0072bc]" />
              ) : (
                <ExpandMore className="mb-1 text-[#0072bc]" />
              )}
            </div>
            {open && (
              <div className="flex flex-wrap">
                <div className="w-1/2 p-2">
                  <label
                    htmlFor="input1"
                    className="mb-2 block font-medium text-black"
                  >
                    Ngày bắt đầu làm việc
                  </label>
                  <TextField
                    id="input1"
                    variant="outlined"
                    size="small"
                    type="date"
                    className="w-full"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="w-1/2 p-2">
                  <label
                    htmlFor="input2"
                    className="mb-2 block font-medium text-black"
                  >
                    Ngày sinh
                  </label>
                  <TextField
                    id="input2"
                    variant="outlined"
                    size="small"
                    type="date"
                    className="w-full"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
                <div className="w-1/2 p-2">
                  <label
                    htmlFor="input3"
                    className="mb-2 block font-medium text-black"
                  >
                    Giới tính
                  </label>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    value={gender}
                    size="small"
                    className="w-full"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value={1}>Nam</MenuItem>
                    <MenuItem value={2}>Nữ</MenuItem>
                    <MenuItem value={3}>Khác</MenuItem>
                  </Select>
                </div>
                <div className="w-1/2 p-2">
                  <label
                    htmlFor="input4"
                    className="mb-2 block font-medium text-black"
                  >
                    Email
                  </label>
                  <TextField
                    id="input4"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-10 w-full p-2">
                  <label
                    htmlFor="input4"
                    className="mb-2 block font-medium text-black"
                  >
                    Địa chỉ
                  </label>
                  <TextField
                    id="address"
                    variant="outlined"
                    size="small"
                    className="w-full"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 space-y-6">
          <span className="font-semibold">Tài khoản</span>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block font-medium text-black"
            >
              Tài khoản
            </label>
            <TextField
              id="username"
              variant="outlined"
              size="small"
              required
              className="w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block font-medium text-black"
            >
              Mật khẩu
            </label>
            <TextField
              id="password"
              variant="outlined"
              size="small"
              required
              className="w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="mb-2 block font-medium text-black"
            >
              Trạng thái
            </label>
            <Select
              labelId="status"
              id="demo-simple-select"
              value={status}
              size="small"
              required
              className="w-full"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value={1}>Hoạt động</MenuItem>
              <MenuItem value={2}>Ngưng hoạt động</MenuItem>
            </Select>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-full bg-white p-4">
        <div className="flex justify-end">
          <Button type="submit" variant="contained">
            Hoàn tất
          </Button>
          <Button variant="outlined" className="mx-5" onClick={handleBack}>
            Trở về
          </Button>
          <Button variant="text" onClick={handleClear}>
            Xoá trắng
          </Button>
        </div>
      </div>
    </form>
  );
}
