'use client'
// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Crear el Context
const UserContext = createContext();

// Crear el Provider
export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

// Crear el Hook personalizado
export const useUser = () => useContext(UserContext);
