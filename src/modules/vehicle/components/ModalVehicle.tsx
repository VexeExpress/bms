import { useEffect, useState } from "react";
import { NewVehicleData } from "../types/NewVehicleData";
import { VehicleData } from "../types/VehicleData";
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
};
type ModalVehicleProps = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  vehicleData: VehicleData | null;
  onSave: (officeData: NewVehicleData | VehicleData) => void;
};
const ModalVehicle = ({
  open,
  onClose,
  mode,
  vehicleData,
  onSave,
}: ModalVehicleProps) => {
  const [licensePlate, setLicensePlate] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [typeVehicle, setTypeVehicle] = useState(0);
  const [registrationPeriod, setRegistrationPeriod] = useState("");
  const [status, setStatus] = useState(0);
  const [color, setColor] = useState("");
  const [maintenancePeriod, setMaintenancePeriod] = useState("");
  const [brand, setBrand] = useState(0);
  useEffect(() => {
    if (mode === "edit" && vehicleData) {
      setLicensePlate(vehicleData.licensePlate);
      setPhone(vehicleData.phone);
      setNote(vehicleData.note);
      setTypeVehicle(vehicleData.typeVehicle);
      setRegistrationPeriod(vehicleData.registrationPeriod);
      setStatus(vehicleData.status);
      setColor(vehicleData.color);
      setMaintenancePeriod(vehicleData.maintenancePeriod);
      setBrand(vehicleData.brand);
    } else {
      setLicensePlate("");
      setPhone("");
      setBrand(0);
      setColor("");
      setMaintenancePeriod("");
      setNote("");
      setTypeVehicle(0);
      setRegistrationPeriod("");
      setStatus(0);
    }
  }, [mode, vehicleData]);

  const handleSave = () => {
    if (mode === "create") {
      const newVehicle: NewVehicleData = {
        licensePlate,
        note,
        phone,
        typeVehicle,
        registrationPeriod,
        status,
        color,
        maintenancePeriod,
        brand,
      };
      console.log(newVehicle);
      onSave(newVehicle);
    } else if (mode === "edit" && vehicleData) {
      const updatedVehicle: VehicleData = { ...vehicleData, licensePlate };
      onSave(updatedVehicle);
    }
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
            <span className="font-rounded text-black">
              {mode === "create"
                ? "Thêm phương tiện mới"
                : "Chỉnh sửa phương tiện"}
            </span>
          </Typography>
          <div className="mb-10 mt-5">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="licensePlate"
                  className="block font-rounded font-semibold text-black"
                >
                  Biển số xe
                </label>
                <TextField
                  id="licensePlate"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  fullWidth
                  size="small"
                  className="font-rounded"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="phone"
                  className="block font-rounded font-semibold text-black"
                >
                  SĐT theo xe
                </label>
                <TextField
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                  size="small"
                  className="font-rounded"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="color"
                  className="block font-rounded font-semibold text-black"
                >
                  Màu sắc
                </label>
                <TextField
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  fullWidth
                  size="small"
                  className="font-rounded"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="note"
                  className="block font-rounded font-semibold text-black"
                >
                  Ghi chú
                </label>
                <TextField
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  fullWidth
                  size="small"
                  className="font-rounded"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="brand"
                  className="block font-rounded font-semibold text-black"
                >
                  Hãng xe
                </label>
                <Select
                  labelId="brand"
                  id="brand"
                  value={brand}
                  size="small"
                  fullWidth
                  onChange={(e) => setBrand(Number(e.target.value))}
                >
                  <MenuItem value={1}>THACO</MenuItem>
                  <MenuItem value={2}>HYUNDAI</MenuItem>
                  <MenuItem value={3}>TRACOMECO</MenuItem>
                  <MenuItem value={4}>MERCEDES</MenuItem>
                  <MenuItem value={5}>KING LONG</MenuItem>
                  <MenuItem value={6}>SAMCO</MenuItem>
                  <MenuItem value={7}>KIA</MenuItem>
                  <MenuItem value={8}>DAEWOO</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="typeVehicle"
                  className="block font-rounded font-semibold text-black"
                >
                  Loại xe
                </label>
                <Select
                  labelId="typeVehicle"
                  id="typeVehicle"
                  value={typeVehicle}
                  size="small"
                  fullWidth
                  onChange={(e) => setTypeVehicle(Number(e.target.value))}
                >
                  <MenuItem value={1}>Giường nằm</MenuItem>
                  <MenuItem value={2}>Ghế ngồi</MenuItem>
                  <MenuItem value={3}>Ghế ngồi limousine</MenuItem>
                  <MenuItem value={4}>Giuờng nằm limousine</MenuItem>
                  <MenuItem value={5}>Phòng VIP (Cabin)</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="status"
                  className="block font-rounded font-semibold text-black"
                >
                  Trạng thái
                </label>
                <Select
                  labelId="status"
                  id="status"
                  value={status}
                  size="small"
                  fullWidth
                  onChange={(e) => setStatus(Number(e.target.value))}
                >
                  <MenuItem value={1}>Đang sử dụng</MenuItem>
                  <MenuItem value={2}>Đang bảo dưỡng</MenuItem>
                  <MenuItem value={3}>Ngừng hoạt động</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="registrationPeriod"
                  className="block font-rounded font-semibold text-black"
                >
                  Hạn đăng kiểm
                </label>
                <TextField
                  id="registrationPeriod"
                  value={registrationPeriod}
                  onChange={(e) => setRegistrationPeriod(e.target.value)}
                  fullWidth
                  type="date"
                  size="small"
                  className="font-rounded"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="maintenancePeriod"
                  className="block font-rounded font-semibold text-black"
                >
                  Hạn bảo dưỡng
                </label>
                <TextField
                  id="maintenancePeriod"
                  value={maintenancePeriod}
                  onChange={(e) => setMaintenancePeriod(e.target.value)}
                  fullWidth
                  type="date"
                  size="small"
                  className="font-rounded"
                />
              </Grid>
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
              {mode === "create" ? "Lưu" : "Cập nhật"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalVehicle;
