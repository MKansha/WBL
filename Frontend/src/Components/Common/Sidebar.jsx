import React, { useState } from "react";
import { Drawer, List, ListItem, IconButton, Box, Typography } from "@mui/material";
import { Home, Business, People, Group, Campaign, Person, Settings, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar is open by default

  return (
    <>
      {/* Hamburger Button */}
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: "fixed",
          top: 15,
          left: isOpen ? 220 : 15, // Moves with sidebar
          zIndex: 1002,
          backgroundColor: "#3498db",
          color: "white",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "#1f78c1" },
          transition: "left 0.3s ease",
        }}
      >
        <Menu fontSize="large" />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: isOpen ? 220 : 80,
          transition: "width 0.3s ease",
          "& .MuiDrawer-paper": {
            width: isOpen ? 220 : 80,
            transition: "width 0.3s ease",
            overflowX: "hidden",
            borderRight: "1px solid #eee",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
          },
        }}
      >
        <Box sx={{ py: 2, width: "100%", textAlign: "center" }}>
          {/* Clickable Logo */}
          <ListItem component={Link} to="/dashboard" sx={{ justifyContent: "center", mb: 2 }}>
            <IconButton
              sx={{
                backgroundColor: "#3498db",
                width: 50,
                height: 50,
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#1f78c1" },
              }}
            >
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </IconButton>
            {isOpen && <Typography variant="body2" sx={{ ml: 2, fontWeight: 600 }}>Dashboard</Typography>}
          </ListItem>
        </Box>

        {/* Sidebar Links */}
        <List sx={{ width: "100%" }}>
          {[
            { text: "Dashboard", icon: <Home />, path: "/" },
            { text: "Property List", icon: <Business />, path: "/property" },
            { text: "Customers", icon: <People />, path: "/customers" },
            { text: "Leads", icon: <Group />, path: "/leads" },
            { text: "Marketing", icon: <Campaign />, path: "/marketing" },
            { text: "Profile", icon: <Person />, path: "/profile" },
            { text: "Settings", icon: <Settings />, path: "/settings" },
          ].map((item, index) => (
            <ListItem key={index} sx={{ justifyContent: isOpen ? "flex-start" : "center", my: 1 }}>
              <IconButton
                component={Link}
                to={item.path}
                sx={{
                  backgroundColor: "#3498db",
                  color: "white",
                  width: 50,
                  height: 50,
                  borderRadius: "8px",
                  "&:hover": { backgroundColor: "#1f78c1" },
                  mr: isOpen ? 2 : 0,
                }}
              >
                {item.icon}
              </IconButton>
              {isOpen && <Typography variant="body2">{item.text}</Typography>}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
