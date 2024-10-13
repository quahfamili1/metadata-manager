import React, { useState, useEffect } from 'react';
import { fetchUnownedAssets } from '../api/OpenMetadataAPI';
import { Box, Paper, Typography, Button } from '@mui/material';

const ClaimAssetsPage = () => {
  const apiToken = sessionStorage.getItem('apiToken'); // Retrieve the API token from sessionStorage
  const [assets, setAssets] = useState([]);

  const fetchAssets = async () => {
    if (apiToken) {
      const unownedAssets = await fetchUnownedAssets(apiToken); // Use the apiToken from sessionStorage
      setAssets(unownedAssets);
    } else {
      console.error('API Token is not available');
    }
  };

  useEffect(() => {
    fetchAssets(); // Fetch assets when component mounts
  }, [apiToken]);

  const handleClaim = (assetId) => {
    console.log(`Claiming asset with ID: ${assetId}`);
    // Add logic to claim the asset
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Claim Assets
      </Typography>

      {/* If no assets are available */}
      {assets.length === 0 ? (
        <Typography variant="body1">No unowned assets available for claim.</Typography>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2, // Spacing between items
            justifyContent: 'center',
          }}
        >
          {assets.map((asset) => (
            <Paper
              key={asset.id}
              elevation={3}
              sx={{
                padding: 2,
                flex: '1 1 calc(33.333% - 16px)', // Each item takes 1/3rd of the row, minus 16px for spacing
                minWidth: '300px', // Minimum width for smaller screens
                boxSizing: 'border-box', // Ensure padding is included in width
                margin: '8px', // Add margin for spacing
              }}
            >
              <Typography variant="h6">{asset.displayName || 'Unnamed Asset'}</Typography>
              <Typography variant="body2">
                <strong>ID:</strong> {asset.id}
              </Typography>
              <Typography variant="body2">
                <strong>Last Updated:</strong> {asset.updatedAt}
              </Typography>
              <Typography variant="body2">
                <strong>Data Type:</strong> {asset.dataType || 'Unknown'}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClaim(asset.id)}
                sx={{ marginTop: 2 }}
              >
                Claim
              </Button>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ClaimAssetsPage;
