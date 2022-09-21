import React, { useState, createContext } from 'react';

export const ButtonContext = createContext();

const ButtonContextProvider = ({ children }) => {
  const [button, setButton] = useState('');

  return <ButtonContext.Provider value={{ button, setButton }}>{children}</ButtonContext.Provider>;
};

export default ButtonContextProvider;
