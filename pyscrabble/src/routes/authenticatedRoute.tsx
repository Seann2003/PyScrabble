import React from "react";
import {Route, Navigate} from "react-router-dom";

const AuthenticatedRoute = ({ element: Element}) => {
    const isAuthenticated = localStorage.getItem('token') !== null;
    return isAuthenticated ? <Element /> : <Navigate to="/login" />;
}

export default AuthenticatedRoute;