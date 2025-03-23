import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
export default function ServicesSlider({ color }) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    axios
      .get(`${API_BASE_URL}/services`)
      .then((response) => {
        setServices(response.data); // Store services
        console.log("Services fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const sliderSettings = {
    arrows: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // prevArrow: <CustomArrow direction="left" />,
    // nextArrow: <CustomArrow direction="right" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ textAlign: "center", py: 5 }}>
      {/* Section Title */}
      <Typography variant="h4" fontWeight="bold" sx={{ position: "relative" }}>
        <span style={{ color }}>All Services</span>
      </Typography>

      {/* Carousel */}
      <Box sx={{ mt: 3, position: "relative" }}>
        <Slider {...sliderSettings}>
          {services.map((service, index) => (
            <Box key={index} sx={{ px: 1.5 }}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:hover .overlay": { opacity: 1 },
                }}
              >
                {/* Service Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "8px" }}
                />

                {/* Hover Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: 0,
                    transition: "opacity 0.3s",
                    color: "white",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {service.title}
                  </Typography>
                  <NavLink to="/services" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{ mt: 2, backgroundColor: color, color: "#fff" }}
                  onClick={() => window.scrollTo(0, 0)} 
                >
                  Read More
                </Button>
              </NavLink>
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

// Custom Arrow Component
const CustomArrow = ({ direction, onClick }) => (
  <IconButton
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "white",
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)" },
      [direction === "left" ? "left" : "right"]: "-10px",
    }}
  >
    {direction === "left" ? <ArrowBackIos /> : <ArrowForwardIos />}
  </IconButton>
);
