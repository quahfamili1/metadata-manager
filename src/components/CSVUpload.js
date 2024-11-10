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
import { uploadAssets } from '../services/AssetService';

const CSVUpload = () => {
  const [parsedData, setParsedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const parseCSV = (csvData) => {
    try {
      const parsed = Papa.parse(csvData, {
        header: true,
        skipEmptyLines: true,
        delimiter: ',', // Default delimiter
        quoteChar: '"',
        escapeChar: '"',
      });
      if (parsed.errors.length > 0) {
        console.error("CSV Parsing Error:", parsed.errors);
        setSnackbar({ open: true, message: "CSV Parsing Error", severity: "error" });
      }
      return parsed.data;
    } catch (error) {
      console.error("Error parsing CSV:", error);
      setSnackbar({ open: true, message: "Error parsing CSV", severity: "error" });
      return [];
    }
  };

  const parseNestedCSV = (str) => {
    if (!str || str.trim() === '') return [];
    // Use Papa.parse to parse the nested CSV string
    const parsed = Papa.parse(str, {
      delimiter: ',', // Assuming commas are used to separate entries
      quoteChar: '"',
      escapeChar: '"',
    });
    // Flatten the parsed data and trim whitespace
    return parsed.data.flat().map((item) => item.trim());
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const csvData = e.target.result;
      const data = parseCSV(csvData);
      setParsedData(data);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        const assets = parsedData.map((row) => {
            // Retrieve or set default values for 'attributes' and 'att_desc'
            const attributesField = row.attributes || row.Attributes || '';
            const attDescField = row.att_desc || row.Att_desc || '';

            // Parse the nested CSV for attributes and descriptions
            const attributesArray = parseNestedCSV(attributesField);
            const attDescArray = parseNestedCSV(attDescField);

            // Ensure `attDescArray` matches the length of `attributesArray` by filling with empty strings if needed
            while (attDescArray.length < attributesArray.length) {
                attDescArray.push('');
            }

            // Log to verify correct parsing and alignment of arrays
            console.log(`Asset Title: ${row.title || row.Title}`);
            console.log('Attributes:', attributesArray);
            console.log('Attribute Descriptions:', attDescArray);

            return {
                title: row.title || row.Title || '',
                description: row.description || row.Description || '',
                attributes: attributesArray,
                att_desc: attDescArray,
            };
        });

        // Log the final assets payload to be sent to the backend
        console.log("Final payload being sent to backend:", assets);

        const response = await uploadAssets(assets);

        if (response.success) {
            const uploadedAssetIds = response.created_assets.map(asset => asset.id); // Collect uploaded asset IDs
            sessionStorage.setItem('newlyUploadedAssets', JSON.stringify(uploadedAssetIds)); // Save in sessionStorage
            setSnackbar({ open: true, message: 'Assets created successfully!', severity: 'success' });
            setParsedData([]);
        } else {
            console.error("Error uploading assets:", response.error || response.errors);
            const errorMessage = response.error || (response.errors && response.errors.join(', ')) || 'Failed to create some assets.';
            setSnackbar({ open: true, message: errorMessage, severity: 'warning' });
        }
    } catch (error) {
        console.error("Error submitting assets:", error);
        setSnackbar({ open: true, message: 'Failed to create assets. Please try again.', severity: 'error' });
    } finally {
        setLoading(false);
    }
};

  const handleClear = () => {
    setParsedData([]);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Upload CSV to Create Assets in OpenMetadata
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
        Please upload a CSV file with fields: <strong>title</strong>, <strong>description</strong>, <strong>attributes</strong>, and <strong>att_desc</strong>.
      </Typography>

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
                  primary={`Title: ${row.title || row.Title}`}
                  secondary={
                    <>
                      <Typography variant="body2"><strong>Description:</strong> {row.description || row.Description}</Typography>
                      <Typography variant="body2"><strong>Attributes:</strong> {row.attributes || row.Attributes}</Typography>
                      <Typography variant="body2"><strong>Attribute Descriptions:</strong> {row.att_desc || row.Att_desc}</Typography>
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

      {loading ? (
        <CircularProgress />
      ) : (
        parsedData.length > 0 && (
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ marginTop: 2 }}>
            Submit to OpenMetadata
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
