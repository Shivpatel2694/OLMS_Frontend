import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
      setIsAuthenticated(!!authToken);
    };
    const role = localStorage.getItem('role') || sessionStorage.getItem('role');
    if(role === 'ADMIN')
      setIsAdmin(true);

    checkAuthStatus();
    
    // Add event listener for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    await axios.post('http://localhost:8080/api/auth/logout')
    
    setIsAuthenticated(false);
    if(isAdmin === true)
      setIsAdmin(false);
    navigate('/login');
    
  };

  // Function to determine if a path is active
  const isActivePath = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  // Get link class based on active state
  const getLinkClass = (path) => {
    const baseClass = "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
    return isActivePath(path) 
      ? `${baseClass} border-primary-light text-primary-darker` 
      : `${baseClass} border-transparent text-primary-medium hover:text-primary-dark`;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-primary-light flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-primary-darker">LeaveEase</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className={getLinkClass('/')}>
                Home
              </Link>
              <Link to="/features" className={getLinkClass('/features')}>
                Features
              </Link>
              <Link to="/about" className={getLinkClass('/about')}>
                About
              </Link>
              {isAuthenticated?<Link to="/holidays" className={getLinkClass('/holidays')}>
                Holidays
              </Link>:<></>}
              {(isAdmin && isAuthenticated)?
                <Link to="/managers" className={getLinkClass('/managers')}>
                  Managers
                </Link> 
                :
                <></>
              }
              {(isAdmin && isAuthenticated)?
                <Link to="/admin/dashboard" className={getLinkClass('/admin')}>
                  Admin
                </Link>
                :
                <></>
              }
              {(!isAdmin && isAuthenticated)?
                <Link to="/dashboard" className={getLinkClass('/dashboard')}>
                  Dashboard
                </Link>
                :
                <></>
              }
              {(isAuthenticated)?
                <Link to="/history" className={getLinkClass('/history')}>
                  History
                </Link>
                :
                <></>
              }
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-primary-light bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-3 inline-flex items-center px-4 py-2 border border-primary-light text-sm font-medium rounded-md text-primary-light bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link to="/login" className="ml-3 inline-flex items-center px-4 py-2 border border-primary-light text-sm font-medium rounded-md text-primary-light bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light">
                Login
              </Link>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-primary-medium hover:text-primary-dark hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-light"
            >
              <span className="sr-only">Open main menu</span>
              <svg className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;