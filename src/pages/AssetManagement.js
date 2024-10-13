// src/pages/AssetManagementPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';

const AssetManagementPage = () => {
  const [ownedAssets, setOwnedAssets] = useState([]);
  const navigate = useNavigate();

  // Simulate fetching owned assets from an API
  useEffect(() => {
    // Replace with actual API call
    const fetchOwnedAssets = async () => {
      const data = [
        { id: 1, name: 'Dataset A', description: 'Owned data asset A' },
        { id: 2, name: 'Dataset B', description: 'Owned data asset B' },
      ];
      setOwnedAssets(data);
    };
    fetchOwnedAssets();
  }, []);

  const handleViewSuggestions = (assetId) => {
    // Navigate to the MetadataSuggestions page with assetId
    navigate(`/suggestions/${assetId}`);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Manage Your Data Assets
        </Typography>
        {ownedAssets.length > 0 ? (
          <List>
            {ownedAssets.map((asset) => (
              <ListItem key={asset.id}>
                <ListItemText
                  primary={asset.name}
                  secondary={asset.description}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleViewSuggestions(asset.id)}
                >
                  View Metadata Suggestions
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No owned assets found.</Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AssetManagementPage;
