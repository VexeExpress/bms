"use client";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import {
  Badge,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
} from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {
  Search,
  Notifications,
  Airplay,
  AccountCircle,
  ConfirmationNumber,
  ExpandLess,
  ExpandMore,
  Widgets,
  Leaderboard,
  EditNote,
  Camera,
  PanTool,
  Inbox,
  ChevronRight,
  ChevronLeft,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useState } from "react";
import Link from "next/link";
const drawerWidth = 260;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const [open6, setOpen6] = React.useState(false);
  const [open7, setOpen7] = React.useState(false);
  const [open8, setOpen8] = React.useState(false);
  const handleDrawerClose = () => {
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
    setOpen7(false);
    setOpen8(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
    setOpen(true);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
    setOpen7(false);
    setOpen8(false);
  };
  const handleClick3 = () => {
    setOpen3(!open3);
    setOpen(true);
    setOpen2(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
    setOpen7(false);
    setOpen8(false);
  };
  const handleClick4 = () => {
    setOpen4(!open4);
    setOpen(true);
    setOpen2(false);
    setOpen3(false);
    setOpen5(false);
    setOpen6(false);
    setOpen7(false);
    setOpen8(false);
  };
  const handleClick5 = () => {
    setOpen5(!open5);
    setOpen(true);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen6(false);
    setOpen7(false);
    setOpen8(false);
  };
  const handleClick6 = () => {
    setOpen6(!open6);
    setOpen(true);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen7(false);
    setOpen8(false);
  };
  const handleClick7 = () => {
    setOpen7(!open7);
    setOpen(true);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
    setOpen8(false);
  };
  const handleClick8 = () => {
    setOpen8(!open8);
    setOpen(true);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
    setOpen5(false);
    setOpen6(false);
    setOpen7(false);
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(
    null,
  );
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAccountAnchorEl(null);
  };
  const menuHanhKhach = [
    { href: "/ticket-02/ticket-sales", label: "1.1 Vé hành khách" },
    {
      href: "/ticket-02/report-detail-ticket",
      label: "1.2 Tra cứu thông tin vé",
    },
    {
      href: "/ticket-02/report-by-agency",
      label: "1.3 Báo cáo công nợ đại lý",
    },
    {
      href: "/ticket-02/report-count-trip-driver",
      label: "1.4 Thống kê chuyến theo tài xế",
    },
    {
      href: "/ticket-02/report-cash-by-user",
      label: "1.5 Báo cáo theo nhân viên",
    },
    { href: "/ticket-02/ret", label: "1.6 Yêu cầu xuất vé điện tử" },
    { href: "/ticket-02/report-data-studio", label: "1.7 Báo cáo" },
    {
      href: "/ticket-02/electronic-transport-order",
      label: "1.8 Lệnh vận chuyển điện tử",
    },
    {
      href: "/ticket-02/electronic-invoice",
      label: "1.9 Xuất hóa đơn điện tử",
    },
  ];
  const menuHangHoa = [
    { href: "/ticket-02/goods", label: "2.1 Tra cứu hàng hóa" },
    { href: "/ticket-02/report-goods", label: "2.2 Báo cáo hàng hóa" },
    { href: "/ticket-02/goods-by-user", label: "2.3 Hàng hóa theo nhân viên" },
  ];
  const menuDieuHanh = [
    {
      href: "/ticket-02/assign-transshipment-driver-for-ticket",
      label: "3.1 Phân tài trung chuyển khách",
    },
    { href: "/ticket-02/order-route", label: "3.2 Sắp xếp tuyến" },
    {
      href: "/ticket-02/trips-driver-report",
      label: "3.3 Báo cáo theo tài xế",
    },
    {
      href: "/ticket-02/transshipment-report",
      label: "3.4 Báo cáo trung chuyển",
    },
    { href: "/ticket-02/bill-in-trip", label: "3.5 Thu chi chuyến" },
    { href: "/ticket-02/manage-list-trip", label: "3.6 Danh sách chuyến" },
    { href: "/ticket-02/trip-operation", label: "3.7 Quản lý chuyến" },
    { href: "/ticket-02/manage-ingredient", label: "3.8 Nhiên liệu" },
  ];
  const menuQuanLy = [
    { href: "/ticket-02/promotion", label: "4.1 Mã khuyến mãi" },
    { href: "/ticket-02/cancel-ticket-policy", label: "4.2 Chính sách hủy vé" },
  ];
  const menuKhaiBao = [
    { href: "/ticket-02/user", label: "5.1 Nhân viên" },
    { href: "/ticket-02/point", label: "5.2 Điểm dừng" },
    { href: "/ticket-02/route", label: "5.3 Tuyến" },
    { href: "/ticket-02/seat-map", label: "5.4 Sơ đồ ghế" },
    { href: "/ticket-02/vehicle", label: "5.5 Phương tiện" },
    { href: "/ticket-02/plan-for-trip", label: "5.6 Lịch chạy" },
    { href: "/ticket-02/level-agency", label: "5.7 Cấp đại lý" },
    { href: "/ticket-02/agency", label: "5.8 Đại lý" },
    { href: "/ticket-02/office", label: "5.9 Văn phòng" },
    { href: "/ticket-02/telecom-number", label: "5.10 Số máy tổng đài" },
  ];
  const menuHeThong = [
    { href: "/ticket-02/print-config-ticket", label: "6.1 Tùy chỉnh in vé" },
    {
      href: "/ticket-02/print-config-seat-map",
      label: "6.2 Tùy chỉnh in sơ đồ ghế",
    },
    { href: "/ticket-02/print-config-goods", label: "6.3 Tùy chỉnh in hàng" },
    {
      href: "/ticket-02/sms-config-display",
      label: "6.4 Cấu hình gửi tin nhắn",
    },
    { href: "/ticket-02/config-ticket-email", label: "6.5 Cấu hình gửi gmail" },
    {
      href: "/ticket-02/config-freight-order",
      label: "6.6 Lệnh vận chuyển hàng hóa",
    },
  ];
  const menuCSKH = [
    { href: "/ticket-02/report-message", label: "7.1 Báo cáo số dư tài khoản" },
    { href: "/ticket-02/register-vietqr", label: "7.2 Đăng ký sử dụng VietQR" },
  ];
  return (
    <Box className="flex">
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>

          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 350,
              borderRadius: 20,
              height: 40,
              backgroundColor: "#f1f1f1",
              boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.23)",
            }}
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <Search />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Tìm kiếm theo SĐT"
              className="font-rounded"
            />
          </Paper>
          <Box className="flex flex-grow items-center justify-end font-rounded">
            <div className="pr-2.5">
              <span>name</span>
            </div>
            <div className="ml-2 rounded bg-green-700 px-1.5 py-0.5 font-rounded">
              <span>TK: 5.000.000 đ</span>
            </div>

            <Badge badgeContent={4} color="secondary" className="ml-5 mr-2.5">
              <Notifications />
            </Badge>
            <IconButton
              color="inherit"
              aria-label="account"
              onClick={handleClick}
            >
              <Airplay />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className="font-rounded"
            >
              <MenuItem
                onClick={() => console.log("Technical support clicked")}
              >
                <span className="font-rounded">
                  Hỗ trợ kĩ thuật: 0877 717575
                </span>
              </MenuItem>
              <MenuItem onClick={() => console.log("Remote control clicked")}>
                <span className="font-rounded">Điều khiển từ xa</span>
              </MenuItem>
              <MenuItem onClick={() => console.log("Feedback clicked")}>
                <span className="font-rounded">
                  Gửi phản hồi cho VexeExpress
                </span>
              </MenuItem>
              <MenuItem onClick={() => console.log("Feedback history clicked")}>
                <span className="font-rounded">Lịch sử phản hồi</span>
              </MenuItem>
            </Menu>
            <IconButton
              color="inherit"
              aria-label="system"
              onClick={handleAccountClick}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={accountAnchorEl}
              open={Boolean(accountAnchorEl)}
              onClose={handleClose}
            >
              <MenuItem>
                <span className="font-rounded">Đổi mật khẩu</span>
              </MenuItem>
              <MenuItem>
                <span className="font-rounded">Đăng xuất</span>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton
            onClick={handleClick2}
            className="flex items-center justify-between font-rounded"
          >
            <div className="flex items-center">
              <ListItemIcon>
                <ConfirmationNumber />
              </ListItemIcon>
              <span>Hành khách</span>
            </div>
            {open2 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open2} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuHanhKhach.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  className="w-full py-2 text-left font-rounded hover:text-[#0072bc]"
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <span>{item.label}</span>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
        <List>
          <ListItemButton
            onClick={handleClick3}
            className="flex items-center justify-between font-rounded"
          >
            <div className="flex items-center">
              <ListItemIcon>
                <Widgets />
              </ListItemIcon>
              <span>Hàng hóa</span>
            </div>
            {open3 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open3} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuHangHoa.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  className="w-full py-2 text-left font-rounded hover:text-[#0072bc]"
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <span>{item.label}</span>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>

        <List>
          <ListItemButton
            onClick={handleClick4}
            className="flex items-center justify-between font-rounded"
          >
            <div className="flex items-center">
              <ListItemIcon>
                <Leaderboard />
              </ListItemIcon>
              <span>Điều hành</span>
            </div>
            {open4 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open4} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuDieuHanh.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  className="w-full py-2 text-left font-rounded hover:text-[#0072bc]"
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <span>{item.label}</span>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>

        <List>
          <ListItemButton
            onClick={handleClick5}
            className="flex items-center justify-between font-rounded"
          >
            <div className="flex items-center">
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <span>Quản lý</span>
            </div>
            {open5 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open5} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuQuanLy.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  className="w-full py-2 text-left font-rounded hover:text-[#0072bc]"
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <span>{item.label}</span>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>

        <List>
          <ListItemButton
            onClick={handleClick6}
            className="flex items-center justify-between font-rounded"
          >
            <div className="flex items-center">
              <ListItemIcon>
                <EditNote />
              </ListItemIcon>
              <span>Khai báo</span>
            </div>
            {open6 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open6} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuKhaiBao.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  className="w-full py-2 text-left font-rounded hover:text-[#0072bc]"
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <span>{item.label}</span>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>

        <List>
          <ListItemButton
            onClick={handleClick7}
            className="flex items-center justify-between font-rounded"
          >
            <div className="flex items-center">
              <ListItemIcon>
                <Camera />
              </ListItemIcon>
              <span>Hệ thống</span>
            </div>
            {open7 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open7} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuHeThong.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  className="w-full py-2 text-left font-rounded hover:text-[#0072bc]"
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <span>{item.label}</span>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>

        <List>
          <ListItemButton
            onClick={handleClick8}
            className="flex items-center justify-between font-rounded"
          >
            <div className="flex items-center">
              <ListItemIcon>
                <PanTool />
              </ListItemIcon>
              <span>CSKH</span>
            </div>
            {open8 ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open8} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {menuCSKH.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  passHref
                  className="w-full py-2 text-left font-rounded hover:text-[#0072bc]"
                >
                  <ListItemButton sx={{ pl: 4 }}>
                    <span>{item.label}</span>
                  </ListItemButton>
                </Link>
              ))}
            </List>
          </Collapse>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }} className="font-rounded">
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
