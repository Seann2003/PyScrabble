import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import AuthenticatedHeader from './components/layout/AuthenticatedHeader';
import LoginPage from './views/registration/LoginPage';
import AdminPage from './views/admin/AdminPage';
// Import other components...

interface AppContentProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  checkAuthStatus: () => Promise<void>;
}

const AppContent: React.FC<AppContentProps> = ({ isAuthenticated, setIsAuthenticated, checkAuthStatus }) => {
  return (
    <>
      {isAuthenticated ? <AuthenticatedHeader setIsAuthenticated={setIsAuthenticated} /> : <Header />}
      <Routes>
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} checkAuthStatus={checkAuthStatus} />} />
        <Route path="/admin" element={<AdminPage />} />
        {/* Add other routes... */}
      </Routes>
    </>
  );
};

export default AppContent;