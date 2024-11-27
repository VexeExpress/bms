import { useEffect, useState } from "react";
import { SeatMapData } from "../types/SeatMapData";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { SeatData } from "../types/SeatData";
import style from "../style/SeatMap.module.css";
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  maxHeight: "80%",
  overflowY: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalSeatMapProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SeatMapData, initialData?: SeatMapData) => void;
  initialData: SeatMapData | null;
}

const ModalSeatMap: React.FC<ModalSeatMapProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<SeatMapData>({
    mode: "onTouched",
  });
  const [floor, setSelectedFloor] = useState(1);
  const [row, setSelectedRow] = useState(1);
  const [column, setSelectedColumn] = useState(1);
  const [seats, setSeats] = useState<SeatData[]>([]);
  useEffect(() => {
    if (open) {
      console.log("Modal opened. Initial data:", initialData);
      if (initialData) {
        setValue("seatMapName", initialData.seatMapName || "");
        setValue("floor", initialData.floor || 1);
        setValue("row", initialData.row || 1);
        setValue("column", initialData.column || 1);

        setSelectedFloor(initialData.floor || 1);
        setSelectedRow(initialData.row || 1);
        setSelectedColumn(initialData.column || 1);

        setSeats(initialData.seats || []);
      } else {
        reset();
        setSeats([]);
      }
    }
  }, [open, initialData, setValue, reset]);
  const handleClose = () => {
    reset();
    onClose();
  };
  const onSubmitForm = (data: SeatMapData) => {
    const completeData = {
      ...data,
      seats: seats,
    };
    console.log("Submitting form:", completeData);
    onSubmit(completeData, initialData ?? undefined);
    handleClose();
  };

  const renderSeatMap = () => {
    const seatMaps = [];

    for (let f = 0; f < floor; f++) {
      const floorSeats = [];
      for (let i = 0; i < row; i++) {
        const rowSeats = [];
        for (let j = 0; j < column; j++) {
          const seatKey = `Tầng ${f + 1} Ghế ${i + 1}-${j + 1}`;

          const existingSeat = seats.find(
            (seat) =>
              seat.floor === f + 1 &&
              seat.row === i + 1 &&
              seat.column === j + 1,
          );

          rowSeats.push(
            <div key={`${seatKey}`} className={style.seat_card}>
              <input
                type="text"
                className="font-rounded font-semibold"
                placeholder="Tên ghế"
                required
                value={existingSeat ? existingSeat.name : ""}
                onChange={(e) => {
                  const seatData: SeatData = {
                    floor: f + 1,
                    row: i + 1,
                    column: j + 1,
                    name: e.target.value,
                    status: existingSeat ? existingSeat.status : false,
                  };

                  setSeats((prevSeats) => {
                    const updatedSeats = [...prevSeats];
                    const index = updatedSeats.findIndex(
                      (seat) =>
                        seat.floor === seatData.floor &&
                        seat.row === seatData.row &&
                        seat.column === seatData.column,
                    );
                    if (index > -1) {
                      updatedSeats[index] = {
                        ...updatedSeats[index],
                        name: seatData.name,
                      };
                    } else {
                      updatedSeats.push(seatData);
                    }
                    return updatedSeats;
                  });
                }}
              />

              <div className={style.toggle_container}>
                <span className={`font-rounded ${style.toggle_labe}`}>
                  Kích hoạt
                </span>
                <label className={style.toggle_switch}>
                  <input
                    type="checkbox"
                    checked={existingSeat ? existingSeat.status : false}
                    onChange={(e) => {
                      console.log("Checked status:", e.target.checked);
                      const newStatus = e.target.checked;
                      const seatData: SeatData = {
                        floor: f + 1,
                        row: i + 1,
                        column: j + 1,
                        name: existingSeat ? existingSeat.name : "",
                        status: newStatus,
                      };

                      setSeats((prevSeats) => {
                        const updatedSeats = [...prevSeats];
                        const index = updatedSeats.findIndex(
                          (seat) =>
                            seat.floor === seatData.floor &&
                            seat.row === seatData.row &&
                            seat.column === seatData.column,
                        );
                        if (index > -1) {
                          updatedSeats[index] = {
                            ...updatedSeats[index],
                            status: newStatus,
                          };
                        } else {
                          updatedSeats.push(seatData);
                        }
                        return updatedSeats;
                      });
                    }}
                    className={style.check}
                  />
                </label>
              </div>
            </div>,
          );
        }
        floorSeats.push(
          <div
            key={`floor-${f}-row-${i}`}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {rowSeats}
          </div>,
        );
      }
      seatMaps.push(
        <div key={`floor-${f}`} style={{ margin: "20px 0" }}>
          <h4>{`Tầng ${f + 1}`}</h4>
          {floorSeats}
        </div>,
      );
    }
    return seatMaps;
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styleModal}>
        <span className="text-[20px] text-blue-500">
          {initialData ? "Cập nhật thông tin sơ đồ ghế" : "Thêm sơ đồ ghế mới"}
        </span>
        <form onSubmit={handleSubmit(onSubmitForm)} className="mt-5">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6}>
              <label
                htmlFor="seatMapName"
                className="block font-rounded font-semibold text-black"
              >
                Tên sơ đồ
              </label>

              <TextField
                fullWidth
                {...register("seatMapName", {
                  required: "Vui lòng nhập tên sơ đồ",
                })}
                error={!!errors.seatMapName}
                size="small"
                className="font-rounded"
                helperText={errors.seatMapName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <label
                htmlFor="floor"
                className="block font-rounded font-semibold text-black"
              >
                Số tầng
              </label>
              <Select
                id="floor"
                {...register("floor")}
                className="mt-1 w-full rounded border border-gray-300 font-rounded"
                size="small"
                onChange={(e) => setSelectedFloor(Number(e.target.value))}
              >
                {Array.from({ length: 3 }, (_, index) => (
                  <MenuItem
                    key={index + 1}
                    value={index + 1}
                    className="font-rounded"
                  >
                    {index + 1} tầng
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <label
                htmlFor="row"
                className="block font-rounded font-semibold text-black"
              >
                Số hàng
              </label>
              <Select
                id="row"
                {...register("row")}
                className="mt-1 w-full rounded border border-gray-300 font-rounded"
                size="small"
                fullWidth
                onChange={(e) => setSelectedRow(Number(e.target.value))}
              >
                {Array.from({ length: 20 }, (_, index) => (
                  <MenuItem
                    key={index + 1}
                    value={index + 1}
                    className="font-rounded"
                  >
                    {index + 1} hàng
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <label
                htmlFor="column"
                className="block font-rounded font-semibold text-black"
              >
                Số cột
              </label>
              <Select
                id="column"
                {...register("column")}
                className="mt-1 w-full rounded border border-gray-300 font-rounded"
                size="small"
                fullWidth
                onChange={(e) => setSelectedColumn(Number(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <MenuItem
                    key={index + 1}
                    value={index + 1}
                    className="font-rounded"
                  >
                    {index + 1} cột
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <div className="w-full">{renderSeatMap()}</div>

          <div className="mt-4 flex justify-end">
            <Button
              sx={{ marginRight: 2 }}
              onClick={handleClose}
              variant="outlined"
              color="secondary"
            >
              Hủy
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {initialData ? "Cập nhật" : "Thêm"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};
export default ModalSeatMap;
