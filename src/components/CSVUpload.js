// src/components/CSVUpload.js

import React, { useState } from 'react';
import Papa from 'papaparse';
import {
  Box,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Alert,
  CircularProgress,
  Divider,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import { createTemporaryAsset } from '../api/FastAPI';

const CSVUpload = () => {
  const [parsedData, setParsedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Handle CSV file upload and parse
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setParsedData(results.data);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
          setSnackbar({ open: true, message: 'Error parsing CSV file.', severity: 'error' });
        }
      });
    }
  };

  // Submit parsed data to backend to create a temporary asset
  const handleSubmit = async () => {
    setLoading(true);
    try {
      for (const row of parsedData) {
        await createTemporaryAsset({
          title: row.Title,
          description: row.Description,
          attributes: row.Attributes
        });
      }
      setSnackbar({ open: true, message: 'Assets created successfully!', severity: 'success' });
      setParsedData([]); // Clear the data after successful upload
    } catch (error) {
      console.error("Error submitting assets:", error);
      setSnackbar({ open: true, message: 'Failed to create assets. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Clear uploaded data
  const handleClear = () => {
    setParsedData([]);
  };

  // Close the snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Upload CSV to Create Temporary Assets
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
        Please upload a CSV file with fields: <strong>Title</strong>, <strong>Description</strong>, and <strong>Attributes</strong>.
      </Typography>

      {/* File upload section */}
      <Box display="flex" alignItems="center" gap={2} sx={{ marginBottom: 3 }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<CloudUploadIcon />}
          sx={{ paddingX: 2 }}
        >
          Select CSV File
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            hidden
          />
        </Button>
        {parsedData.length > 0 && (
          <Box display="flex" alignItems="center" gap={1}>
            <CheckCircleIcon color="success" />
            <Typography variant="body2" color="text.secondary">
              {parsedData.length} records ready for upload
            </Typography>
            <IconButton size="small" color="error" onClick={handleClear}>
              <ClearIcon />
            </IconButton>
          </Box>
        )}
      </Box>

      {/* Display parsed data preview */}
      {parsedData.length > 0 && (
        <Paper elevation={2} sx={{ padding: 2, marginBottom: 3, maxHeight: 200, overflowY: 'auto' }}>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Preview Uploaded Data
          </Typography>
          <Divider sx={{ marginBottom: 1 }} />
          <List dense>
            {parsedData.slice(0, 5).map((row, index) => (
              <ListItem key={index} sx={{ display: 'block' }}>
                <ListItemText
                  primary={`Title: ${row.Title}`}
                  secondary={
                    <>
                      <Typography variant="body2"><strong>Description:</strong> {row.Description}</Typography>
                      <Typography variant="body2"><strong>Attributes:</strong> {row.Attributes}</Typography>
                    </>
                  }
                />
                <Divider sx={{ marginY: 1 }} />
              </ListItem>
            ))}
          </List>
          {parsedData.length > 5 && (
            <Typography variant="body2" color="text.secondary" align="center">
              ...and {parsedData.length - 5} more records
            </Typography>
          )}
        </Paper>
      )}

      {/* Submit button */}
      {loading ? (
        <CircularProgress />
      ) : (
        parsedData.length > 0 && (
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
            Submit to Backend
          </Button>
        )
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default CSVUpload;
