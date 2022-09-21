import React, { useState, createContext } from 'react';

export const selectedProductContext = createContext();

const SelectedProductContextProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <selectedProductContext.Provider value={{ selectedProducts, setSelectedProducts }}>
      {children}
    </selectedProductContext.Provider>
  );
};

export default SelectedProductContextProvider;
