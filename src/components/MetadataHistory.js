import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const MetadataHistory = ({ history }) => (
  <div>
    {history.map((version, index) => (
      <Accordion key={index}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Version {version.version}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{version.metadata.description}</Typography>
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
);

export default MetadataHistory;
