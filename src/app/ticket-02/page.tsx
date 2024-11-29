"use client";
import Calendar from "@/modules/trip/components/Calendar";
import SelectRoute from "@/modules/route/components/SelectRoute";
import ListTrip from "@/modules/trip/components/ListTrip";
import { useRef, useState } from "react";
import { getStorage_CompanyId } from "@/lib/cookie";
import useRouteNames from "@/modules/route/hook/useRouteNames";
import { RouteNameData } from "@/modules/route/types/RouteNameData";
import useTrips from "@/modules/trip/hook/useTrips";
import LoadingIndicator from "@/lib/Loading";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, CircularProgress, Tab, Typography } from "@mui/material";
import { TripData } from "@/modules/trip/types/TripData";
import { AddCircleOutline, History, Delete, FileDownloadDone, Print, ExpandMore, EventNote } from "@mui/icons-material";
import '../../modules/trip/style/TripDetail.css'
import { formatToDate_NgayTN } from "@/lib/dateUtils";
import ModalTrip from "@/modules/trip/components/ModalTrip";
import { NewTripData } from "@/modules/trip/types/NewTripData";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TicketMap from "@/modules/booking_v1/components/TicketMap";
import PassengerList from "@/modules/booking_v1/components/PassengerList";
import PickupDropoff from "@/modules/booking_v1/components/PickupDropoff";
import Transfer from "@/modules/booking_v1/components/Transfer";
import Acceptance from "@/modules/booking_v1/components/Acceptance";
import Cargo from "@/modules/booking_v1/components/Cargo";

export default function TicketPage() {
  const companyId = Number(getStorage_CompanyId());

  const {
    routesName,
    loading: routeLoading,
    error: routeError,
  } = useRouteNames(companyId);

  const [selectedRoute, setSelectedRoute] = useState<{
    id: number;
    routeName: string;
  } | null>(null);

  const handleRouteSelect = (route: RouteNameData) => {
    setSelectedRoute(route);
    setSelectedTrip(null);
    // console.log("Tuyến đường được chọn:", route);
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // console.log("Ngày được chọn:", date);
  };
  const [selectedTrip, setSelectedTrip] = useState<TripData | null>(null);
  const {
    trips,
    loading: tripsLoading,
    error: tripsError,
    deleteTrip,
    createTrip,
  } = useTrips(companyId, selectedRoute?.id || null, selectedDate);
  const handleCancelTrip = async () => {

    if (selectedTrip) {
      await deleteTrip(selectedTrip.id);
    }
    // console.log("Trip cancelled:", selectedTrip);
  };

  const handleTripSelect = async (trip: TripData) => {
    setSelectedTrip(trip);
    // console.log("Chuyến đi được chọn:", trip);
  };
  // Bấm Button hôm nay thì dữ liệu của thẻ input chọn ngày hiện về ngày hôm nay
  const calendarRef = useRef<{ setToday: () => void } | null>(null);
  const handleTodayClick = () => {
    if (calendarRef.current) {
      calendarRef.current.setToday();
      // console.log("Đã chuyển về hôm nay");
    }
  };

  // Modal Trip
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleSaveTrip = async (tripData: NewTripData) => {
    await createTrip(tripData);
    // console.log('New trip data:', tripData);
  };

  // Tab
  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };



  return (
    <>
      <div className="flex fixed bg-white w-screen top-[62px] px-2   py-2 z-50">
        <div>
          <button
            className="rounded bg-blue-500 px-5 py-[4.7px] text-white hover:bg-blue-700"
            onClick={handleTodayClick}
          >
            Hôm nay
          </button>
        </div>
        <div className="mx-4 rounded-md">
          <Calendar ref={calendarRef} onDateChange={handleDateChange} />
        </div>
        <div>
          {routeLoading ? (
            <CircularProgress size="30px" />
          ) : (
            <SelectRoute
              routeName={routesName}
              onSelectRoute={handleRouteSelect}
            />
          )}
          {routeError && <p>Error: {routeError}</p>}
        </div>
      </div>

      <div className="mt-6 bg-slate-200 p-1">
        {tripsLoading && (
          <div
            style={{
              position: "absolute",
              transform: "translateX(-50%)",
              left: "50%",
            }}
          >
            <LoadingIndicator />
          </div>
        )}
        {!trips.length && tripsError && <p>Error: {tripsError}</p>}
        <ListTrip
          trips={trips}
          selectedRoute={selectedRoute?.id || 0}
          selectedDate={selectedDate}
          onTripSelect={handleTripSelect}
          onAddTrip={handleOpenModal}
        />


      </div>
      <section className="mt-3 px-2">
        {selectedTrip ? (
          <div>
            <div>
              <Button size="small" variant="outlined" startIcon={<Print />}>
                In phơi
              </Button>
              <Button size="small" variant="outlined" startIcon={<History />}>
                Lịch sử
              </Button>
              <Button size="small" variant="outlined" startIcon={<FileDownloadDone />}>
                Xuất bến
              </Button>
              <Button size="small" variant="outlined" color="error" startIcon={<Delete />} onClick={handleCancelTrip} disabled={!selectedTrip}>
                Hủy chuyến
              </Button>
              <Button size="small" variant="outlined" color="secondary" startIcon={<AddCircleOutline />}>
                Thêm hàng
              </Button>
            </div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>
                  <span className="font-semibold">{selectedTrip.timeDeparture.substring(0, 5)} • {formatToDate_NgayTN(selectedDate ? selectedDate.toDateString() : '')} • {selectedRoute?.routeName}</span>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <span className="font-semibold text-[14px]">Biển số: </span>
                      <span className="font-medium text-[#0072bc] text-[15px]">{selectedTrip?.licensePlate || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[14px]">Tài xế: </span>
                      <span className="font-medium text-[#0072bc] text-[15px]">{selectedTrip?.driversDetail.join(", ") || 'N/A'} </span>
                    </div>
                    <div>
                      <span className="font-semibold text-[14px]">Số điện thoại xe: </span>
                      <span className="font-medium text-[#0072bc] text-[15px]">{selectedTrip?.phoneVehicle || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[14px]">Tổng vé: </span>
                      <span>{selectedTrip?.cargo || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-2">
                    <div>
                      <span className="font-semibold text-[14px]">Loại xe: </span>
                      <span className="font-medium text-[#0072bc] text-[15px]">{selectedTrip.seatingChartName}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[14px]">Phụ xe: </span>
                      <span className="font-medium text-[#0072bc] text-[15px]">{selectedTrip.assistantDetail.join(", ") || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[14px]">Tiền vé: </span>
                      <span>{selectedTrip?.totalTickets || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-[14px]">Tiền hàng: </span>
                      <span>{selectedTrip?.cargo || 'N/A'}</span>
                    </div>
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <div className="mt-2">
              <EventNote color="primary" />
              <span className="font-semibold text-[#0072bc] text-[15px] ml-2">{selectedTrip.note || ''}</span>
            </div>


            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Sơ đồ ghế" value="1" />
                    <Tab label="Hành khách" value="2" />
                    <Tab label="Đón/ Trả" value="3" />
                    <Tab label="Trung chuyển" value="4" />
                    <Tab label="Nghiệm thu" value="5" />
                    <Tab label="Hàng hóa" value="6" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <TicketMap tripId={selectedTrip.id} />
                </TabPanel>
                <TabPanel value="2">
                  <PassengerList tripId={selectedTrip.id} />
                </TabPanel>
                <TabPanel value="3">
                  <PickupDropoff tripId={selectedTrip.id} />
                </TabPanel>
                <TabPanel value="4">
                  <Transfer tripId={selectedTrip.id} />
                </TabPanel>
                <TabPanel value="5">
                  <Acceptance tripId={selectedTrip.id} />
                </TabPanel>
                <TabPanel value="6">
                  <Cargo tripId={selectedTrip.id} />
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        ) : null}
      </section>

      <ModalTrip
        open={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTrip}
        selectedDate={selectedDate}
        selectedRoute={selectedRoute?.id || 0}
      />
    </>
  );
}
