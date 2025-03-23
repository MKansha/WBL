import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Avatar, Skeleton } from "@mui/material";
import { Email, Phone, Home } from "@mui/icons-material";
import axios from "axios";

const ContactInfo = ({ color }) => {
  const [contactData, setContactData] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/settings`);
        const data = response.data;

        // ✅ Clean phone numbers: Ensure "+91" stays attached and each number is on a new line
        if (data.phone) {
          data.phone = data.phone
            .trim()
            .split(/\s+/) // Split by any space
            .map((num) => (num.startsWith("+91") ? num : `+91 ${num}`)) // Ensure "+91" prefix
            .join("\n"); // Join with new lines
        }

        setContactData(data);
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchContactData();
  }, []);

  const contactDetails = contactData
    ? [
        { label: "Email", value: `${contactData.email} ${contactData.email2 ? " " + contactData.email2 : ""}`, icon: <Email /> },
        { label: "Phone", value: contactData.phone || "N/A", icon: <Phone /> }, // ✅ Phone numbers are now formatted correctly
        { label: "Address", value: contactData.address, icon: <Home /> }
      ]
    : [];

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography style={{ color: color }} variant="h4" fontWeight={600} gutterBottom>
        Contact Info
      </Typography>
      <Grid container spacing={3}>
        {(contactData ? contactDetails : Array.from(new Array(3))).map((detail, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                boxShadow: 3,
                textAlign: "center",
                bgcolor: "background.paper",
                height: 180,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {contactData ? (
                <>
                  <Avatar sx={{ bgcolor: contactData.primary_color, mb: 1, width: 56, height: 56 }}>
                    {detail.icon}
                  </Avatar>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {detail.label}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ whiteSpace: "pre-line", textAlign: "center" }} // ✅ Ensures correct multiline display
                  >
                    {detail.value}
                  </Typography>
                </>
              ) : (
                <>
                  <Skeleton variant="circular" width={56} height={56} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={80} height={20} />
                  <Skeleton variant="text" width={140} height={16} />
                </>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ContactInfo;
