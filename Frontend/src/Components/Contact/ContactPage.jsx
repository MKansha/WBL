import React from "react";
import { Container, Typography, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";

const ContactPage = ({ color }) => {
  return (
    <Box sx={{ backgroundColor: "#f8f9fa", py: 5 }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Typography variant="body2" color="textSecondary">
          Home / <span style={{ color }}>Contact</span>
        </Typography>

        {/* Title */}
        <Typography variant="h3" fontWeight="bold" sx={{ color }} mt={2}>
       Contact
        </Typography>

        {/* Description */}
        <Typography variant="body1" color="textSecondary" mt={2}>
        We’re here to assist you with all your logistics needs. Get in touch with us for inquiries, support, or personalized solutions.
        </Typography>
      </Container>
    </Box>
  );
};

export default ContactPage;
