import React, { createContext, useState, useContext } from "react";

// Create the Loader Context
const LoaderContext = createContext();

// Loader Provider Component
export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Custom Hook for easy access
export const useLoader = () => useContext(LoaderContext);
