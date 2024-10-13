// src/pages/MetadataSuggestions.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, TextField, Box, Paper } from '@mui/material';

const MetadataSuggestions = () => {
  const { assetId } = useParams();  // Get the assetId from the URL
  const [suggestedMetadata, setSuggestedMetadata] = useState('');
  const [finalMetadata, setFinalMetadata] = useState('');

  // Simulate fetching metadata suggestions for the asset
  useEffect(() => {
    const fetchSuggestedMetadata = async () => {
      const suggestion = `AI-generated metadata suggestion for asset ${assetId}`;
      setSuggestedMetadata(suggestion);
      setFinalMetadata(suggestion);  // Set the initial value as the suggested metadata
    };
    fetchSuggestedMetadata();
  }, [assetId]);

  const handleRegenerate = () => {
    // Simulate re-generating a suggestion for the metadata
    const newSuggestion = `Regenerated AI suggestion for asset ${assetId}`;
    setSuggestedMetadata(newSuggestion);
    setFinalMetadata(newSuggestion);
  };

  const handleSubmit = () => {
    // Submit the final metadata
    console.log('Submitting final metadata:', finalMetadata);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Metadata Suggestions for Asset {assetId}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Suggested Metadata:
        </Typography>
        <Typography>{suggestedMetadata}</Typography>
        <Button variant="outlined" color="primary" sx={{ mt: 2 }} onClick={handleRegenerate}>
          Regenerate Suggestion
        </Button>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body1" gutterBottom>
            Adjust Final Metadata:
          </Typography>
          <TextField
            label="Final Metadata"
            fullWidth
            multiline
            rows={4}
            value={finalMetadata}
            onChange={(e) => setFinalMetadata(e.target.value)}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
            Submit Final Metadata
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MetadataSuggestions;
