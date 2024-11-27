/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Typography,
} from "@mui/material";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import {
  Search,
  Notifications,
  Airplay,
  AccountCircle,
  ExpandLess,
  ExpandMore,
  ChevronRight,
  ChevronLeft,
  Dashboard,
  LocalActivity,
  DirectionsBus,
  FactCheck,
  BarChart,
  AssignmentInd,
  ManageAccounts,
  Settings,
  StarBorder,
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import BookOnline from "@mui/icons-material/BookOnline";
import { getStorage_FullName } from "@/lib/cookie";
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
  const [open, setOpen] = useState(false);

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

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [expandedSubIndex, setExpandedSubIndex] = useState<{
    [key: number]: number | null;
  }>({});

  const handleClickMenu = (index: number) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
    setOpen(true);
  };

  const handleSubClick = (sectionIndex: number, itemIndex: number) => {
    setExpandedSubIndex((prevState) => ({
      ...prevState,
      [sectionIndex]: prevState[sectionIndex] === itemIndex ? null : itemIndex,
    }));
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setSelectedIndex(null);
    setExpandedSubIndex({});
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const menuSections = [
    {
      label: "Điều hành",
      icon: <DirectionsBus />,
      items: [
        {
          label: "Điều hành xe",
          href: "/ticket-02/bus-management",
        },
        {
          label: "Điều hành xe trung chuyển",
          href: "/ticket-02/transit",
        },
        {
          label: "Kích hoạt app",
          href: "/ticket-02/checkup",
        },
      ],
    },
    {
      label: "QL Bán vé",
      icon: <FactCheck />,
      items: [
        {
          label: "Thu chi theo chuyến",
          href: "/ticket-02/revenue",
        },
        {
          label: "Hợp đồng điện tử",
          href: "/ticket-02/e-contract",
        },
        {
          label: "Hoá đơn/Vé điện tử",
          href: "/ticket-02/e-invoice",
        },
        {
          label: "Danh sách chuyển khoản",
          href: "/ticket-02/list-transfer",
        },
        {
          label: "Xe hợp đồng",
          href: "/ticket-02/contract-management",
        },
      ],
    },
    {
      label: "Báo cáo",
      icon: <BarChart />,
      items: [
        {
          label: "Báo cáo",
          href: "/ticket-02/reports",
        },
        {
          label: "Báo cáo tổng hợp",
          href: "#",
        },
      ],
    },
    {
      label: "Khách hàng",
      icon: <AssignmentInd />,
      items: [
        {
          label: "Quản lý khách hàng",
          href: "/ticket-02/customers",
        },
        {
          label: "Đánh giá",
          href: "/ticket-02/company-review",
        },
      ],
    },
    {
      label: "Nhân sự",
      icon: <ManageAccounts />,
      items: [
        {
          label: "Thiết bị đăng nhập",
          href: "/ticket-02/device-login",
        },
        {
          label: "Quản lý nhân viên",
          href: "/ticket-02/employee-management",
        },
      ],
    },
    {
      label: "Cài đặt",
      icon: <Settings />,
      items: [
        {
          label: "Quản lý nhà xe",
          href: "#",
          subItems: [
            { label: "Văn phòng", href: "/ticket-02/office" },
            { label: "Phương tiện", href: "/ticket-02/vehicle" },
            { label: "Tuyến", href: "/ticket-02/route" },
            { label: "Đại lý", href: "/ticket-02/agent" },
            { label: "Sơ đồ ghế", href: "/ticket-02/seat" },
            { label: "Điểm dừng", href: "/ticket-02/point" },
            { label: "Lịch chạy", href: "/ticket-02/schedule" },
          ],
        },
        {
          label: "Cấu hình bán vé",
          href: "#",
          subItems: [
            { label: "Giá vé", href: "/ticket-02/fare-configs" },
            { label: "Giảm giá", href: "/ticket-02/discount-by-stages" },
          ],
        },
        {
          label: "Cài đặt hệ thống",
          href: "/ticket-02/system-config",
        },
      ],
    },
  ];
  const [fullNameUser, setFullNameUser] = useState("");
  useEffect(() => {
    const name = getStorage_FullName();
    if (name !== undefined) {
      setFullNameUser(name);
    }
  }, []);
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
              <span>{fullNameUser || "Đặng Tuấn Thành"}</span>
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
          <Link href="/ticket-02/dashboard" passHref>
            <ListItemButton className="flex items-center justify-between font-rounded">
              {open ? (
                <div className="flex items-center">
                  <ListItemIcon>
                    <Dashboard />
                  </ListItemIcon>
                  <span>Tổng quan</span>
                </div>
              ) : (
                <div className="group flex flex-col items-center hover:text-[#0072bc]">
                  <ListItemIcon className="text-gray-600 group-hover:text-[#0072bc]">
                    <Dashboard />
                  </ListItemIcon>
                  <span className="ml-[-28px] text-center text-[10px] text-gray-600 group-hover:text-[#0072bc]">
                    Tổng quan
                  </span>
                </div>
              )}
            </ListItemButton>
          </Link>
        </List>
        <List>
          <Link href="/ticket-02" passHref>
            <ListItemButton className="flex items-center justify-between font-rounded">
              {open ? (
                <div className="flex items-center">
                  <ListItemIcon>
                    <LocalActivity />
                  </ListItemIcon>
                  <span>Đặt vé</span>
                </div>
              ) : (
                <div className="group flex flex-col items-center hover:text-[#0072bc]">
                  <ListItemIcon className="text-gray-600 group-hover:text-[#0072bc]">
                    <LocalActivity />
                  </ListItemIcon>
                  <span className="ml-[-31px] text-center text-[10px] text-gray-600 group-hover:text-[#0072bc]">
                    Đặt vé
                  </span>
                </div>
              )}
            </ListItemButton>
          </Link>
        </List>
        <List>
          <Link href="#" passHref>
            <ListItemButton className="flex items-center justify-between font-rounded">
              {open ? (
                <div className="flex items-center">
                  <ListItemIcon>
                    <BookOnline />
                  </ListItemIcon>
                  <span>Vé online</span>
                </div>
              ) : (
                <div className="group flex flex-col items-center hover:text-[#0072bc]">
                  <ListItemIcon className="text-gray-600 group-hover:text-[#0072bc]">
                    <BookOnline />
                  </ListItemIcon>
                  <span className="ml-[-30px] text-center text-[10px] text-gray-600 group-hover:text-[#0072bc]">
                    Vé online
                  </span>
                </div>
              )}
            </ListItemButton>
          </Link>
        </List>

        {menuSections.map((section, sectionIndex) => (
          <List key={sectionIndex}>
            <ListItemButton
              onClick={() => handleClickMenu(sectionIndex)}
              className="flex items-center justify-between font-rounded"
            >
              {open ? (
                <div className="flex items-center">
                  <ListItemIcon>{section.icon}</ListItemIcon>
                  <span>{section.label}</span>
                </div>
              ) : (
                <div className="group flex flex-col items-center hover:text-[#0072bc]">
                  <ListItemIcon className="text-gray-600 group-hover:text-[#0072bc]">
                    {section.icon}
                  </ListItemIcon>
                  <span className="ml-[-29px] text-center text-[10px] text-gray-600 group-hover:text-[#0072bc]">
                    {section.label}
                  </span>
                </div>
              )}
              {selectedIndex === sectionIndex ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>

            <Collapse
              in={selectedIndex === sectionIndex}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <ListItemButton
                      onClick={() =>
                        item.subItems
                          ? handleSubClick(sectionIndex, itemIndex)
                          : null
                      }
                      sx={{ pl: 4 }}
                      className="flex items-center justify-between font-rounded"
                    >
                      <Link
                        href={item.href}
                        passHref
                        className="w-full py-2 text-left font-rounded hover:text-[#0072bc]"
                      >
                        <span>{item.label}</span>
                      </Link>

                      {item.subItems &&
                        (expandedSubIndex[sectionIndex] === itemIndex ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        ))}
                    </ListItemButton>
                    {item.subItems && (
                      <Collapse
                        in={expandedSubIndex[sectionIndex] === itemIndex}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List component="div" disablePadding>
                          {item.subItems.map((subItem, subIndex) => (
                            <Link
                              key={subIndex}
                              href={subItem.href}
                              passHref
                              className="w-full py-2 text-left font-rounded hover:text-[#0072bc]"
                            >
                              <ListItemButton sx={{ pl: 8 }}>
                                <StarBorder fontSize="small" sx={{ mr: 1 }} />
                                <span>{subItem.label}</span>
                              </ListItemButton>
                            </Link>
                          ))}
                        </List>
                      </Collapse>
                    )}
                  </div>
                ))}
              </List>
            </Collapse>
          </List>
        ))}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, overflow: "auto" }}
        className="h-screen w-screen bg-white font-rounded"
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
