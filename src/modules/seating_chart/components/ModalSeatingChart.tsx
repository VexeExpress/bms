import { useEffect, useState } from "react";
import { NewSeatingChartData } from "../types/NewSeatingChartData";
import { SeatingChartData } from "../types/SeatingChartData";
import {
    Box,
    Button,
    Grid,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import s from "../style/SeatingChart.module.css";
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    maxHeight: "80vh",
    overflowY: "auto",
};
interface ModalSeatingChartProps {
    open: boolean;
    onClose: () => void;
    mode: "create" | "edit";
    seatingChartData?: SeatingChartData;
    onSave: (data: NewSeatingChartData | SeatingChartData) => void;
}
const ModalSeatingChart = ({
    open,
    onClose,
    mode,
    seatingChartData,
    onSave,
}: ModalSeatingChartProps) => {
    const [seatingChartName, setSeatingChartName] = useState("");
    const [floor, setFloor] = useState(1);
    const [column, setColumn] = useState(1);
    const [row, setRow] = useState(1);
    ///
    const [seatNames, setSeatNames] = useState<{ [key: string]: string }>({});
    const [seatStatus, setSeatStatus] = useState<{ [key: string]: boolean }>({});
    useEffect(() => {
        if (mode === "edit" && seatingChartData) {
            setSeatingChartName(seatingChartData.seatingChartName);
            setFloor(seatingChartData.totalFloors);
            setRow(seatingChartData.totalRows);
            setColumn(seatingChartData.totalColumns);
            const seatNames: { [key: string]: string } = {};
            const seatStatus: { [key: string]: boolean } = {};
            seatingChartData.seats.forEach((seat) => {
                seatNames[seat.seatCode] = seat.seatName;
                seatStatus[seat.seatCode] = seat.seatStatus;
            });
            setSeatNames(seatNames);
            setSeatStatus(seatStatus);
        } else {
            setSeatingChartName("");
            setFloor(1);
            setRow(1);
            setColumn(1);
            setSeatNames({});
            setSeatStatus({});
        }
    }, [mode, seatingChartData]);

    const handleSave = () => {
        const seats = Object.keys(seatNames).map((key) => {
            const [floor, row, column] = key.split("-").map(Number);
            return {
                seatCode: key,
                seatName: seatNames[key],
                seatStatus: seatStatus[key] || false,
                floor,
                row,
                column,
            };
        });
        if (mode === "create") {
            const newSeatingChart: NewSeatingChartData = {
                seatingChartName,
                seats,
                totalFloors: floor,
                totalRows: row,
                totalColumns: column,
            };
            console.log("New Seating Chart:", newSeatingChart);
            onSave(newSeatingChart);
        } else if (mode === "edit" && seatingChartData) {
            const updatedSeatingChart: SeatingChartData = {
                ...seatingChartData,
                seatingChartName,
                seats,
                totalFloors: floor,
                totalRows: row,
                totalColumns: column,
            };
            console.log("Updated Seating Chart:", updatedSeatingChart);
            onSave(updatedSeatingChart);
        }
        // onClose();
    };
    const handleSeatNameChange = (key: string, value: string) => {
        setSeatNames((prev) => ({ ...prev, [key]: value }));
    };
    const handleSeatStatusChange = (key: string) => {
        setSeatStatus((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const renderSeatingChart = () => {
        const charts = [];
        for (let f = 0; f < floor; f++) {
            const chart = [];
            for (let r = 0; r < row; r++) {
                const columns = [];
                for (let c = 0; c < column; c++) {
                    const key = `${f}-${r}-${c}`;
                    columns.push(
                        <div key={key} className={s.seat_item}>
                            <input
                                type="text"
                                value={seatNames[key] || ""}
                                onChange={(e) => handleSeatNameChange(key, e.target.value)}
                                className={`font-rounded text-black ${s.seat_input}`}
                                required
                                placeholder={`${r + 1}-${c + 1}`}
                            />
                            <input
                                type="checkbox"
                                id={`checkbox-${key}`}
                                className={s.custom_checkbox}
                                checked={seatStatus[key] || false}
                                onChange={() => handleSeatStatusChange(key)}
                            />
                            <label htmlFor={`checkbox-${key}`}></label>
                        </div>,
                    );
                }
                chart.push(
                    <div key={`${f}-${r}`} className={s.seat_row}>
                        {columns}
                    </div>,
                );
            }
            charts.push(
                <div key={f} className={s.seating_chart}>
                    <Typography variant="h6" className={s.chart_title}>
                        Tầng {f + 1}
                    </Typography>
                    {chart}
                </div>,
            );
        }
        return charts;
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
                        <span className="font-rounded text-black">
                            {mode === "create" ? "Thêm sơ đồ ghế mới" : "Chỉnh sửa sơ đồ ghế"}
                        </span>
                    </Typography>
                    <div className="mb-10 mt-5">
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={6}>
                                <label
                                    htmlFor="seatingChartName"
                                    className="block font-rounded font-semibold text-black"
                                >
                                    Tên sơ đồ ghế
                                </label>
                                <TextField
                                    id="seatingChartName"
                                    value={seatingChartName}
                                    onChange={(e) => setSeatingChartName(e.target.value)}
                                    fullWidth
                                    size="small"
                                    className="font-rounded"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <label
                                    htmlFor="phone"
                                    className="block font-rounded font-semibold text-black"
                                >
                                    Số tầng
                                </label>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={floor}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => setFloor(Number(e.target.value))}
                                >
                                    {[...Array(3)].map((_, index) => (
                                        <MenuItem key={index + 1} value={index + 1}>
                                            {index + 1} tầng
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <label
                                    htmlFor="color"
                                    className="block font-rounded font-semibold text-black"
                                >
                                    Số cột
                                </label>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={column}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => setColumn(Number(e.target.value))}
                                >
                                    {[...Array(15)].map((_, index) => (
                                        <MenuItem key={index + 1} value={index + 1}>
                                            {index + 1} cột
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2}>
                                <label
                                    htmlFor="note"
                                    className="block font-rounded font-semibold text-black"
                                >
                                    Số hàng
                                </label>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={row}
                                    fullWidth
                                    size="small"
                                    onChange={(e) => setRow(Number(e.target.value))}
                                >
                                    {[...Array(20)].map((_, index) => (
                                        <MenuItem key={index + 1} value={index + 1}>
                                            {index + 1} hàng
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="mt-5">{renderSeatingChart()}</div>

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
                            {mode === "create" ? "Lưu" : "Cập nhật"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};
export default ModalSeatingChart;
