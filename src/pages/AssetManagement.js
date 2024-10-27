import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Box, Paper, List, ListItem, ListItemText } from '@mui/material';
import { getTeamAssets } from '../services/AssetService';

const AssetManagementPage = () => {
  const [ownedAssets, setOwnedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Fetch owned assets from OpenMetadata API
  useEffect(() => {
    const fetchOwnedAssets = async () => {
      setLoading(true);
      try {
        const teamName = sessionStorage.getItem('teamName');
        if (!teamName) {
          console.error('Team name is missing or not set.');
          setError(true);
          setLoading(false);
          return;
        }
        const fetchedAssets = await getTeamAssets(teamName);
        setOwnedAssets(fetchedAssets);
        setLoading(false);
      } catch (e) {
        console.error('Failed to fetch assets', e);
        setError(true);
        setLoading(false);
      }
    };

    fetchOwnedAssets();
  }, []);

  const handleViewSuggestions = (assetId) => {
    // Navigate to the MetadataSuggestions page with assetId
    navigate(`/suggestions/${assetId}`);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography color="error">
          Error occurred while fetching assets or team name is missing. Please log in again.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Box>
    );
  }

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
                  primary={asset.displayName}
                  secondary={`Last updated: ${asset.updatedAt}`}
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
