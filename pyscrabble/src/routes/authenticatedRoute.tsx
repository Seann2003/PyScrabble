import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthenticatedRouteProps {
  adminOnly?: boolean;
  children?: React.ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({adminOnly = false, children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        return <Navigate to="/error" />;
    }

    if (adminOnly) {
        const userType = localStorage.getItem('userType');
        if (userType !== '2') {
            return <Navigate to="/error" />;
        }
    }

    return children ? <>{children}</> : <Outlet />;
};

export default AuthenticatedRoute;