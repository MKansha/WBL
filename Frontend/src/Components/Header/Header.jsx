 
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { Facebook, Twitter, YouTube, Instagram,LinkedIn, Menu as MenuIcon, Close } from "@mui/icons-material";
import { Phone, Email } from "@mui/icons-material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
// import logo from "./../../assets/images/logo.png"; 
import "./Header.css"
import axios from "axios";
import  {  useEffect } from "react";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_STORAGE_URL = process.env.REACT_APP_STORAGE_URL;
// console.log(API_BASE_URL);

export default function Header({ setShowModal }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#2095F1');
  const [ContactDetails, setContactDetails] = useState();
  const [Email2, setEmail2] = useState();
  const [imageLoaded, setImageLoaded] = useState(false);
  const[Logo, setLogo] = useState("../../assets/images/logoL.png")
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
  });
  // console.log("Facebook",socialLinks);
  const navigate = useNavigate();
  const primaryColor1 = primaryColor;
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const fetchPrimaryColor = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings`);
      setPrimaryColor(response.data.primary_color);
      setEmail2(response.data.email2);
      setLogo(`${API_STORAGE_URL}/storage/${response.data.logo}`);
      console.log("all data", response.data);
      
      // ✅ Parse the social_links JSON string
      let parsedSocialLinks = {};
      if (response.data.social_links) {
        try {
          parsedSocialLinks = JSON.parse(response.data.social_links);
        } catch (error) {
          console.error("Error parsing social_links:", error);
        }
      }
  
      setSocialLinks({
        facebook: parsedSocialLinks.facebook || "",
        twitter: parsedSocialLinks.twitter || "",
        linkedin: parsedSocialLinks.linkedin || "",
        instagram: parsedSocialLinks.instagram || "",
      });
  
      // console.log("Fetched social links:", parsedSocialLinks);
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };
  
  const fetchcontactDetails = async () => {

    try {
      const response = await axios.get(`${API_BASE_URL}/contact`);
      setContactDetails(response.data);
      // console.log("Fetched contact details:", response.data);
    } catch (error) {
      console.error("Error fetching contact details:", error);
    }
  }
   useEffect(() => {
    fetchcontactDetails(setContactDetails);
      fetchPrimaryColor(setPrimaryColor);
    }, []);
    // console.log("kansha",ContactDetails);
    
    
    
  return (
    <Box>
      {/* Top Bar with Marquee Effect */}
      <Box
        sx={{
          backgroundColor: primaryColor,
          color: "#fff",
          padding: "5px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 4,
          overflow: "hidden",
          zIndex: 9999, // ✅ Higher than other components
          position: "relative",
        }}
      >
       <Box sx={{ width: "50%", overflow: "hidden", margin: "0 auto" }}>
  <marquee behavior="scroll" direction="left" scrollamount="4">
    <Typography variant="body2" component="span" sx={{ mr: 2 }}>
    <Phone />{" "}
{(ContactDetails?.phone || "+91 461 2345772")
  .trim()
  .split(/\s+/) // Split by spaces
  .map((num) => (num.startsWith("+91") ? num : `+91 ${num}`)) // Ensure "+91" prefix
  .join("\n") /* ✅ Ensures correct formatting */}

    </Typography>
    
    <Typography variant="body2" component="span" sx={{ mr: 1 }}>
      <Email/> {ContactDetails?.email || "info@trbfreight.com"}
    </Typography>

    <Typography variant="body2" component="span" sx={{ ml: 1 }}>
      {Email2 || "info@trbfreight.com"}
    </Typography>
  </marquee>
</Box>
<Box sx={{ display: "flex", gap: 1 }}>
  {socialLinks.facebook && (
    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
      <IconButton sx={{ color: "#fff" }}>
        <Facebook />
      </IconButton>
    </a>
  )}
  {socialLinks.twitter && (
    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
      <IconButton sx={{ color: "#fff" }}>
        <Twitter />
      </IconButton>
    </a>
  )}
  {socialLinks.linkedin && (
    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
      <IconButton sx={{ color: "#fff" }}>
        <LinkedIn />  {/* ✅ Fixed LinkedIn icon */}
      </IconButton>
    </a>
  )}
  {socialLinks.instagram && (
    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
      <IconButton sx={{ color: "#fff" }}>
        <Instagram />
      </IconButton>
    </a>
  )}
</Box>


      </Box>

      {/* Main Header */}
      <AppBar
  position="static"
  sx={{
    backgroundColor: "#0A192F", // ✅ Dark blue background
    boxShadow: "none",
    borderBottom: "2px solid #888", // ✅ Light gray bottom border
  }}
>
  <Toolbar
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      px: { xs: 2, md: 4 },
    }}
  >

          {/* Logo */}

          <Box sx={{ width: 150, height: 50, display: "flex", alignItems: "center" }}>
  {/* Hidden Preloader Image */}
  <img
    src={Logo}
    style={{ display: "none" }}
    onLoad={() => setImageLoaded(true)}
    onError={() => setImageLoaded(false)} // Prevents broken image icon
  />

  {/* Display Image Only After It Loads */}
  {imageLoaded && (
    <img
      src={Logo}
      width="150"
      height="50"
      style={{ cursor: "pointer" }}
      onClick={() => navigate("/login")}
    />
  )}
</Box>




          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton onClick={handleDrawerToggle} sx={{color:"white"}} >
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Navigation Links for Desktop */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              alignItems: "center",
            }}
          >
           <NavLink 
        to="/" 
        className="nav-link" 
        style={({ isActive }) => ({ color: isActive ? primaryColor1 : "white" })}
      >
        Home
      </NavLink>
      <NavLink 
        to="/about" 
        className="nav-link" 
        style={({ isActive }) => ({ color: isActive ? primaryColor1 : "white" })}
      >
        About
      </NavLink>
      <NavLink 
        to="/services" 
        className="nav-link" 
        style={({ isActive }) => ({ color: isActive ? primaryColor1 : "white" })}
      >
        Services
      </NavLink>
      <NavLink 
        to="/contact" 
        className="nav-link" 
        style={({ isActive }) => ({ color: isActive ? primaryColor1 : "white" })}
      >
        Contact
      </NavLink>
          </Box>

          {/* Get a Quote Button */}
          <Button
            variant="contained"
            onClick={() => setShowModal(true)}
            sx={{
              backgroundColor: `${primaryColor1}`,
              borderRadius: "25px",
              padding: "8px 20px",
              "&:hover": { backgroundColor: primaryColor1 },
              display: { xs: "none", md: "block" },
            }}
          >
            Get a Quote
          </Button>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer 
  anchor="left" 
  open={mobileOpen} 
  onClose={handleDrawerToggle}  
  PaperProps={{
    sx: {
      width: 280, 
      background: "linear-gradient(to bottom, #0A192F, #243B55)", // ✅ Gradient BG
      color: "white",
      borderTopRightRadius: "12px", 
      borderBottomRightRadius: "12px", 
    }
  }}
  sx={{ zIndex: 10100 }} // ✅ Higher z-index to stay above header
>
  <Box sx={{ p: 2 }}>
    <IconButton onClick={handleDrawerToggle} sx={{ color: "white", mb: 2 }}>
      <Close />
    </IconButton>
    
    <List>
      {[
        { text: "Home", to: "/" },
        { text: "About Us", to: "/about" },
        { text: "Our Services", to: "/services" },
        { text: "Contact Us", to: "/contact" }
      ].map((item, index) => (
        <ListItem 
          key={index} 
          button 
          component={NavLink} 
          to={item.to} 
          onClick={handleDrawerToggle}
          sx={{
            color: "white",
            borderRadius: "8px", 
            mb: 1, 
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" } 
          }}
        >
          <ListItemText primary={item.text} sx={{ textAlign: "center" }} />
        </ListItem>
      ))}
      
      {/* Get a Quote Button */}
      <ListItem>
        <Button 
          variant="contained"
          fullWidth
          onClick={() => { setShowModal(true); handleDrawerToggle(); }} 
          sx={{ 
            backgroundColor: primaryColor1, 
            borderRadius: "25px", 
            "&:hover": { backgroundColor: "#1E88E5" } 
          }}
        >
          Get a Quote
        </Button>
      </ListItem>
    </List>
  </Box>
</Drawer>

    </Box>
  );
}
