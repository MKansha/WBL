import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, CircularProgress, Paper } from "@mui/material";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ResetPassword = () => {
  const { token } = useParams(); // ✅ Get token from URL
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Handle Reset Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    setMessage("");
  
    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password/${token}`, { 
        password, 
        password_confirmation: confirmPassword // ✅ Laravel requires this
      });
  
      setMessage(response.data.message || "Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #ff9966, #ff5e62)", // ✅ Gradient Background
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Reset Password
          </Typography>

          <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
            Enter your new password below.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="New Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
            </Button>
          </Box>

          {message && (
            <Typography variant="body2" sx={{ color: message.includes("successful") ? "green" : "red", mt: 2 }}>
              {message}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default ResetPassword;
