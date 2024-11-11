import React, { createContext, useContext, useState } from 'react';

// Create a Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the application
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set the role, called after login/signup
  const setRole = (role) => {
    setUserRole(role);
    setIsAuthenticated(true);
    localStorage.setItem('userRole', role);
    localStorage.setItem('isAuthenticated', 'true');
  };

  // Function to log out the user
  const logout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userRole');
    localStorage.removeItem('isAuthenticated');
  };

  // Retrieve role and authentication status from local storage on component mount
  React.useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    const authStatus = localStorage.getItem('isAuthenticated');
    
    if (storedRole && authStatus) {
      setUserRole(storedRole);
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, isAuthenticated, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
