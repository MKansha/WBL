import React from "react";
import { Box, Typography } from "@mui/material";
import img1 from "../../assets/img/Client1.png";
import img2 from "../../assets/img/Client2.webp";
import img3 from "../../assets/img/Client3.png";
import img4 from "../../assets/img/Client4.png";

const Clients = ({ color }) => {
  const clientLogos = [img1, img2, img3, img4];

  return (
    <Box sx={{ textAlign: "center", py: 8, backgroundColor: "#091327" }}>
      {/* Top Brands Text */}
      <Typography
        variant="h4"
        component="h2"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 5,
          position: "relative",
          color: color, // ✅ Correct way to apply text color dynamically
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -16,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 4,
            // backgroundColor: color, // ✅ Fix: Use backgroundColor instead of bgcolor
            borderRadius: 2,
          },
        }}
      >
        Our Trusted Clients
      </Typography>

      {/* Client Logos Container */}
      <Box
  sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: { xs: 2, sm: 4, md: 6 },
    flexWrap: "wrap",
    px: 3,
  }}
>
  {clientLogos.map((logo, index) => (
    <Box
      key={index}
      component="img"
      src={logo}
      alt={`Client ${index + 1}`}
      onError={(e) => (e.target.src = "/images/default-client.png")}
      sx={{
        width: { xs: 120, sm: 150, md: 180 }, // Increased size
        height: "auto",
        objectFit: "contain",
        cursor: "pointer", // Cursor pointer on hover
        opacity: 0.6, // Reduced opacity in normal state
        transition: "opacity 0.3s ease, transform 0.3s ease",
        "&:hover": {
          opacity: 1, // Full opacity on hover
          transform: "scale(1.1)", // Add scale effect on hover
        },
      }}
    />
  ))}
</Box>

    </Box>
  );
};

export default Clients;
