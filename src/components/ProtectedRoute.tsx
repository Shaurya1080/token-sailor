
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state if still checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 max-w-sm mx-auto">
          <div className="flex space-x-4 animate-pulse">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-secondary rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-secondary rounded"></div>
                <div className="h-4 bg-secondary rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};
