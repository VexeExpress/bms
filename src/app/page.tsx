export default function Home() {
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="flex h-[30vh] w-full flex-col items-center justify-center bg-white shadow-lg md:h-screen md:w-[30%]">
        <div className="text-center">
          <div className="m-0 max-w-[320px]">
            <img src="/static/logo.png" alt="Logo App" width={250} />
          </div>
        </div>
        <div className="mt-5 text-center">
          <span className="text-[18px] font-semibold text-[#0072bc] font-rounded">
            Chúc bạn có một ngày làm việc hiệu quả!
          </span>
        </div>
        {/*LoginForm*/}
        <div className="m-5 text-center">
          <span className="p-5 text-[12px] italic text-[#0a2e5c] font-rounded">
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
