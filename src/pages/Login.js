import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  // Hardcoded credentials for now
  const hardcodedUser = {
    username: 'admin',
    password: 'password123',
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();  // Prevent the form from refreshing the page

    // Check hardcoded credentials
    if (username === hardcodedUser.username && password === hardcodedUser.password) {
      // Store authentication state in sessionStorage
      sessionStorage.setItem('isAuthenticated', 'true');
      // Trigger the onLogin function to update authentication state in App.js
      onLogin();
      // Navigate to the asset management page after successful login
      navigate('/asset-management');
    } else {
      setError(true);  // Show error if credentials are incorrect
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              Incorrect username or password.
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
