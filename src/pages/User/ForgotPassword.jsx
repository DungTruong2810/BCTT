import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put("http://localhost:8080/user/forgot-password", { email });
      if (response.status === 200) {
        setSuccess("Password reset instructions have been sent to your email.");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Delay navigation to show success message
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to send password reset instructions. Please try again.");
    }
  };

  return (
    <Container
      sx={{
        backgroundColor: "light",
        borderRadius: 5,
        boxShadow: 5,
        p: 4,
        mt: 5,
      }}
    >
      <Typography variant="h1" align="center" gutterBottom>
        QUÊN MẬT KHẨU
      </Typography>
      <form onSubmit={handleSubmit} style={{ padding: "0 20px" }}>
        <Box mb={3}>
          <TextField
            fullWidth
            required
            id="outlined-required"
            label="Email"
            placeholder="Nhập email"
            value={email}
            onChange={handleEmailChange}
          />
        </Box>
        {error && (
          <Box mb={3}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}
        {success && (
          <Box mb={3}>
            <Alert severity="success">{success}</Alert>
          </Box>
        )}
        <Box textAlign="center" my={3}>
          <Button type="submit" variant="outlined" color="primary" fullWidth>
            Lấy lại mật khẩu
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default ForgotPassword;
