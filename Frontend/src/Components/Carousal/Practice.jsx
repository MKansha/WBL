
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion, AnimatePresence } from "framer-motion";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const HeroSection = styled(motion.div)(({ theme }) => ({
  height: "90vh",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  overflow: "hidden",
  "&:after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // ✅ Dark overlay
    zIndex: 0, // ✅ Lower z-index to prevent navbar blockage
    pointerEvents: "none", // ✅ Allow clicks through overlay
  },
}));

const NavigationArrows = styled(Box)({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
});

const ArrowButton = styled(IconButton)({
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

export default function Practice({ setShowModal }) {
  const [sliders, setSliders] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [primaryColor, setPrimaryColor] = useState("#007bff");

  useEffect(() => {
    fetchSliders();
    fetchPrimaryColor();
  }, []);

  const fetchSliders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sliders`);
      setSliders(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  const fetchPrimaryColor = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings`);
      setPrimaryColor(response.data.primary_color);
    } catch (error) {
      console.error("Error fetching primary color:", error);
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliders.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);

  useEffect(() => {
    if (sliders.length > 0) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [currentSlide, sliders.length]);

  return (
    <Box sx={{ position: "relative", height: "90vh", zIndex: 1 }}> {/* ✅ Ensures hero section is below navbar */}
      <Box sx={{ position: "relative", height: "90vh", overflow: "hidden" }}>
        <AnimatePresence>
          {sliders.length > 0 ? (
            sliders.map((slide, index) =>
              index === currentSlide ? (
                <HeroSection
                  key={slide.id || index}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 1 }}
                  style={{
                    backgroundImage: `url(${slide.image || ""})`,
                  }}
                >
                  <Container maxWidth="xl" sx={{ height: "100%", zIndex: 2 }}> {/* ✅ Keeps content clickable */}
                    <Grid container sx={{ height: "100%" }}>
                      <Grid
                        item
                        xs={12}
                        md={isMediumScreen ? 12 : 9}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: isMediumScreen ? "center" : "flex-start",
                          padding: isMediumScreen ? "" : "100px",
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: "800px",
                            mt: 8,
                            textAlign: isMediumScreen ? "center" : "left",
                          }}
                        >
                          <Typography
                            variant="h1"
                            sx={{
                              fontWeight: 700,
                              color: "#fff",
                              fontSize: {
                                xs: "2.5rem",
                                sm: "3rem",
                                md: "3.5rem",
                              },
                              lineHeight: 1.2,
                              mb: 2,
                            }}
                          >
                            {slide?.title || "Default Title"}
                          </Typography>

                          <Typography
                            variant="h6"
                            sx={{
                              color: "#ffffff",
                              opacity: 0.9,
                              mb: 4,
                              fontSize: {
                                xs: "1.2rem",
                                sm: "1.3rem",
                                md: "1.5rem",
                              },
                            }}
                          >
                            {slide?.subtitle || "Default Subtitle"}
                          </Typography>

                          <Button
                            variant="contained"
                            onClick={() => setShowModal(true)}
                            size="large"
                            sx={{
                              backgroundColor: primaryColor,
                              "&:hover": {
                                backgroundColor: primaryColor,
                              },
                              borderRadius: "4px",
                              padding: "12px 28px",
                              fontSize: "1rem",
                              zIndex: 10,
                            }}
                          >
                            Get a Quote
                          </Button>
                        </Box>
                      </Grid>
                      {!isMediumScreen && (
                        <Grid
                          item
                          md={3}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <NavigationArrows>
                            <ArrowButton onClick={prevSlide}>
                              <ChevronLeftIcon />
                            </ArrowButton>
                            <ArrowButton onClick={nextSlide}>
                              <ChevronRightIcon />
                            </ArrowButton>
                          </NavigationArrows>
                        </Grid>
                      )}
                    </Grid>
                  </Container>
                </HeroSection>
              ) : null
            )
          ) : (
            <Typography
              variant="h6"
              sx={{ color: "#fff", textAlign: "center", mt: 4 }}
            >
              {/* Loading slides... */}
            </Typography>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
