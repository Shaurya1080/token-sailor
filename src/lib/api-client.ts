
// Mock API implementation for demonstration purposes
// In a real app, this would connect to your actual backend API

// Mock database
const users: User[] = [];

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Mock API functions
export async function registerUser(data: RegisterData): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === data.email);
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  
  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
  };
  
  // Store user in our mock database
  users.push(newUser);
  
  // Generate mock token
  const token = `mock-jwt-token-${Date.now()}`;
  
  console.log("Registered user:", newUser);
  
  return {
    user: newUser,
    token,
  };
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user (in a real app, we'd also verify the password)
  const user = users.find(user => user.email === data.email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  
  // Generate mock token
  const token = `mock-jwt-token-${Date.now()}`;
  
  console.log("Logged in user:", user);
  
  return {
    user,
    token,
  };
}

// Auth token management
export function setAuthToken(token: string): void {
  localStorage.setItem("auth_token", token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem("auth_token");
}

export function removeAuthToken(): void {
  localStorage.removeItem("auth_token");
}

// Authenticated request helper (for future use)
export async function fetchWithAuth<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  
  // Mock API call that returns data immediately
  // In a real app, this would make a fetch request to your backend
  console.log(`Mock API call to ${endpoint}`, options);
  
  // This is a placeholder implementation
  return { success: true } as unknown as T;
}
