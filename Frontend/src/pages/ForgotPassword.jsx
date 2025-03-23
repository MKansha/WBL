import { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, CircularProgress, Link, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      setMessage(response.data.message || "If your email exists, a reset link has been sent.");
    } catch (error) {
      setMessage("Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #2193b0, #6dd5ed)", // ✅ Gradient Background
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, textAlign: "center" }}>
          {/* ✅ Page Title */}
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Forgot Password
          </Typography>

          <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
            Enter your email and we’ll send you a reset link.
          </Typography>

          {/* ✅ Form */}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
            </Button>
          </Box>

          {/* ✅ Message Display */}
          {message && (
            <Typography variant="body2" sx={{ color: "green", mt: 2 }}>
              {message}
            </Typography>
          )}

          {/* ✅ Back to Login Link */}
          <Link onClick={() => navigate("/login")} underline="hover" sx={{ cursor: "pointer", mt: 3, display: "block" }}>
            Back to Login
          </Link>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
