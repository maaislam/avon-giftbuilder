import React, { useState, createContext } from 'react';

export const selectedGiftOptionContext = createContext();

const SelectedGiftOptionContextProvider = ({ children }) => {
  const [selectedGiftOption, setSelectedGiftOption] = useState(null);

  return (
    <selectedGiftOptionContext.Provider value={{ selectedGiftOption, setSelectedGiftOption }}>
      {children}
    </selectedGiftOptionContext.Provider>
  );
};

export default SelectedGiftOptionContextProvider;
