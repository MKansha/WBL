import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../../assets/images/Background2.png";
import { NavLink } from "react-router-dom";
export default function HeroSection({ color }) {
  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        position: "relative",
      }}
    >
      {/* Overlay for better readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay effect
        }}
      />

      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom  sx={{
            // Adjust typography size for different screen sizes
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // For small screens use h5 style
          }}>
          Driven by Trust, Powered by Experience
        </Typography>
        <Typography variant="body1" gutterBottom>
          With over two decades of industry knowledge, we specialize in
          delivering safe, efficient, and personalized logistics solutions
          worldwide.
        </Typography>
        <NavLink to="/contact" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mt: 2, backgroundColor: color, color: "#fff" }}
                  onClick={() => window.scrollTo(0, 0)} 
                >
                  Read More
                </Button>
              </NavLink>
      </Container>
    </Box>
  );
}
