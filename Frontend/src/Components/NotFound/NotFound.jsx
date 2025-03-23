import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#121212",
        color: "white",
      }}
    >
      {/* Animated 404 Text */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h1" fontWeight={700} color="error">
          404
        </Typography>
      </motion.div>

      {/* Message */}
      <Typography variant="h5" sx={{ mt: 1 }}>
        Oops! The page you're looking for doesn't exist.
      </Typography>

      {/* Cool Animated Text */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Typography variant="body1" sx={{ mt: 2, color: "#b0b0b0" }}>
          It looks like you've lost your way. Let's get you back home.
        </Typography>
      </motion.div>

      {/* Button to Navigate Home */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, px: 4, py: 1.5, fontSize: "1.1rem", borderRadius: "8px" }}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </Button>
      </motion.div>
    </Box>
  );
};

export default NotFound;
