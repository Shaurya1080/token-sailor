
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomButton } from "@/components/CustomButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Form validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const { login, register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(data);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const { confirmPassword, ...registerData } = data;
      await register(registerData);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-medium text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            {activeTab === "login" 
              ? "Sign in to your account" 
              : "Create your account"}
          </CardDescription>
        </CardHeader>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "login" | "register")}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-4 mx-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-0">
            <form onSubmit={loginForm.handleSubmit(handleLogin)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label 
                    htmlFor="login-email"
                    className={cn(
                      loginForm.formState.errors.email && "text-destructive"
                    )}
                  >
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    {...loginForm.register("email")}
                    className={cn(
                      "transition-all duration-200",
                      loginForm.formState.errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-destructive text-sm">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label 
                      htmlFor="login-password"
                      className={cn(
                        loginForm.formState.errors.password && "text-destructive"
                      )}
                    >
                      Password
                    </Label>
                    <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    {...loginForm.register("password")}
                    className={cn(
                      "transition-all duration-200",
                      loginForm.formState.errors.password && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {loginForm.formState.errors.password && (
                    <p className="text-destructive text-sm">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <CustomButton
                  type="submit"
                  variant="apple"
                  className="w-full py-5"
                  isLoading={isSubmitting}
                >
                  Sign In
                </CustomButton>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-0">
            <form onSubmit={registerForm.handleSubmit(handleRegister)}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label 
                    htmlFor="register-name"
                    className={cn(
                      registerForm.formState.errors.name && "text-destructive"
                    )}
                  >
                    Name
                  </Label>
                  <Input
                    id="register-name"
                    placeholder="Your name"
                    {...registerForm.register("name")}
                    className={cn(
                      "transition-all duration-200",
                      registerForm.formState.errors.name && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {registerForm.formState.errors.name && (
                    <p className="text-destructive text-sm">
                      {registerForm.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label 
                    htmlFor="register-email"
                    className={cn(
                      registerForm.formState.errors.email && "text-destructive"
                    )}
                  >
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="you@example.com"
                    {...registerForm.register("email")}
                    className={cn(
                      "transition-all duration-200",
                      registerForm.formState.errors.email && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {registerForm.formState.errors.email && (
                    <p className="text-destructive text-sm">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label 
                    htmlFor="register-password"
                    className={cn(
                      registerForm.formState.errors.password && "text-destructive"
                    )}
                  >
                    Password
                  </Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    {...registerForm.register("password")}
                    className={cn(
                      "transition-all duration-200",
                      registerForm.formState.errors.password && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {registerForm.formState.errors.password && (
                    <p className="text-destructive text-sm">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label 
                    htmlFor="register-confirm-password"
                    className={cn(
                      registerForm.formState.errors.confirmPassword && "text-destructive"
                    )}
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="register-confirm-password"
                    type="password"
                    placeholder="••••••••"
                    {...registerForm.register("confirmPassword")}
                    className={cn(
                      "transition-all duration-200",
                      registerForm.formState.errors.confirmPassword && "border-destructive focus-visible:ring-destructive"
                    )}
                  />
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-destructive text-sm">
                      {registerForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <CustomButton
                  type="submit"
                  variant="apple"
                  className="w-full py-5"
                  isLoading={isSubmitting}
                >
                  Create Account
                </CustomButton>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
