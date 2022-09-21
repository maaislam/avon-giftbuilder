import React, { useState, createContext } from 'react';

export const ChosenProductContext = createContext();

const ChosenProductContextProvider = ({ children }) => {
  const [chosenProduct, setChosenProduct] = useState(null);

  return <ChosenProductContext.Provider value={{ chosenProduct, setChosenProduct }}>{children}</ChosenProductContext.Provider>;
};

export default ChosenProductContextProvider;
