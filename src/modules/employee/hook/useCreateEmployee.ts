import { useState } from "react";
import Toast from "@/lib/Toast";
import { addEmployee } from "../api/employeeAPI";
import { getStorage_CompanyId } from "@/lib/cookie";

const useCreateEmployee = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [startDate, setStartDate] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [accessBms, setBms] = useState(false);
  const [accessCms, setCms] = useState(false);
  const [accessTms, setTms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    const employeeData = {
      accessTms,
      accessBms,
      accessCms,
      fullName,
      phone,
      role,
      startDate,
      birthDate,
      gender,
      email,
      address,
      username,
      password,
      status,
      companyId: Number(getStorage_CompanyId()),
    };

    try {
      await addEmployee(employeeData);
      Toast.success("Thêm thành công");
    } catch (error) {
      console.error("Error submitting employee data:", error);
      Toast.error("Lỗi hệ thống. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return {
    accessBms,
    setBms,
    accessCms,
    setCms,
    accessTms,
    setTms,
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
  };
};

export default useCreateEmployee;
