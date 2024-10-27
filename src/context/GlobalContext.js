// src/context/GlobalContext.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user info globally
  const [assets, setAssets] = useState([]); // Store assets globally
  const [apiToken, setApiToken] = useState(sessionStorage.getItem('apiToken') || '');

  return (
    <GlobalContext.Provider value={{ user, setUser, assets, setAssets, apiToken, setApiToken }}>
      {children}
    </GlobalContext.Provider>
  );
};
