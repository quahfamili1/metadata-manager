import React from 'react';
import { Container, Typography } from '@mui/material';
import MetadataHistory from '../components/MetadataHistory';

const history = [
  { version: 1, metadata: { description: 'Initial description' } },
  { version: 2, metadata: { description: 'Updated description after LLM suggestion' } },
]; // Example data

const MetadataHistoryPage = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Metadata History
      </Typography>
      <MetadataHistory history={history} />
    </Container>
  );
};

export default MetadataHistoryPage;
