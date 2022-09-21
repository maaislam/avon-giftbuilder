import React, { useState, createContext } from 'react';

export const PdpPopupContext = createContext();

const PdpPopupContextProvider = ({ children }) => {
  const [popupState, setPopupState] = useState(false);

  return <PdpPopupContext.Provider value={{ popupState, setPopupState }}>{children}</PdpPopupContext.Provider>;
};

export default PdpPopupContextProvider;
