// src/components/ClaimAssetsPage.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Snackbar,
  Alert,
  Tooltip,
  CircularProgress
} from '@mui/material';
import { fetchUnownedAssets, claimAsset } from '../api/FastAPI';

const ClaimAssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const unownedAssets = await fetchUnownedAssets();
      setAssets(unownedAssets);
    } catch (error) {
      console.error("Failed to fetch assets:", error);
      setSnackbar({
        open: true,
        message: 'Error fetching assets. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleClaim = async (assetId, assetType) => {
    try {
      const success = await claimAsset(assetId, assetType);
      if (success) {
        setSnackbar({
          open: true,
          message: `Successfully claimed asset ID ${assetId}`,
          severity: 'success'
        });
        setAssets(assets.filter(asset => asset.id !== assetId)); // Remove claimed asset from the list
      } else {
        throw new Error('Failed to update asset ownership');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error claiming asset. Please try again later.',
        severity: 'error'
      });
      console.error('Error claiming asset:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Claim Assets
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <CircularProgress size={50} />
        </Box>
      ) : (
        assets.length === 0 ? (
          <Typography variant="body1" component="div">No unowned assets available for claim.</Typography>
        ) : (
          <List sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {assets.map((asset) => (
              <ListItem
                key={asset.id}
                sx={{
                  width: { xs: '100%', sm: '48%', md: '30%' },
                  marginBottom: 2
                }}
              >
                <Paper elevation={2} sx={{ padding: 2, width: '100%' }}>
                  <Tooltip title={asset.displayName || 'Unnamed Asset'}>
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          component="span"
                          sx={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: 'block',
                            maxWidth: '100%',
                            wordBreak: 'break-all',
                          }}
                        >
                          {asset.displayName || 'Unnamed Asset'}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="div"><strong>ID:</strong> {asset.id}</Typography>
                          <Typography variant="body2" component="div"><strong>Last Updated:</strong> {new Date(asset.updatedAt).toLocaleString()}</Typography>
                          <Typography variant="body2" component="div"><strong>Data Type:</strong> {asset.dataType || 'Unknown'}</Typography>
                        </>
                      }
                    />
                  </Tooltip>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleClaim(asset.id, asset.dataType)}
                    sx={{ marginTop: 2 }}
                  >
                    Claim
                  </Button>
                </Paper>
              </ListItem>
            ))}
          </List>
        )
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          "& .MuiSnackbarContent-root": {
            fontSize: '1.1rem',
            padding: '1rem 1.5rem',
            maxWidth: '300px',
          }
        }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ClaimAssetsPage;
