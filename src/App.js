import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AssetManagement from './pages/AssetManagement';
import ClaimAssetsPage from './pages/ClaimAssetsPage';
import MetadataSuggestions from './pages/MetadataSuggestions';
import Login from './pages/Login';  // Assuming you have a Login page
import AdminSettingsPage from './pages/AdminSettingsPage';  // Import AdminSettingsPage
import { AppBar, Toolbar, Button, CssBaseline } from '@mui/material';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return sessionStorage.getItem('isAuthenticated') === 'true';
};

function App() {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());

  // Sync authentication state on component mount
  useEffect(() => {
    setAuthenticated(isAuthenticated());
  }, []);

  return (
    <>
      <CssBaseline />
      <Router>
        {/* Only show AppBar if the user is authenticated */}
        {authenticated && (
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" href="/claim-assets">Claim Assets</Button>
              <Button color="inherit" href="/asset-management">Asset Management</Button>
              <Button color="inherit" href="/admin-settings">Admin Settings</Button> {/* New button for Admin Settings */}
              <Button
                color="inherit"
                onClick={() => {
                  sessionStorage.removeItem('isAuthenticated');
                  setAuthenticated(false);  // Log out and update state
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        )}

        <Routes>
          {/* Login Page - Default route */}
          <Route
            path="/"
            element={
              authenticated ? (
                <Navigate to="/asset-management" />
              ) : (
                <Login onLogin={() => setAuthenticated(true)} />
              )
            }
          />

          {/* Claim Assets Page - Protected Route */}
          <Route
            path="/claim-assets"
            element={authenticated ? <ClaimAssetsPage /> : <Navigate to="/" />}
          />

          {/* Asset Management Page - Protected Route */}
          <Route
            path="/asset-management"
            element={authenticated ? <AssetManagement /> : <Navigate to="/" />}
          />

          {/* Metadata Suggestions Page - Protected Route */}
          <Route
            path="/suggestions/:assetId"
            element={authenticated ? <MetadataSuggestions /> : <Navigate to="/" />}
          />

          {/* Admin Settings Page - Protected Route */}
          <Route
            path="/admin-settings"
            element={authenticated ? <AdminSettingsPage /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
