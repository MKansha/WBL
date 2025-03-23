

import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Skeleton } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import axios from "axios";

const ServiceSection = ({ color }) => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/services`)
      .then((response) => {
        setSections(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {loading
        ? Array.from(new Array(3)).map((_, index) => (
            <Grid container spacing={4} alignItems="center" sx={{ mb: 8 }} key={index}>
              {/* Skeleton for Text Section */}
              <Grid item xs={12} md={6}>
                <Skeleton variant="text" width={200} height={40} />
                <Skeleton variant="text" width="90%" height={20} sx={{ my: 1 }} />
                <Skeleton variant="text" width="80%" height={20} sx={{ my: 1 }} />
                <Skeleton variant="rectangular" width="60%" height={24} sx={{ mt: 2 }} />
              </Grid>
              {/* Skeleton for Image Section */}
              <Grid item xs={12} md={6}>
                <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
              </Grid>
            </Grid>
          ))
        : sections.map((section, index) => (
            <Grid
              container
              spacing={4}
              alignItems="center"
              sx={{ mb: 8 }}
              key={index}
              direction={index % 2 === 0 ? "row" : "row-reverse"}
            >
              {/* Text Section */}
              <Grid item xs={12} md={6}>
                <Typography variant="h4" fontWeight={600} sx={{ color }} gutterBottom>
                  {section.title}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  {section.description}
                </Typography>
                {/* Bullet Points with Tick Icon */}
                <Box>
                  {section.points
                    ? section.points.map((point, i) => (
                        <Typography
                          key={i}
                          variant="body1"
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <CheckCircle sx={{ color: `${color} !important`, mr: 1 }} />
                          {point}
                        </Typography>
                      ))
                    : Array.from(new Array(3)).map((_, i) => (
                        <Skeleton key={i} variant="text" width="80%" height={20} sx={{ my: 1 }} />
                      ))}
                </Box>
              </Grid>
              {/* Image Section */}
              <Grid item xs={12} md={6}>
                <Box
                  sx={{ display: "flex", justifyContent: "center", borderRadius: 2, overflow: "hidden" }}
                >
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
                  ) : (
                    <img
                      src={section.image}
                      alt={section.title}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
          ))}
    </Container>
  );
};

export default ServiceSection;
