import {
    Box,
    Button,
    Checkbox,
    Grid,
    ListItemText,
    MenuItem,
    Modal,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import { NewTripData } from "../types/NewTripData";
import { useEffect, useState } from "react";
import m from "../style/ModalTrip.module.css";
import useRouteNames from "@/modules/route/hook/useRouteNames";
import { getStorage_CompanyId } from "@/lib/cookie";
import LoadingLinear from "@/lib/LinearIndeterminate";
import useSeatingChartName from "@/modules/seating_chart/hook/useSeatingChartName";
import useLicensePlate from "@/modules/vehicle/hook/useLicensePlate";
import useEmployeeAvailable from "@/modules/employee/hook/useEmployeeAvailable";
import "../style/ModalTrip.css";
import { formatToDate } from "@/lib/dateUtils";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

type ModalTripProps = {
    open: boolean;
    onClose: () => void;
    onSave: (tripData: NewTripData) => void;
    selectedDate: Date | null;
    selectedRoute: number;
};
const ModalTrip = ({
    open,
    onClose,
    onSave,
    selectedRoute,
    selectedDate,
}: ModalTripProps) => {
    const companyId = Number(getStorage_CompanyId());
    const {
        routesName,
        loading: routeLoading,
        error: routeError,
    } = useRouteNames(companyId);
    const {
        seatingChartName,
        loading: seatingChartLoading,
        error: seatingChartError,
    } = useSeatingChartName(companyId);
    const {
        licensePlate,
        loading: licensePlateLoading,
        error: licensePlateError,
    } = useLicensePlate(companyId);
    const {
        drivers,
        assistants,
        loading: loadingEmployee,
        error: errorEmployee,
    } = useEmployeeAvailable(companyId);

    const [routeId, setRouteId] = useState<number | null>(null);
    const [vehicleId, setVehicleId] = useState<number | null>(null);
    const [seatingChartId, setSeatingChartId] = useState<number | null>(null);
    const [driverIds, setDriverIds] = useState<number[]>([]);
    const [assistantIds, setAssistantIds] = useState<number[]>([]);
    const [timeDeparture, setTimeDeparture] = useState<string>("");
    const [dateDeparture, setDateDeparture] = useState<string>(
        selectedDate ? selectedDate.toString().split("T")[0] : "",
    );

    const [note, setNote] = useState<string>("");
    const formatDateForDisplay = (date: Date) => {
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    const [timeDepartureError, setTimeDepartureError] = useState<string | null>(
        null,
    );
    const [seatChartError, setSeatingChartError] = useState<string | null>(null);
    const [dateDepartureError, setDateDepartureError] = useState<string | null>(
        null,
    );

    useEffect(() => {
        if (selectedRoute) {
            setRouteId(Number(selectedRoute));
        }
        if (selectedDate) {
            console.log(dateDeparture)
            const newDateDeparture = selectedDate.toString().split("T")[0];
            setDateDeparture(newDateDeparture);
            setDateDepartureError(null);
        }
    }, [selectedRoute, selectedDate]);
    const handleChangeDriver = (event: SelectChangeEvent<typeof driverIds>) => {
        const {
            target: { value },
        } = event;
        setDriverIds(
            typeof value === "string" ? value.split(",").map(Number) : value,
        );
    };
    const handleChangeAssistant = (
        event: SelectChangeEvent<typeof assistantIds>,
    ) => {
        const {
            target: { value },
        } = event;
        setAssistantIds(
            typeof value === "string" ? value.split(",").map(Number) : value,
        );
    };

    const handleSave = () => {
        if (!selectedDate) {
            setDateDepartureError("Chưa có ngày khởi hành.");
            return;
        }
        if (!timeDeparture) {
            setTimeDepartureError("Vui lòng chọn giờ xuất bến.");
            return;
        }
        if (!seatingChartId) {
            setSeatingChartError("Vui lòng chọn sơ đồ ghế.");
            return;
        }
        setSeatingChartError(null);
        setTimeDepartureError(null);
        setDateDepartureError(null);
        const newTripData: NewTripData = {
            companyId,
            routeId: routeId ?? null,
            vehicleId: vehicleId ?? null,
            seatChartId: seatingChartId ?? null,
            driverIds,
            assistantIds,
            timeDeparture,
            dateDeparture: formatToDate(selectedDate),
            note,
        };

        onSave(newTripData);
        onClose();
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <span className="font-rounded text-black">Tăng cường chuyến</span>
                    </Typography>
                    <div className="mb-10 mt-5">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={6}>
                                <label
                                    htmlFor="routeName"
                                    className="block font-rounded font-semibold text-black"
                                >
                                    Tuyến {selectedRoute}
                                </label>
                                <Select
                                    labelId="routeName"
                                    id="demo-simple-select"
                                    fullWidth
                                    size="small"
                                    value={routeId}
                                    onChange={(e) => setRouteId(Number(e.target.value))}
                                    className="font-rounded"
                                >
                                    {routeLoading ? (
                                        <MenuItem>
                                            <LoadingLinear />
                                        </MenuItem>
                                    ) : (
                                        routesName.map((route) => (
                                            <MenuItem
                                                key={route.id}
                                                value={route.id}
                                                className="font-rounded"
                                            >
                                                {route.routeName}
                                            </MenuItem>
                                        ))
                                    )}
                                    {routeError && (
                                        <MenuItem disabled>Error: {routeError}</MenuItem>
                                    )}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <label className="block font-rounded font-semibold text-black">
                                    Ngày khởi hành
                                </label>
                                <div className="font-rounded">
                                    <p style={{ marginTop: "7px" }} className="text-black">
                                        {selectedDate
                                            ? formatDateForDisplay(new Date(selectedDate))
                                            : ""}
                                    </p>
                                </div>
                                {dateDepartureError && (
                                    <div className="mt-1 font-rounded text-xs text-red-500">
                                        {dateDepartureError}
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <label
                                    htmlFor="displayPrice"
                                    className="block font-rounded font-semibold text-black"
                                >
                                    Giờ xuất bến
                                </label>
                                <input
                                    type="time"
                                    className={m.input}
                                    value={timeDeparture}
                                    onChange={(e) => {
                                        setTimeDeparture(e.target.value);
                                        setTimeDepartureError(null);
                                    }}
                                />
                                {timeDepartureError && (
                                    <div className="mt-1 font-rounded text-xs text-red-500">
                                        {timeDepartureError}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className="mt-5">
                            <Grid item xs={12} sm={6} md={6}>
                                <label
                                    htmlFor="routeName"
                                    className="block font-rounded font-semibold text-black"
                                >
                                    Xe
                                </label>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth
                                    size="small"
                                    value={vehicleId || ""}
                                    onChange={(e) => setVehicleId(Number(e.target.value))}
                                    className="font-rounded"
                                >
                                    {licensePlateLoading ? (
                                        <MenuItem>
                                            <LoadingLinear />
                                        </MenuItem>
                                    ) : (
                                        licensePlate.map((lp) => (
                                            <MenuItem
                                                key={lp.id}
                                                value={lp.id}
                                                className="font-rounded"
                                            >
                                                {lp.licensePlate}
                                            </MenuItem>
                                        ))
                                    )}
                                    {licensePlateError && (
                                        <MenuItem disabled>Error: {licensePlateError}</MenuItem>
                                    )}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6}>
                                <label
                                    htmlFor="routeName"
                                    className="block font-rounded font-semibold text-black"
                                >
                                    Sơ đồ ghế
                                </label>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    fullWidth
                                    size="small"
                                    value={seatingChartId || ""}
                                    onChange={(e) => {
                                        setSeatingChartId(Number(e.target.value));
                                        setSeatingChartError(null);
                                    }}
                                    className="font-rounded"
                                >
                                    {seatingChartLoading ? (
                                        <MenuItem>
                                            <LoadingLinear />
                                        </MenuItem>
                                    ) : (
                                        seatingChartName.map((seatChart) => (
                                            <MenuItem
                                                key={seatChart.id}
                                                value={seatChart.id}
                                                className="font-rounded"
                                            >
                                                {seatChart.seatingChartName}
                                            </MenuItem>
                                        ))
                                    )}
                                    {seatingChartError && (
                                        <MenuItem disabled>Error: {seatingChartError}</MenuItem>
                                    )}
                                </Select>
                                {seatChartError && (
                                    <div className="mt-1 font-rounded text-xs text-red-500">
                                        {seatChartError}
                                    </div>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className="mt-5">
                            <label
                                htmlFor="routeName"
                                className="block font-rounded font-semibold text-black"
                            >
                                Tài xế
                            </label>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={driverIds}
                                onChange={handleChangeDriver}
                                renderValue={(selected) =>
                                    selected
                                        .map(
                                            (id) =>
                                                drivers.find((driver) => driver.id === id)?.fullName,
                                        )
                                        .join(", ")
                                }
                                MenuProps={MenuProps}
                                fullWidth
                                size="small"
                            >
                                {loadingEmployee ? (
                                    <MenuItem>
                                        <LoadingLinear />
                                    </MenuItem>
                                ) : (
                                    drivers.map((driver) => (
                                        <MenuItem
                                            key={driver.id}
                                            value={driver.id}
                                            className="font-rounded"
                                        >
                                            <Checkbox
                                                checked={driverIds.includes(driver.id)}
                                                className="font-rounded"
                                            />
                                            <ListItemText
                                                primary={driver.fullName}
                                                className="font-rounded"
                                            />
                                        </MenuItem>
                                    ))
                                )}
                                {errorEmployee && (
                                    <MenuItem disabled>Error: {errorEmployee}</MenuItem>
                                )}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className="mt-5">
                            <label
                                htmlFor="routeName"
                                className="block font-rounded font-semibold text-black"
                            >
                                Phụ xe
                            </label>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={assistantIds}
                                onChange={handleChangeAssistant}
                                renderValue={(selected) =>
                                    selected
                                        .map(
                                            (id) =>
                                                assistants.find((assistant) => assistant.id === id)
                                                    ?.fullName,
                                        )
                                        .join(", ")
                                }
                                MenuProps={MenuProps}
                                fullWidth
                                size="small"
                            >
                                {assistants.map((assistant) => (
                                    <MenuItem key={assistant.id} value={assistant.id}>
                                        <Checkbox checked={assistantIds.includes(assistant.id)} />
                                        <ListItemText primary={assistant.fullName} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} className="mt-5">
                            <label
                                htmlFor="note"
                                className="block font-rounded font-semibold text-black"
                            >
                                Ghi chú
                            </label>
                            <textarea
                                name="note"
                                id="note"
                                className={m.input}
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                            ></textarea>
                        </Grid>
                    </div>

                    <Box
                        sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
                    >
                        <Button
                            onClick={onClose}
                            variant="outlined"
                            sx={{ marginRight: 1 }}
                        >
                            Hủy
                        </Button>
                        <Button onClick={handleSave} variant="contained">
                            Lưu
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};
export default ModalTrip;
