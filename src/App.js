import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AssetManagement from './pages/AssetManagement';
import ClaimAssetsPage from './pages/ClaimAssetsPage';
import MetadataSuggestions from './pages/MetadataSuggestions';
import Login from './pages/Login';
import AdminSettingsPage from './pages/AdminSettingsPage';
import Register from './pages/Register';
import { AppBar, Toolbar, Button, CssBaseline } from '@mui/material';
import { GlobalProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [authenticated, setAuthenticated] = useState(
    sessionStorage.getItem('isAuthenticated') === 'true'
  );
  const [userRole, setUserRole] = useState(sessionStorage.getItem('userRole') || '');

  // Sync authentication and role state on component mount
  useEffect(() => {
    setAuthenticated(sessionStorage.getItem('isAuthenticated') === 'true');
    setUserRole(sessionStorage.getItem('userRole'));
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('userRole');
    setAuthenticated(false);
    setUserRole('');
  };

  return (
    <GlobalProvider>
      <AuthProvider>
        <>
          <CssBaseline />
          <Router>
            {authenticated && (
              <AppBar position="static">
                <Toolbar>
                  <Button color="inherit" href="/claim-assets">Claim Assets</Button>
                  <Button color="inherit" href="/asset-management">Asset Management</Button>
                  {userRole === 'admin' && (
                    <Button color="inherit" href="/admin-settings">Admin Settings</Button>
                  )}
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </Toolbar>
              </AppBar>
            )}

            <Routes>
              <Route
                path="/"
                element={
                  authenticated ? (
                    <Navigate to="/asset-management" />
                  ) : (
                    <Login
                      onLogin={(role) => {
                        setAuthenticated(true);
                        setUserRole(role);
                        sessionStorage.setItem('userRole', role); // Store user role
                      }}
                    />
                  )
                }
              />
              <Route path="/register" element={<Register />} />
              <Route
                path="/claim-assets"
                element={authenticated ? <ClaimAssetsPage /> : <Navigate to="/" />}
              />
              <Route
                path="/asset-management"
                element={authenticated ? <AssetManagement /> : <Navigate to="/" />}
              />
              <Route
                path="/suggestions/:assetId"
                element={authenticated ? <MetadataSuggestions /> : <Navigate to="/" />}
              />
              {userRole === 'admin' && (
                <Route
                  path="/admin-settings"
                  element={authenticated ? <AdminSettingsPage /> : <Navigate to="/" />}
                />
              )}
            </Routes>
          </Router>
        </>
      </AuthProvider>
    </GlobalProvider>
  );
}

export default App;
