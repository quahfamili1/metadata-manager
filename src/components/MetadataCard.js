import React from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const MetadataCard = ({ metadata, onRegenerate }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Metadata Suggestion</Typography>
      <TextField
        label="Description"
        value={metadata.description}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="secondary" onClick={onRegenerate}>
        Re-generate Metadata
      </Button>
    </CardContent>
  </Card>
);

export default MetadataCard;
