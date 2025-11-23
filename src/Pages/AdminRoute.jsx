// src/Pages/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react'; // Using lucide-react for a loader icon

const AdminRoute = () => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    // Show a loading spinner while the auth context is initializing
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-brand-green" />
      </div>
    );
  }

  // Check if user is authenticated AND has the 'admin' role
  if (isAuthenticated && user?.role === 'admin') {
    return <Outlet />; // User is authenticated and is an admin, so render the child routes
  }

  if (isAuthenticated && user?.role !== 'admin') {
    // User is logged in but NOT an admin, redirect them to the homepage
    return <Navigate to="/" replace />;
  }

  // User is not authenticated, redirect them to the login page
  return <Navigate to="/login" replace />;
};

export default AdminRoute;