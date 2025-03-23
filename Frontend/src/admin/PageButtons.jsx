import React from "react";
import { Box, Button } from "@mui/material"; // ✅ Import MUI components
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const PageButtons = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate function

  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}>
      <Button variant="contained" color="primary" onClick={() => navigate("/admin/settings")}>
        Settings
      </Button>
      <Button variant="contained" color="primary" onClick={() => navigate("/admin/bannerupload")}>
        Banner Upload {/* ✅ Fixed duplicate button text */}
      </Button>
      <Button variant="contained" color="secondary" onClick={() => navigate("/admin/testimonials")}>
        Testimonials
      </Button>
      <Button variant="contained" color="success" onClick={() => navigate("/admin/serviceuploader")}>
        Service Uploader
      </Button>
    </Box>
  );
};

export default PageButtons;
