
import React from "react";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // If authenticated, redirect to dashboard
  if (isAuthenticated && !isLoading) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left space-y-6 lg:pr-8 animate-slideDown">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-2">
              Simple REST API
            </div>
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight">
              Authentication API
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              A clean, minimalist REST API with user authentication. Register, login, and manage user sessions with JWT tokens.
            </p>
            <div className="pt-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <div className="px-4 py-3 bg-white rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-400 mr-2"></div>
                    <div className="text-sm font-medium">Registration Endpoint</div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-white rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-400 mr-2"></div>
                    <div className="text-sm font-medium">Authentication Endpoint</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:w-auto animate-slideUp">
            <AuthForm />
          </div>
        </div>
      </div>
      
      <footer className="w-full text-center py-6 text-sm text-gray-500 mt-auto">
        <p>API Documentation - Endpoints and Usage</p>
      </footer>
    </div>
  );
};

export default Index;
