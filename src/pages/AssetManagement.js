// src/components/AssetManagementPage.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Tooltip
} from '@mui/material';
import { getTeamAssets } from '../services/AssetService';
import CSVUpload from '../components/CSVUpload'; // Import CSVUpload component

const AssetManagementPage = () => {
  const [ownedAssets, setOwnedAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOwnedAssets = async () => {
      setLoading(true);
      try {
        const teamName = sessionStorage.getItem('teamName');
        console.log("Team name from session:", teamName);  // Add this line to verify the value
        if (!teamName) {
          console.error('Team name is missing or not set.');
          setError(true);
          setLoading(false);
          return;
        }
        const fetchedAssets = await getTeamAssets(teamName);
        setOwnedAssets(fetchedAssets.team_assets);
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
      <Typography variant="h4" gutterBottom>
        Manage Your Data Assets
      </Typography>

      {/* CSV Upload Section */}
      <Box sx={{ marginBottom: 3 }}>
        <CSVUpload />
      </Box>

      {ownedAssets.length === 0 ? (
        <Typography>No owned assets found.</Typography>
      ) : (
        <List sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {ownedAssets.map((asset) => (
            <ListItem key={asset.id} sx={{ width: { xs: '100%', sm: '48%', md: '30%' }, marginBottom: 2 }}>
              <Paper elevation={2} sx={{ padding: 2, width: '100%' }}>
                <Tooltip title={asset.display_name || 'Unnamed Asset'}>
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
                        {asset.display_name || 'Unnamed Asset'}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" component="span">
                          <strong>Type:</strong> {asset.type || 'N/A'}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          <strong>Description:</strong> {asset.description || 'No description available'}
                        </Typography>
                        <br />
                        <Typography variant="body2" component="span">
                          <strong>Last updated:</strong> {new Date(asset.updated_at).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </Tooltip>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleViewSuggestions(asset.id)}
                  sx={{ marginTop: 2 }}
                >
                  View Metadata Suggestions
                </Button>
              </Paper>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AssetManagementPage;
