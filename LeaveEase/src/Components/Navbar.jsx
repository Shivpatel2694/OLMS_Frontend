import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInitial, setUserInitial] = useState('');

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        setIsAuthenticated(true);
        
        // Get user data from localStorage or parse from JWT
        const userData = localStorage.getItem('userData');
        if (userData) {
          try {
            const parsedData = JSON.parse(userData);
            if (parsedData.name) {
              setUserInitial(parsedData.name.charAt(0).toUpperCase());
            }
          } catch (error) {
            console.error('Error parsing user data:', error);
            setUserInitial('U'); // Default initial if parsing fails
          }
        } else {
          setUserInitial('U'); // Default initial if no user data found
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
    
    // Add event listener for storage changes (in case user logs in/out in another tab)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    // Redirect to home or login page if needed
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
              <Link to="/" className="border-primary-light text-primary-darker inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/features" className="border-transparent text-primary-medium hover:text-primary-dark inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Features
              </Link>
              <Link to="/about" className="border-transparent text-primary-medium hover:text-primary-dark inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-primary-light rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-light text-white flex items-center justify-center font-medium">
                      {userInitial}
                    </div>
                  </button>
                </div>
                {/* Add dropdown menu here if needed */}
              </div>
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

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link to="/" className="bg-primary-light text-white block pl-3 pr-4 py-2 text-base font-medium">
            Home
          </Link>
          <Link to="/features" className="text-primary-medium hover:bg-gray-50 hover:text-primary-dark block pl-3 pr-4 py-2 text-base font-medium">
            Features
          </Link>
          <Link to="/about" className="text-primary-medium hover:bg-gray-50 hover:text-primary-dark block pl-3 pr-4 py-2 text-base font-medium">
            About
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          {isAuthenticated ? (
            <>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-light text-white flex items-center justify-center font-medium">
                    {userInitial}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-primary-darker">User Profile</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link to="/profile" className="block px-4 py-2 text-base font-medium text-primary-medium hover:text-primary-dark hover:bg-gray-50">
                  Your Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-primary-medium hover:text-primary-dark hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center px-4">
                <Link to="/login" className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-primary-light rounded-md hover:bg-opacity-90">
                  Login
                </Link>
              </div>
              <div className="mt-3 flex items-center px-4">
                <Link to="/register" className="block w-full px-4 py-2 text-center text-sm font-medium text-primary-light bg-white border border-primary-light rounded-md hover:bg-gray-50">
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;