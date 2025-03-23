import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, MenuItem, Box, Typography, Grid, Paper, Container } from "@mui/material";
import axios from "axios";

export default function ContactForm({ color }) {
  const [errors, setErrors] = useState({});
  const [sections, setSections] = useState([]); // Stores services from API
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const [formHeight, setFormHeight] = useState("auto");

  useEffect(() => {
    if (formRef.current) {
      setFormHeight(formRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    axios
      .get(`${API_BASE_URL}/services`)
      .then((response) => {
        setSections(response.data); // Store services
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  // Regex-based validation
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!/^[a-zA-Z\s]+$/.test(value)) error = "Only letters and spaces allowed.";
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format.";
        break;
      case "phone":
        if (!/^\d{10}$/.test(value)) error = "Phone number must be 10 digits.";
        break;
      case "message":
        if (value.trim().length < 10) error = "Message must be at least 10 characters.";
        break;
      case "service":
        if (!value) error = "Please select a service.";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
      await axios.post(`${API_BASE_URL}/inquiries`, formData);
      alert("Inquiry submitted successfully!");

      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 5 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left Side - Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }} ref={formRef}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Get in <span style={{ color: color }}>touch</span>
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={3}>
              We'd love to hear from you! Reach out for inquiries, support, or logistics solutions.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Name */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    name="name"
                    value={formData.name}
                    error={!!errors.name}
                    helperText={errors.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Phone */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Phone"
                    variant="outlined"
                    name="phone"
                    value={formData.phone}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Message */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Let's talk about your Message"
                    variant="outlined"
                    multiline
                    rows={3}
                    name="message"
                    value={formData.message}
                    error={!!errors.message}
                    helperText={errors.message}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Service Selection (Dropdown from API) */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    select
                    label="Select The Service You Need"
                    variant="outlined"
                    name="service"
                    value={formData.service}
                    error={!!errors.service}
                    helperText={errors.service}
                    onChange={handleChange}
                    required
                  >
                    <MenuItem value="">Select a Service</MenuItem>
                    {sections.map((section, index) => (
                      <MenuItem key={index} value={section.title}>
                        {section.title}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Email */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="E-mail"
                    variant="outlined"
                    name="email"
                    value={formData.email}
                    error={!!errors.email}
                    helperText={errors.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: color, color: "white", fontWeight: 600 }}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "SUBMIT"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        {/* Right Side - Location Map */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: 3,
              height: formHeight,
            }}
          >
            <iframe
              title="Location"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ borderRadius: "12px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d76217.08214153776!2d78.11747815515825!3d8.780524063293598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b03efbd8915ece7%3A0xa16e08bfc10fccf7!2sIndev%20Logistics%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1742024302804!5m2!1sen!2sin"
              allowFullScreen
            ></iframe>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
