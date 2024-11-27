"use client";
import Calendar from "@/modules/trip/components/Calendar";
import SelectRoute from "@/modules/route/components/SelectRoute";
import ListTrip from "@/modules/trip/components/ListTrip";
import { useRef } from "react";
import useRoute from "@/modules/route/hook/useRoute";
import { getStorage_CompanyId } from "@/lib/cookie";

export default function TicketPage() {
  const companyId = Number(getStorage_CompanyId());
  const { routesName } = useRoute(companyId);
  console.log("List Route:" + routesName);
  // const [selectedRoute, setSelectedRoute] = useState<{
  //   id: number;
  //   name: string;
  // } | null>(null);
  // const handleRouteSelect = (route: { id: number; routeName: string }) => {
  //   setSelectedRoute(route);
  //   console.log("Tuyến đường được chọn:", route);
  // };
  // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  // const handleDateChange = (date: Date | null) => {
  //   setSelectedDate(date);
  //   console.log("Ngày được chọn:", date);
  // };
  const calendarRef = useRef<{ setToday: () => void } | null>(null);
  const handleTodayClick = () => {
    if (calendarRef.current) {
      calendarRef.current.setToday();
      console.log("Đã chuyển về hôm nay");
    }
  };

  return (
    <>
      <div className="mt-[-15px] flex">
        <div>
          <button
            className="rounded bg-blue-500 px-5 py-[4.7px] font-bold text-white hover:bg-blue-700"
            onClick={handleTodayClick}
          >
            Hôm nay
          </button>
        </div>
        {/* <div className="mx-4 rounded-md">
          <Calendar ref={calendarRef} onDateChange={handleDateChange} />
        </div> */}
        {/* <div>
          <SelectRoute
            routesName={routesName}
            onSelectRoute={handleRouteSelect}
          />
        </div> */}
        <div className="mx-4">
          <button
            className="rounded bg-blue-500 px-5 py-[4.7px] font-bold text-white hover:bg-blue-700"
            onClick={handleTodayClick}
          >
            Tăng cường chuyến
          </button>
        </div>
      </div>
      <div className="mt-2">
        <ListTrip />
      </div>
    </>
  );
}
