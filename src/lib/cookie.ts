import Cookies from "js-cookie";

// Hàm để lưu riêng biệt dữ liệu vào cookies
export const setStorage_EmployeeId = (employeeId: string) => {
  Cookies.set("employeeId", employeeId, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
};

export const setStorage_FullName = (fullName: string) => {
  Cookies.set("fullName", fullName, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
};

export const setStorage_CompanyId = (companyId: string) => {
  Cookies.set("companyId", companyId, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
};

export const setStorage_CompanyName = (companyName: string) => {
  Cookies.set("companyName", companyName, {
    expires: 1,
    secure: true,
    sameSite: "Strict",
  });
};

// Hàm để lấy riêng biệt dữ liệu từ cookies
export const getStorage_EmployeeId = () => {
  return Cookies.get("employeeId");
};

export const getStorage_FullName = () => {
  return Cookies.get("fullName");
};

export const getStorage_CompanyId = () => {
  return Cookies.get("companyId");
};

export const getStorage_CompanyName = () => {
  return Cookies.get("companyName");
};

// Hàm để xóa riêng biệt dữ liệu khỏi cookies
export const removeEmployeeId = () => {
  Cookies.remove("employeeId");
};

export const removeFullName = () => {
  Cookies.remove("fullName");
};

export const removeCompanyId = () => {
  Cookies.remove("companyId");
};

export const removeCompanyName = () => {
  Cookies.remove("companyName");
};

// Hàm để kiểm tra xem dữ liệu có tồn tại không
export const hasEmployeeId = () => {
  return Cookies.get("employeeId") !== undefined;
};

export const hasFullName = () => {
  return Cookies.get("fullName") !== undefined;
};

export const hasCompanyId = () => {
  return Cookies.get("companyId") !== undefined;
};

export const hasCompanyName = () => {
  return Cookies.get("companyName") !== undefined;
};
