import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, Outlet } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import SettingsIcon from "@mui/icons-material/Settings";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import UploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";
import ContactsIcon from "@mui/icons-material/Contacts";
import BusinessIcon from "@mui/icons-material/Business"
import DashboardIcon from "@mui/icons-material/Dashboard";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_STORAGE_URL = process.env.REACT_APP_STORAGE_URL;
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open
      ? {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }
      : {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
  })
);

export default function MiniDrawer() {
  const theme = useTheme();
  const { logout } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [Logo, setLogo] = useState("../../assets/images/logoL.png");
  const [avatarUrl, setAvatarUrl] = useState("");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleSettings = (route) => {
    navigate("admin/settings");
    handleMenuClose();
  };
  const handleHome = (route) => {
    navigate("/");
    handleMenuClose();
  };
  const handleProfile = (route) => {
    navigate("admin/profile");
    handleMenuClose();
  };
  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/login"); // Redirect to the login page
  };
  const fetchPrimaryColor = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings`);
      setLogo(`${API_STORAGE_URL}/storage/${response.data.logo}`);
      console.log("all data", response.data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  const fetchAvatar = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/profile`);
      // console.log("Avatar response:", response.data);
      
      setAvatarUrl(response.data.profile_image);
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  };
  useEffect(() => {
    fetchPrimaryColor();
    fetchAvatar();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Panel
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <Avatar
            sx={{ cursor: "pointer" }}
            onClick={handleMenuClick}
            src={avatarUrl} // Set avatar image source
          />
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
          >
             <MenuItem onClick={() => handleHome("/")}>Home</MenuItem>
            <MenuItem onClick={() => handleProfile("admin/profile")}>Profile</MenuItem>
            <MenuItem onClick={() => handleSettings("admin/settings")}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", my: 2 }}>
      <img src={Logo} alt="Admin Logo" style={{ height: "48px" }} />
    </Box>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
         
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate("/admin/dashboard")} sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
           {/* ✅ Banner Upload */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate("/admin/bannerupload")} sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Banner Upload" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

         

          {/* ✅ Testimonials */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate("/admin/testimonials")} sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <FormatQuoteIcon />
              </ListItemIcon>
              <ListItemText primary="Testimonials" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          {/* ✅ Service Uploader */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate("/admin/serviceuploader")} sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <UploadIcon />
              </ListItemIcon>
              <ListItemText primary="Service Uploader" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate("/admin/leads")} sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
              <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Leads" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate("/admin/contacts")} sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
              <ContactsIcon />
              </ListItemIcon>
              <ListItemText primary="contact" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate("/admin/customers")} sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
              <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary="customer" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
           
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate("/admin/profile")} sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
              <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          {/* ✅ Settings */}
           <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={() => navigate("/admin/settings")} sx={{ justifyContent: open ? "initial" : "center" }}>
              <ListItemIcon sx={{ justifyContent: "center" }}>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      {/* ✅ This ensures admin components are rendered inside MiniDrawer */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet /> {/* ✅ Admin route components will be displayed here */}
      </Box>
    </Box>
  );
}














// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import MuiAppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import { useNavigate, Outlet } from "react-router-dom"; // ✅ Import useNavigate and Outlet

// // Import icons for each menu item
// import ImageIcon from "@mui/icons-material/Image"; // Banner Upload
// import SettingsIcon from "@mui/icons-material/Settings"; // Settings
// import FormatQuoteIcon from "@mui/icons-material/FormatQuote"; // Testimonials
// import UploadIcon from "@mui/icons-material/CloudUpload"; // Service Uploader
// import axios from "axios";
// import  { useState } from "react";
// import  {  useEffect } from "react";
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const API_STORAGE_URL = process.env.REACT_APP_STORAGE_URL;
// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap",
//     boxSizing: "border-box",
//     ...(open
//       ? {
//           ...openedMixin(theme),
//           "& .MuiDrawer-paper": openedMixin(theme),
//         }
//       : {
//           ...closedMixin(theme),
//           "& .MuiDrawer-paper": closedMixin(theme),
//         }),
//   })
// );

// export default function MiniDrawer() {
//   const theme = useTheme();
//   const navigate = useNavigate(); // ✅ useNavigate for navigation
//   const [open, setOpen] = React.useState(false);
//   const[Logo, setLogo] = useState("../../assets/images/logoL.png")
//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };
//   const fetchPrimaryColor = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/settings`);
//       setLogo(`${API_STORAGE_URL}/storage/${response.data.logo}`);
//       console.log("all data", response.data);
//     } catch (error) {
//       console.error("Error fetching settings:", error);
//     }
//   };
//   useEffect(() => {
//       fetchPrimaryColor();
//     }, []);
//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={{
//               marginRight: 5,
//               ...(open && { display: "none" }),
//             }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Admin Panel
//           </Typography>
          
//         </Toolbar>
//       </AppBar>
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//         <Box sx={{ display: "flex", justifyContent: "center", width: "100%", my: 2 }}>
//       <img src={Logo} alt="Admin Logo" style={{ height: "50px" }} />
//     </Box>
//           <IconButton onClick={handleDrawerClose}>
//             {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {/* ✅ Banner Upload */}
//           <ListItem disablePadding sx={{ display: "block" }}>
//             <ListItemButton onClick={() => navigate("/admin/bannerupload")} sx={{ justifyContent: open ? "initial" : "center" }}>
//               <ListItemIcon sx={{ justifyContent: "center" }}>
//                 <ImageIcon />
//               </ListItemIcon>
//               <ListItemText primary="Banner Upload" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           {/* ✅ Settings */}
//           <ListItem disablePadding sx={{ display: "block" }}>
//             <ListItemButton onClick={() => navigate("/admin/settings")} sx={{ justifyContent: open ? "initial" : "center" }}>
//               <ListItemIcon sx={{ justifyContent: "center" }}>
//                 <SettingsIcon />
//               </ListItemIcon>
//               <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           {/* ✅ Testimonials */}
//           <ListItem disablePadding sx={{ display: "block" }}>
//             <ListItemButton onClick={() => navigate("/admin/testimonials")} sx={{ justifyContent: open ? "initial" : "center" }}>
//               <ListItemIcon sx={{ justifyContent: "center" }}>
//                 <FormatQuoteIcon />
//               </ListItemIcon>
//               <ListItemText primary="Testimonials" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>

//           {/* ✅ Service Uploader */}
//           <ListItem disablePadding sx={{ display: "block" }}>
//             <ListItemButton onClick={() => navigate("/admin/serviceuploader")} sx={{ justifyContent: open ? "initial" : "center" }}>
//               <ListItemIcon sx={{ justifyContent: "center" }}>
//                 <UploadIcon />
//               </ListItemIcon>
//               <ListItemText primary="Service Uploader" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Drawer>

//       {/* ✅ This ensures admin components are rendered inside MiniDrawer */}
//       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//         <DrawerHeader />
//         <Outlet /> {/* ✅ Admin route components will be displayed here */}
//       </Box>
//     </Box>
//   );
// }
