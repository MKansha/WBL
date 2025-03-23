import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Box, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import shipment from "../../assets/images/worker.png";
import backgroundImage from "../../assets/images/Background.png";

export default function ShipmentControl({ color }) {
  const metrics = [
    { label: "Delivered Packages", value: 450 },
    { label: "Countries Covered", value: 45 },
    { label: "Satisfied Clients", value: 670 },
    { label: "Tons of Goods", value: 1500 },
  ];

  const [animatedValues, setAnimatedValues] = useState(
    metrics.reduce((acc, metric) => ({ ...acc, [metric.label]: 1 }), {}) // Start all values at 1
  );

  useEffect(() => {
    const intervals = metrics.map((metric) => {
      return setInterval(() => {
        setAnimatedValues((prevValues) => {
          const currentValue = prevValues[metric.label];
          if (currentValue < metric.value) {
            return {
              ...prevValues,
              [metric.label]: Math.min(currentValue + Math.ceil(metric.value / 50), metric.value),
            };
          }
          clearInterval(intervals[metrics.indexOf(metric)]); // Stop interval when done
          return prevValues;
        });
      }, 30); // Update every 30ms for smooth animation
    });

    return () => intervals.forEach(clearInterval); // Cleanup intervals
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            paddingTop: 2,
            paddingX: { xs: 3, md: 8 },
            borderRadius: { xs: 0, md: 2 },
            boxShadow: { xs: "none", md: 3 },
            border: { xs: "none", md: `2.5px solid ${color}` },
            width: "100%",
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <img
                src={shipment}
                alt="Worker on Call"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Grid>

            <Grid item xs={12} md={6} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography variant="h4" fontWeight={700} gutterBottom>
                We Help You Take Full Control of Your Shipments
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                At WE BELIEVE LOGISTICS, we provide you with complete visibility
                and control over your cargo. From pickup to final delivery, our
                tracking systems and dedicated team ensure transparency and
                peace of mind.
              </Typography>

              {/* Bullet Points */}
              <Box>
                {[
                  "Flexible Freight Options - Air, sea, rail, and road.",
                  "Customs Clearance Assistance - Hassle-free support.",
                  "Detailed tracking for shipments and processes.",
                ].map((item, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: { xs: "center", md: "flex-start" },
                      mb: 1,
                    }}
                  >
                    <CheckCircle sx={{ color: color, mr: 1 }} />
                    {item}
                  </Typography>
                ))}
              </Box>

              <NavLink 
  to="/services" 
  style={{ textDecoration: "none" }}
  onClick={() => window.scrollTo(0, 0)} 
>
  <Button
    variant="contained"
    size="large"
    sx={{ mt: 2, backgroundColor: color, color: "#fff" }}
  >
    Read More
  </Button>
</NavLink>

            </Grid>
          </Grid>
        </Box>

        {/* Stats Section */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
          alignItems="center"
          spacing={{ xs: 2, sm: 4 }}
          sx={{ mt: 4, textAlign: "center" }}
        >
          {metrics.map((stat, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <Typography variant="h4" fontWeight={700} sx={{ color }}>
                {animatedValues[stat.label]}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </div>
  );
}
