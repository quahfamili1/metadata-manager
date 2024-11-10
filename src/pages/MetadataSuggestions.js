import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Typography, TextField, Box, Paper, Grid, IconButton } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import MetadataService from '../services/MetadataService';

const MetadataSuggestions = () => {
  const { assetId } = useParams();
  const [metadata, setMetadata] = useState({
    displayName: '',
    description: '',
    attributes: [{ name: '', description: '' }],
    tag: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchSuggestedMetadata = async () => {
      try {
        const data = await MetadataService.getMetadataSuggestions(assetId);
        setMetadata(data); // Assuming API returns the required structure
        setIsEditing(true); // Enable the submit button after loading initial data
      } catch (error) {
        console.error("Error fetching metadata suggestions:", error);
      }
    };

    fetchSuggestedMetadata();
  }, [assetId]);

  const handleRegenerate = async () => {
    try {
      const data = await MetadataService.regenerateMetadata(
        assetId,
        metadata.displayName,
        metadata.attributes.map(attr => attr.name)
      );
      setMetadata(data); // Assuming regenerated metadata is returned in response
    } catch (error) {
      console.error('Error regenerating metadata:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      [field]: value,
    }));
    setIsEditing(true);
  };

  const handleAttributeChange = (index, key, value) => {
    const updatedAttributes = [...metadata.attributes];
    updatedAttributes[index][key] = value;
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      attributes: updatedAttributes,
    }));
    setIsEditing(true);
  };

  const handleAddAttribute = () => {
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      attributes: [...prevMetadata.attributes, { name: '', description: '' }],
    }));
    setIsEditing(true);
  };

  const handleRemoveAttribute = (index) => {
    const updatedAttributes = metadata.attributes.filter((_, i) => i !== index);
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      attributes: updatedAttributes,
    }));
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    try {
      await MetadataService.updateMetadata(assetId, metadata);
      alert('Metadata updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error submitting final metadata:', error);
    }
  };
  

  return (
    <Box sx={{ padding: 3 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Metadata Suggestions for Asset {assetId}
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Display Name"
              fullWidth
              value={metadata.displayName}
              onChange={(e) => handleInputChange('displayName', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={metadata.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Attributes
            </Typography>
            {metadata.attributes.map((attribute, index) => (
              <Grid container spacing={2} key={index} alignItems="center">
                <Grid item xs={5}>
                  <TextField
                    label={`Attribute ${index + 1}`}
                    fullWidth
                    value={attribute.name}
                    onChange={(e) => handleAttributeChange(index, 'name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Description"
                    fullWidth
                    value={attribute.description}
                    onChange={(e) => handleAttributeChange(index, 'description', e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton color="secondary" onClick={() => handleRemoveAttribute(index)}>
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              startIcon={<Add />}
              color="primary"
              sx={{ mt: 2 }}
              onClick={handleAddAttribute}
            >
              Add Attribute
            </Button>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Tag"
              fullWidth
              value={metadata.tag}
              onChange={(e) => handleInputChange('tag', e.target.value)}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="outlined" color="primary" onClick={handleRegenerate}>
            Regenerate Suggestion
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!isEditing}
          >
            Submit Final Metadata
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default MetadataSuggestions;
