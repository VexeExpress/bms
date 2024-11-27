import { useEffect, useState } from "react";
import { NewRouteData } from "../types/NewRouteData";
import { RouteData } from "../types/RouteData";
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
type ModalRouteProps = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  routeData: RouteData | null;
  onSave: (routeData: NewRouteData | RouteData) => void;
};
const ModalRoute = ({
  open,
  onClose,
  mode,
  routeData,
  onSave,
}: ModalRouteProps) => {
  const [routeName, setRouteName] = useState("");
  const [routeNameShort, setRouteNameShort] = useState("");
  const [displayPrice, setDisplayPrice] = useState("");
  const [status, setStatus] = useState(0);
  const [note, setNote] = useState("");
  useEffect(() => {
    if (mode === "edit" && routeData) {
      setRouteName(routeData.routeName);
      setRouteNameShort(routeData.routeNameShort);
      setDisplayPrice(routeData.displayPrice);
      setStatus(routeData.status);
      setNote(routeData.note);
    } else {
      setRouteName("");
      setRouteNameShort("");
      setDisplayPrice("");
      setStatus(0);
      setNote("");
    }
  }, [mode, routeData]);
  const handleSave = () => {
    if (mode === "create") {
      const newRoute: NewRouteData = {
        routeName,
        routeNameShort,
        displayPrice,
        status,
        note,
      };
      console.log("Creating new route:", newRoute);
      onSave(newRoute);
    } else if (mode === "edit" && routeData) {
      const updatedRoute = {
        ...routeData,
        routeName,
        routeNameShort,
        displayPrice,
        status,
        note,
      };
      console.log("Updating route:", updatedRoute);
      onSave(updatedRoute);
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
              {mode === "create" ? "Thêm tuyến mới" : "Chỉnh sửa tuyến"}
            </span>
          </Typography>
          <div className="mb-10 mt-5">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="routeName"
                  className="block font-rounded font-semibold text-black"
                >
                  Tên tuyến
                </label>
                <TextField
                  id="routeName"
                  value={routeName}
                  onChange={(e) => setRouteName(e.target.value)}
                  fullWidth
                  size="small"
                  className="font-rounded"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="routeNameShort"
                  className="block font-rounded font-semibold text-black"
                >
                  Tên tuyến rút gọn
                </label>
                <TextField
                  id="routeNameShort"
                  value={routeNameShort}
                  onChange={(e) => setRouteNameShort(e.target.value)}
                  fullWidth
                  size="small"
                  className="font-rounded"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="displayPrice"
                  className="block font-rounded font-semibold text-black"
                >
                  Giá cơ bản
                </label>
                <TextField
                  id="displayPrice"
                  value={displayPrice}
                  onChange={(e) => setDisplayPrice(e.target.value)}
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
                  <MenuItem value={1}>Hoạt động</MenuItem>
                  <MenuItem value={2}>Ngừng hoạt động</MenuItem>
                </Select>
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
export default ModalRoute;
