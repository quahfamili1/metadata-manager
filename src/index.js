import React from 'react';
import ReactDOM from 'react-dom/client';  // Import createRoot
import App from './App';
import { GlobalProvider } from './context/GlobalContext';
import { AuthProvider } from './context/AuthContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AuthProvider>
  </React.StrictMode>
);