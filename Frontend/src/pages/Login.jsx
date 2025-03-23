import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box, Link, CircularProgress } from "@mui/material";
import { NavLink } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_STORAGE_URL = process.env.REACT_APP_STORAGE_URL; // ✅ Background Image URL

const Login = () => {
  const { isAuthenticated, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState(""); // ✅ Store logo from /settings
  const [loading, setLoading] = useState(false);

  // ✅ Fetch logo from /settings API
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard"); 
    }
  }, [isAuthenticated, navigate]);
  useEffect(() => {
    axios.get(`${API_BASE_URL}/settings`)
      .then(response => {
        setLogo(`${API_STORAGE_URL}/storage/${response.data.logo}`);
      })
      .catch(error => console.error("Error fetching logo:", error));
  }, []);

  // ✅ Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password, navigate);
    setLoading(false);
  };

  return (
    <Box
    
      sx={{
        // backgroundImage: `url(${BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              style={{ width: 120, height: "auto", maxHeight: 120, objectFit: "contain" }}
            />
          )}
        </Box>
        <Container
  maxWidth="sm"
  sx={{
    backgroundColor: "rgba(255, 255, 255, 0.9)", // ✅ Slightly transparent white bg
    padding: 4,
    borderRadius: 2,
    boxShadow: 3,
    textAlign: "center",
    width: "100%",
    maxWidth: 420, // ✅ Ensure proper width
  }}
>
  {/* ✅ Logo Container with Proper Width & Spacing */}
  <Typography variant="h5" gutterBottom>
   Admin Login
  </Typography>

  {!isAuthenticated && (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        margin="normal"
      />

      {/* Forgot Password Link */}
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <NavLink to="/forgot-password" style={{ textDecoration: "none", color: "inherit" }}>
          Forgot Password?
        </NavLink>
      </Box>

      {/* Login Button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Login"}
      </Button>
    </Box>
  )}
</Container>
    </Box>
  );
};

export default Login;
