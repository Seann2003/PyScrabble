  import './App.css';
  import axios from 'axios';
  import React, { useState, useEffect } from 'react';
  import { BrowserRouter as Router} from 'react-router-dom';

  import ErrorPage from './404.tsx';
  import { createBrowserRouter } from 'react-router-dom';
  import AppContent from './AppContent.tsx';

  const router = createBrowserRouter([
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  function App() { 
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const checkAuth = async () => {
      try {
          const response = await axios.get('http://localhost:3000/api/protected', { withCredentials: true });
          if (response.status === 200) {
              setIsAuthenticated(true);
          }
      } catch (error) {
          setIsAuthenticated(false);
      }
    };
    useEffect(() => {

      checkAuth();
    }, []);

    return (
      <Router>
          {/* Decide to separate routes from App.tsx using AppContent because can't rerender the header */}
          <AppContent isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} checkAuthStatus={checkAuth} />
      </Router>
    );
  }
  
  export default App;