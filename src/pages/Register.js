import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { createUser } from '../services/UserService';

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser({ username, password, email, team });
      setSuccess(true);  // Set success to true
      setTimeout(() => {
        navigate('/');  // Redirect to login page after 2 seconds
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error);
      setError(true);
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
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <TextField
            label="Team"
            fullWidth
            margin="normal"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2" align="center">
              Error occurred while registering. Please try again.
            </Typography>
          )}
          {success && (
            <Typography color="primary" variant="body2" align="center">
              Registration successful! Redirecting to login...
            </Typography>
          )}
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Register;
