import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [apiToken, setApiToken] = useState(sessionStorage.getItem('apiToken') || '');

  return (
    <GlobalContext.Provider value={{ apiToken, setApiToken }}>
      {children}
    </GlobalContext.Provider>
  );
};
