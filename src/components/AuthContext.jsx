import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); 
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); 
  };

const check = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  console.log(isLoggedIn);
  setIsLoggedIn(isLoggedIn);
  return isLoggedIn;
};

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, check }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);