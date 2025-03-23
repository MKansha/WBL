import React from "react";
import { Container, Typography, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutHead from "../../assets/images/AboutHead.png";

const Servicepage = ({ color }) => {
  return (
    <Box sx={{ backgroundColor: "#f8f9fa", py: 5 }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Typography variant="body2" color="textSecondary">
          Home / <span style={{ color }}>Services</span>
        </Typography>

        {/* Title */}
        <Typography variant="h3" fontWeight="bold" sx={{ color }} mt={2}>
        Services 
        </Typography>

        {/* Description */}
        <Typography variant="body1" color="textSecondary" mt={2}>
        At We Believe Logistics, we offer a comprehensive range of logistics solutions tailored to meet your specific needs. From import and export services to air, sea, and rail freight, our experienced team ensures safe, efficient, and timely delivery of your goods worldwide. Explore our services below to find the right solution for your business.
        </Typography>
      </Container>
    </Box>
  );
};

export default Servicepage;
