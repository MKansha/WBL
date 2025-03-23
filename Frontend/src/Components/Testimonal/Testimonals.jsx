
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote"; // Import the quote icon

const theme = createTheme({
  palette: {
    primary: { main: "#007bff" },
    secondary: { main: "#6c757d" },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

const TestimonialCarousel = ({ color }) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/testimonials`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setTestimonials(response.data);
        } else {
          setTestimonials([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  }, []);

  const settings = {
    infinite: testimonials.length > 1,
    speed: 500,
    slidesToShow: Math.min(3, testimonials.length),
    slidesToScroll: 1,
    autoplay: testimonials.length > 1,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          py: 8,
          position: "relative",
          backgroundImage: `radial-gradient(circle,${color}, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
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
  Our Clients Say
</Typography>


          {testimonials.length === 0 ? (
            <Typography align="center" sx={{ mt: 4, fontStyle: "italic" }}>
              No testimonials available.
            </Typography>
          ) : (
            <Box
              sx={{
                ".slick-slide": {
                  padding: "0 10px",
                },
              }}
            >
              <Slider {...settings}>
                {testimonials.map((testimonial) => (
                  <Box key={testimonial.id || Math.random()} sx={{ p: 1 }}>
                   <Card
  sx={{
    height: "auto", 
    minHeight: "auto", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between", 
    boxShadow: 2,
    borderRadius: 2,
    overflow: "visible",
    position: "relative",
    p: 2,
  }}
>

<Box sx={{ display: "flex", mb: 2 }}>

<Avatar
  sx={{
    width: 80,
    height: 80,
    border: `4px solid ${color}`,
    backgroundColor: "white",
    color: color,
    fontSize: "32px",
    fontWeight: "bold",
    fontFamily: `"Poppins", "Roboto", "Arial", sans-serif`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textTransform: "uppercase",
    borderRadius: "50%",
    boxShadow: 3,
    position: "relative",
  }}
>
  {/* Quote icon positioned above the avatar */}
  <FormatQuoteIcon
    sx={{
      position: "absolute",
      top: -25,
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: 32,
      color: color,
      opacity: 0.8,
    }}
  />
  {testimonial.name?.charAt(0) || "U"}
</Avatar>


                        <Box sx={{ ml: 2 }}>
                          <Typography variant="h5" component="h3" sx={{ fontWeight: "bold", mb: 1 }}>
                            {testimonial.name}
                          </Typography>
                          <Chip
                            label={testimonial.district}
                            size="small"
                            sx={{
                              bgcolor: "rgba(0, 123, 255, 0.1)",
                              color: color,
                              fontWeight: 500,
                            }}
                          />
                        </Box>
                      </Box>
                      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                        <Typography variant="body1" color="text.secondary">
                          {testimonial.feedback || "No feedback available."}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Slider>
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default TestimonialCarousel;


