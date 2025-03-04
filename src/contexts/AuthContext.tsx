
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  User,
  RegisterData,
  LoginData,
  registerUser,
  loginUser,
  setAuthToken,
  getAuthToken,
  removeAuthToken,
} from "@/lib/api-client";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  register: (data: RegisterData) => Promise<void>;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      // In a real app, you'd validate the token with your API here
      // For now, we'll just simulate a user being logged in
      const simulatedUser = { 
        id: "simulated-id", 
        name: "Simulated User", 
        email: "user@example.com" 
      };
      setUser(simulatedUser);
    }
    setIsLoading(false);
  }, []);

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await registerUser(data);
      setUser(response.user);
      setAuthToken(response.token);
      toast.success("Registration successful");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    try {
      setIsLoading(true);
      const response = await loginUser(data);
      setUser(response.user);
      setAuthToken(response.token);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    removeAuthToken();
    toast.info("You have been logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
