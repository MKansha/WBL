import React, { useState, useEffect } from "react";
import { Container, Typography, Grid, Card, CardContent, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutHead from "../../assets/images/AboutHead.png";

const metrics = [
  { label: "Delivered Packages", value: 450 },
  { label: "Countries Covered", value: 45 },
  { label: "Satisfied Clients", value: 670 },
  { label: "Tons of Goods", value: 1500 },
];

const AboutPage = ({ color }) => {
  const [animatedValues, setAnimatedValues] = useState(
    metrics.reduce((acc, metric) => ({ ...acc, [metric.label]: 1 }), {})
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
          clearInterval(intervals[metrics.indexOf(metric)]); // Stop interval when completed
          return prevValues;
        });
      }, 30); // Update every 30ms for smooth animation
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <Box sx={{ backgroundColor: "#f8f9fa", py: 5 }}>
      <Container maxWidth="lg">
        {/* Breadcrumb */}
        <Typography variant="body2" color="textSecondary">
          Home / <span style={{ color }}>About Us</span>
        </Typography>

        {/* Title */}
        <Typography variant="h3" fontWeight="bold" sx={{ color }} mt={2}>
          About <span style={{ color }}>Us</span>
        </Typography>

        {/* Description */}
        <Typography variant="body1" color="textSecondary" mt={2}>
          Founded in <strong>2021</strong>, We Believe Logistics is a leading logistics company based in Tuticorin, India, 
          with a focus on providing domestic and international export and import services. With over 
          <strong> 20 years</strong> of experience in the shipping industry, we offer reliable and 
          efficient logistics solutions to meet all your cargo needs.
        </Typography>

        {/* Image Section */}
        <Box
          mt={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <img
            src={AboutHead}
            alt="Logistics"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Box>

        {/* Stats Section with Animation */}
        <Grid container spacing={3} mt={4}>
          {metrics.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ textAlign: "center", py: 3, boxShadow: 3, border: `2px solid ${color}` }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold" sx={{ color }}>
                    {animatedValues[stat.label]}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
