// pages/AdminApiKeyPage.js
import React, { useState } from 'react';
import { updateApiKey, getApiKey } from '../api/OpenMetadata';

const AdminApiKeyPage = () => {
  const [apiKey, setApiKey] = useState(getApiKey());

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = () => {
    updateApiKey(apiKey);
    alert('API key updated successfully');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin API Key Management</h1>
      <input
        type="text"
        value={apiKey}
        onChange={handleApiKeyChange}
        placeholder="Enter new API key"
        style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
      />
      <button onClick={handleSubmit} style={{ padding: '10px' }}>
        Update API Key
      </button>
    </div>
  );
};

export default AdminApiKeyPage;
