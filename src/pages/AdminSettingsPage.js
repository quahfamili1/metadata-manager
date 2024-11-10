import React, { useState } from 'react';
import { TextField, Button, Typography, Snackbar, Alert, Box, Divider, RadioGroup, FormControlLabel, Radio, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

const AdminSettingsPage = () => {
  const [databaseConfig, setDatabaseConfig] = useState({
    user: '',
    password: '',
    name: '',
    host: '',
    port: '',
  });
  const [openMetadataConfig, setOpenMetadataConfig] = useState({
    apiUrl: '',
    token: sessionStorage.getItem('apiToken') || '',
  });
  const [jwtSecretKey, setJwtSecretKey] = useState('');
  const [corsOrigins, setCorsOrigins] = useState('');
  const [debugConfig, setDebugConfig] = useState({
    debug: 'false',
    logLevel: 'INFO',
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSaveSettings = () => {
    sessionStorage.setItem('apiToken', openMetadataConfig.token);
    setOpenSnackbar(true);
  };

  const handleInputChange = (event, section, field) => {
    const value = event.target.value;
    if (section === 'database') {
      setDatabaseConfig({ ...databaseConfig, [field]: value });
    } else if (section === 'openMetadata') {
      setOpenMetadataConfig({ ...openMetadataConfig, [field]: value });
    } else if (section === 'jwt') {
      setJwtSecretKey(value);
    } else if (section === 'cors') {
      setCorsOrigins(value);
    } else if (section === 'debug') {
      setDebugConfig({ ...debugConfig, [field]: value });
    }
  };

  return (
    <Box
      sx={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
        Admin Settings
      </Typography>
      
      {/* Database Configuration */}
      <Typography variant="h6" gutterBottom>Database Configuration</Typography>
      <TextField label="User" placeholder="e.g., myuser" fullWidth margin="normal" value={databaseConfig.user} onChange={(e) => handleInputChange(e, 'database', 'user')} />
      <TextField label="Password" type="password" placeholder="e.g., mypassword" fullWidth margin="normal" value={databaseConfig.password} onChange={(e) => handleInputChange(e, 'database', 'password')} />
      <TextField label="Database Name" placeholder="e.g., mydatabase" fullWidth margin="normal" value={databaseConfig.name} onChange={(e) => handleInputChange(e, 'database', 'name')} />
      <TextField label="Host" placeholder="e.g., localhost" fullWidth margin="normal" value={databaseConfig.host} onChange={(e) => handleInputChange(e, 'database', 'host')} />
      <TextField label="Port" type="number" placeholder="e.g., 3307" fullWidth margin="normal" value={databaseConfig.port} onChange={(e) => handleInputChange(e, 'database', 'port')} />
      
      <Divider sx={{ my: 2 }} />

      {/* OpenMetadata API Configuration */}
      <Typography variant="h6" gutterBottom>OpenMetadata API Configuration</Typography>
      <TextField label="API URL" placeholder="e.g., http://localhost:8585/api/v1" fullWidth margin="normal" value={openMetadataConfig.apiUrl} onChange={(e) => handleInputChange(e, 'openMetadata', 'apiUrl')} />
      <TextField label="API Token" placeholder="Enter API Token" fullWidth margin="normal" value={openMetadataConfig.token} onChange={(e) => handleInputChange(e, 'openMetadata', 'token')} />

      <Divider sx={{ my: 2 }} />

      {/* JWT Configuration */}
      <Typography variant="h6" gutterBottom>JWT Configuration</Typography>
      <TextField label="JWT Secret Key" placeholder="e.g., your_jwt_secret_key" type="password" fullWidth margin="normal" value={jwtSecretKey} onChange={(e) => handleInputChange(e, 'jwt')} />

      <Divider sx={{ my: 2 }} />

      {/* CORS Configuration */}
      <Typography variant="h6" gutterBottom>CORS Configuration</Typography>
      <TextField label="CORS Origins" placeholder="e.g., http://localhost:3000" fullWidth margin="normal" value={corsOrigins} onChange={(e) => handleInputChange(e, 'cors')} />

      <Divider sx={{ my: 2 }} />

      {/* Debug and Logging Configuration */}
      <Typography variant="h6" gutterBottom>Debug and Logging Configuration</Typography>
      <FormControl component="fieldset" sx={{ marginBottom: '16px' }}>
        <Typography>Debug Mode</Typography>
        <RadioGroup
          row
          value={debugConfig.debug}
          onChange={(e) => handleInputChange(e, 'debug', 'debug')}
        >
          <FormControlLabel value="true" control={<Radio />} label="True" />
          <FormControlLabel value="false" control={<Radio />} label="False" />
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="log-level-label">Log Level</InputLabel>
        <Select
          labelId="log-level-label"
          id="log-level"
          value={debugConfig.logLevel}
          onChange={(e) => handleInputChange(e, 'debug', 'logLevel')}
        >
          <MenuItem value="DEBUG">DEBUG</MenuItem>
          <MenuItem value="INFO">INFO</MenuItem>
          <MenuItem value="WARNING">WARNING</MenuItem>
          <MenuItem value="ERROR">ERROR</MenuItem>
          <MenuItem value="CRITICAL">CRITICAL</MenuItem>
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSaveSettings}
        sx={{
          marginTop: '16px',
          padding: '10px',
          fontWeight: 'bold',
          textTransform: 'none',
        }}
      >
        Save Settings
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminSettingsPage;
