import { useState } from "react";
import { login } from "../api/authAPI";
import Toast from "@/lib/Toast";
import { AxiosError } from "axios";
import { setStorage_CompanyId, setStorage_CompanyName, setStorage_EmployeeId, setStorage_FullName } from "@/lib/cookie";
async function fetchIPAddress() {
  const ipResponse = await fetch("https://api.ipify.org?format=json");
  const ipData = await ipResponse.json();
  return ipData.ip;
}
function getBrowserName() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  return "Unknown Browser";
}
function getOperatingSystem() {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Win")) return "Windows";
  if (userAgent.includes("Mac")) return "Mac OS";
  if (userAgent.includes("Linux")) return "Linux";
  if (/Android/i.test(userAgent)) return "Android";
  if (/iOS|iPhone|iPad/i.test(userAgent)) return "iOS";
  return "Unknown OS";
}

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    if (!username || !password) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin!");
      setLoading(false);
      return;
    }
    try {
      const ipAddress = await fetchIPAddress();
      const browserName = getBrowserName();
      const operatingSystem = getOperatingSystem();

      const response = await login(
        username,
        password,
        ipAddress,
        browserName,
        operatingSystem,
      );
      if (response.status === 200) {
        const responseData = await response.data;
        setStorage_EmployeeId(responseData.id);
        setStorage_FullName(responseData.fullName);
        setStorage_CompanyId(responseData.companyId);
        setStorage_CompanyName(responseData.companyName);
        Toast.success("Đăng nhập thành công!");
      } else {
        switch (response.status) {
          case 400:
            setErrorMessage("Vui lòng kiểm tra lại thông tin đăng nhập!");
            Toast.error("Vui lòng kiểm tra lại thông tin đăng nhập!");
            break;
          default:
            setErrorMessage("Đã xảy ra lỗi không xác định.");
            Toast.error("Đã xảy ra lỗi không xác định.");
        }
      }
    } catch (error: unknown) {
      console.error("Error logging in:", error);

      if (error instanceof AxiosError && error.response) {
        switch (error.response.status) {
          case 400:
            Toast.error("Vui lòng kiểm tra lại thông tin đăng nhập!");
            break;
          case 401:
            Toast.error("Mật khẩu không đúng!");
            break;
          case 403:
            Toast.error("Tài khoản của bạn đã bị khóa.");
            break;
          case 404:
            Toast.error("Tài khoản không tồn tại.");
            break;
          case 423:
            Toast.error("Công ty của bạn đã bị khóa.");
            break;
          case 500:
            Toast.error("Lỗi hệ thống. Vui lòng thử lại sau.");
            break;
          default:
            Toast.error("Đã xảy ra lỗi không xác định.");
        }
      } else {
        setErrorMessage("Lỗi kết nối. Vui lòng kiểm tra mạng và thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };
  return {
    username,
    password,
    setUsername,
    setPassword,
    errorMessage,
    loading,
    handleLogin,
  };
};
export default useLogin;
