// AdminSettingsPage.js
import React, { useState } from 'react';

const AdminSettingsPage = () => {
  const [token, setToken] = useState(sessionStorage.getItem('apiToken') || '');

  const handleSaveToken = () => {
    if (!token) {
      alert('Please enter a valid API token');
      return;
    }

    // Save the token to sessionStorage
    sessionStorage.setItem('apiToken', token);
    alert('API Token saved!');
  };

  return (
    <div>
      <h1>Admin Settings</h1>
      <input
        type="text"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter API Token"
      />
      <button onClick={handleSaveToken}>Save API Token</button>
    </div>
  );
};

export default AdminSettingsPage;
