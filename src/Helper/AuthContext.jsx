import React, { createContext, useContext, useState } from 'react';

// Create a Context
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap around the application
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  // Function to set the role, called after login/signup
  const setRole = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role); // Optional: store role in local storage
  };

  // Retrieve role from local storage on component mount (optional)
  React.useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userRole, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
