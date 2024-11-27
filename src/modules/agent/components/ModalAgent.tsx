import { useEffect, useState } from "react";
import { AgentData } from "../types/AgentData";
import { NewAgentData } from "../types/NewAgentData";
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
type ModalAgentProps = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  agentData: AgentData | null;
  onSave: (agentData: NewAgentData | AgentData) => void;
};
const ModalAgent = ({
  open,
  onClose,
  mode,
  agentData,
  onSave,
}: ModalAgentProps) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  const [discountTicket, setDiscountTicket] = useState("");
  const [discountTicketType, setDiscountTicketType] = useState(0);
  const [discountGoods, setDiscountGoods] = useState("");
  const [discountGoodsType, setDiscountGoodsType] = useState(0);
  useEffect(() => {
    if (mode === "edit" && agentData) {
      setName(agentData.name);
      setCode(agentData.code);
      setPhone(agentData.phone);
      setNote(agentData.note);
      setAddress(agentData.address);
      setDiscountTicket(agentData.discountTicket);
      setDiscountTicketType(agentData.discountTicketType);
      setDiscountGoods(agentData.discountGoods);
      setDiscountGoodsType(agentData.discountGoodsType);
    } else {
      setName("");
      setCode("");
      setPhone("");
      setNote("");
      setAddress("");
      setDiscountTicket("");
      setDiscountTicketType(1);
      setDiscountGoods("");
      setDiscountGoodsType(1);
    }
  }, [mode, agentData]);
  const handleSave = () => {
    if (mode === "create") {
      const newAgent: NewAgentData = {
        name,
        code,
        phone,
        note,
        address,
        discountTicket,
        discountTicketType,
        discountGoods,
        discountGoodsType,
      };
      console.log("Creating new agent:", newAgent);
      onSave(newAgent);
    } else if (mode === "edit" && agentData) {
      const updatedAgent = {
        ...agentData,
        name,
        code,
        phone,
        note,
        address,
        discountTicket,
        discountTicketType,
        discountGoods,
        discountGoodsType,
      };
      console.log("Updating agent:", updatedAgent);
      onSave(updatedAgent);
    }
    onClose();
  };
  const getLabelTitleTicket = () => {
    return discountTicketType === 1 ? "Nhập phần trăm" : "Nhập số tiền";
  };
  const getLabelTitleGoods = () => {
    return discountGoodsType === 1 ? "Nhập phần trăm" : "Nhập số tiền";
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
              {mode === "create" ? "Thêm đại lý mới" : "Chỉnh sửa đại lý"}
            </span>
          </Typography>
          <div className="mb-10 mt-5">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="name"
                  className="block font-rounded font-semibold text-black"
                >
                  Tên đại lý
                </label>
                <TextField
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  size="small"
                  className="font-rounded"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <label
                  htmlFor="code"
                  className="block font-rounded font-semibold text-black"
                >
                  Mã đại lý
                </label>
                <TextField
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
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
                  SĐT liên lạc
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
              <Grid item xs={12} sm={6} md={8}>
                <label
                  htmlFor="address"
                  className="block font-rounded font-semibold text-black"
                >
                  Địa chỉ
                </label>
                <TextField
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  fullWidth
                  size="small"
                  className="font-rounded"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} className="mt-10">
              <Grid item xs={12} sm={6} md={3}>
                <label
                  htmlFor="discountTicketType"
                  className="block font-rounded font-semibold text-black"
                >
                  Chiết khấu vé theo
                </label>
                <Select
                  labelId="discountTicketType"
                  id="discountTicketType"
                  value={discountTicketType}
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setDiscountTicketType(Number(e.target.value))
                  }
                >
                  <MenuItem value={1}>%</MenuItem>
                  <MenuItem value={2}>VND</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <label
                  htmlFor="discountTicket"
                  className="block font-rounded font-semibold text-black"
                >
                  {getLabelTitleTicket()}
                </label>
                <TextField
                  id="discountTicket"
                  value={discountTicket}
                  onChange={(e) => setDiscountTicket(e.target.value)}
                  fullWidth
                  size="small"
                  className="font-rounded"
                />
              </Grid>
            </Grid>
            <Grid container spacing={4} className="mt-5">
              <Grid item xs={12} sm={6} md={3}>
                <label
                  htmlFor="discountGoodsType"
                  className="block font-rounded font-semibold text-black"
                >
                  Chiết khấu hàng theo đơn
                </label>
                <Select
                  labelId="discountGoodsType"
                  id="discountGoodsType"
                  value={discountGoodsType}
                  size="small"
                  fullWidth
                  onChange={(e) => setDiscountGoodsType(Number(e.target.value))}
                >
                  <MenuItem value={1}>%</MenuItem>
                  <MenuItem value={2}>VND</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <label
                  htmlFor="discountGoods"
                  className="block font-rounded font-semibold text-black"
                >
                  {getLabelTitleGoods()}
                </label>
                <TextField
                  id="discountGoods"
                  value={discountGoods}
                  onChange={(e) => setDiscountGoods(e.target.value)}
                  fullWidth
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
export default ModalAgent;
