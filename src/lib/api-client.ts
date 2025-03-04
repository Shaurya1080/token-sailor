// Mock API implementation for demonstration purposes
// In a real app, this would connect to your actual backend API

// Mock database
interface UserWithPassword extends User {
  password: string;
}

const users: UserWithPassword[] = [];

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
  
  // Create new user with password
  const newUser: UserWithPassword = {
    id: `user-${Date.now()}`,
    name: data.name,
    email: data.email,
    password: data.password, // In a real app, this would be hashed
  };
  
  // Store user in our mock database
  users.push(newUser);
  
  // Generate mock token
  const token = `mock-jwt-token-${Date.now()}`;
  
  console.log("Registered user:", {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email
  });
  
  // Return user without password
  return {
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    },
    token,
  };
}

export async function loginUser(data: LoginData): Promise<AuthResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user and verify password
  const user = users.find(user => user.email === data.email);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  
  // Verify password
  if (user.password !== data.password) {
    throw new Error("Invalid email or password");
  }
  
  // Generate mock token
  const token = `mock-jwt-token-${Date.now()}`;
  
  console.log("Logged in user:", {
    id: user.id,
    name: user.name,
    email: user.email
  });
  
  // Return user without password
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    },
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
