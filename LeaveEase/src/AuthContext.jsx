import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios'; // Uncomment this when backend is ready

// Create Authentication Context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Check for saved token on initial load
  useEffect(() => {
    const checkSavedAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        
        if (token && rememberMe) {
          // Validate token with API if needed
          // For now, we'll just set the user based on saved data
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          setUser({ ...userData, token });
        } else if (token && !rememberMe) {
          // If token exists but remember me is not checked, clear storage
          // This handles cases where user didn't want to be remembered from previous session
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          sessionStorage.setItem('authToken', token);
          
          const userData = JSON.parse(localStorage.getItem('userData') || '{}');
          setUser({ ...userData, token });
        }
      } catch (err) {
        setError('Authentication failed. Please login again.');
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    checkSavedAuth();
  }, []);
  
  // Login function
  const login = async (email, password, rememberMe) => {
    setLoading(true);
    setError(null);
    
    try {
      // TEMPORARY: Allow any login while backend is not ready
      // Create a fake token and user data
      const token = 'temporary-fake-token-' + Math.random().toString(36).substring(2);
      const userData = {
        id: 1,
        name: email.split('@')[0], // Use part of email as name
        email: email,
        role: 'employee'
      };
      
      // Store authentication data based on remember me preference
      if (rememberMe) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('rememberMe', 'true');
      } else {
        // Use sessionStorage if remember me is not checked
        sessionStorage.setItem('authToken', token);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.setItem('rememberMe', 'false');
      }
      
      setUser({ ...userData, token });
      return true;
      
      
      // FUTURE IMPLEMENTATION with real backend:
      // Uncomment this when backend is ready and comment out the code above
      /*
      const response = await axios.post('http://localhost:8080/api/auth/login', { 
        email, 
        password 
      });
      
      const { token, user: userData } = response.data;
      
      // Store authentication data based on remember me preference
      if (rememberMe) {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('rememberMe', 'true');
      } else {
        // Use sessionStorage if remember me is not checked
        sessionStorage.setItem('authToken', token);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        localStorage.setItem('rememberMe', 'false');
      }
      
      setUser({ ...userData, token });
      return true;
      */
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Register function
  // const register = async (name, email, password) => {
    const register = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TEMPORARY: Allow any registration while backend is not ready
      return true;
      
      /* 
      // FUTURE IMPLEMENTATION with real backend:
      // Uncomment this when backend is ready and comment out the code above
      
      const response = await axios.post('/api/auth/register', {
        name,
        email,
        password
      });
      
      return true;
      */
    // } catch (err) {
    //   // setError(err.message || 'Registration failed. Please try again.');
    //   // return false;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    sessionStorage.removeItem('authToken');
    setUser(null);
    
    /* 
    // FUTURE IMPLEMENTATION with real backend:
    // Uncomment this when backend is ready
    
    // Optional: notify the backend about logout
    // axios.post('/api/auth/logout', {}, {
    //   headers: {
    //     Authorization: `Bearer ${user?.token}`
    //   }
    // }).catch(err => console.log('Logout notification error:', err));
    */
  };
  
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};