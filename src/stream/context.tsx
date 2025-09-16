// AppContext.js

import React, { useState } from 'react';

export const AppContext = React.createContext({
  channel: null,
  setChannel: channel => {},
});

export const StreamIOProvider = ({ children }) => {
  const [channel, setChannel] = useState();

  return (
    <AppContext.Provider value={{ channel, setChannel }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
