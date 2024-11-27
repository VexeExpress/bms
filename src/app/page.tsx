"use client";
import FormLogin from "@/modules/auth/components/FormLogin";
import useLogin from "@/modules/auth/hook/useLogin";
import Image from "next/image";

export default function Home() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    loading,
    errorMessage,
    handleLogin,
  } = useLogin();
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex h-[30vh] w-full flex-col items-center justify-center bg-white shadow-lg md:h-screen md:w-[30%]">
        <div className="text-center">
          <div className="m-0 mb-5 max-w-[280px]">
            <Image
              src="/static/logo-2.png"
              alt="Logo App"
              layout="responsive"
              width={270}
              height={120}
            />
          </div>
        </div>

        <div className="mt-5 text-center">
          <span className="font-rounded text-[16px] font-semibold text-[#0072bc]">
            Chúc bạn có một ngày làm việc hiệu quả!
          </span>
        </div>
        <FormLogin
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          errorMessage={errorMessage}
          loading={loading}
          handleLogin={handleLogin}
        />
        <div className="m-5 text-center">
          <span className="p-5 font-rounded text-[12px] italic text-[#0a2e5c]">
            Liên hệ Hotline: 0877 71 7575 nếu gặp sự cố đăng nhập
          </span>
        </div>
      </div>
      <div className="h-[70vh] w-full bg-amber-200 md:h-screen md:w-[70%]">
        2
      </div>
    </div>
  );
}
