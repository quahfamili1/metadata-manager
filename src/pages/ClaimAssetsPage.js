import React, { useState, useEffect, useContext } from 'react';
import { fetchUnownedAssets } from '../api/OpenMetadataAPI';
import { Box, Paper, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { claimAsset } from '../api/FastAPI'; // Import claimAsset API call

const ClaimAssetsPage = () => {
  const [assets, setAssets] = useState([]);

  // Hardcoded user information
  const userId = 'user_123'; // You can replace this with actual user data in future

  const fetchAssets = async () => {
    const unownedAssets = await fetchUnownedAssets();
    setAssets(unownedAssets);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleClaim = async (assetId) => {
    try {
      const claimData = {
        userId: userId, // Hardcoded userId
      };

      // Call API to claim the asset
      await claimAsset(assetId, claimData);

      // Optionally, refresh the asset list after a claim
      fetchAssets();

      console.log(`Asset with ID ${assetId} claimed by ${userId}`);
    } catch (error) {
      console.error('Error claiming asset:', error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Claim Assets
      </Typography>

      {assets.length === 0 ? (
        <Typography variant="body1">No unowned assets available for claim.</Typography>
      ) : (
        <List sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {assets.map((asset) => (
            <ListItem key={asset.id} sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, marginBottom: 2 }}>
              <Paper elevation={2} sx={{ padding: 2, width: '100%' }}>
                <ListItemText
                  primary={
                    <Typography variant="h6">
                      {asset.displayName || 'Unnamed Asset'}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        <strong>ID:</strong> {asset.id}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Last Updated:</strong> {asset.updatedAt}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Data Type:</strong> {asset.dataType || 'Unknown'}
                      </Typography>
                    </>
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClaim(asset.id)}
                  sx={{ marginTop: 2 }}
                >
                  Claim
                </Button>
              </Paper>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ClaimAssetsPage;
