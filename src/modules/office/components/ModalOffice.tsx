import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { OfficeData } from "../types/OfficeData";
import { NewOfficeData } from "../types/NewOfficeData";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
type ModalOfficeProps = {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  officeData: OfficeData | null;
  onSave: (officeData: NewOfficeData | OfficeData) => void;
};
const ModalOffice = ({
  open,
  onClose,
  mode,
  officeData,
  onSave,
}: ModalOfficeProps) => {
  const [officeName, setOfficeName] = useState("");
  useEffect(() => {
    if (mode === "edit" && officeData) {
      setOfficeName(officeData.officeName);
    } else {
      setOfficeName("");
    }
  }, [mode, officeData]);

  const handleSave = () => {
    if (mode === "create") {
      const newOffice: NewOfficeData = { officeName };
      onSave(newOffice);
    } else if (mode === "edit" && officeData) {
      const updatedOffice: OfficeData = { ...officeData, officeName };
      onSave(updatedOffice);
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
              {mode === "create" ? "Thêm văn phòng mới" : "Chỉnh sửa văn phòng"}
            </span>
          </Typography>
          <TextField
            label="Tên văn phòng"
            value={officeName}
            onChange={(e) => setOfficeName(e.target.value)}
            fullWidth
            margin="normal"
            size="small"
            className="font-rounded"
          />
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
export default ModalOffice;
