import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';

const AssetsTable = ({ assets }) => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Asset Name', width: 300 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'owner', headerName: 'Owner', width: 200 }
  ];

  const handleClaim = (assetId) => {
    // Call API to claim asset by ID
    console.log('Claiming asset:', assetId);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={assets} columns={columns} pageSize={5} />
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleClaim(assets[0]?.id)}
      >
        Claim Asset
      </Button>
    </div>
  );
};

export default AssetsTable;
