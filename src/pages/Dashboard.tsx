
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { CustomButton } from "@/components/CustomButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const apiEndpoints = [
    { name: "Register User", endpoint: "/register", method: "POST" },
    { name: "User Login", endpoint: "/login", method: "POST" },
    { name: "Get User Profile", endpoint: "/profile", method: "GET" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">{user?.email}</p>
        </div>
        <CustomButton variant="outline" onClick={handleLogout}>
          Sign Out
        </CustomButton>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card className="overflow-hidden border shadow-md bg-white/50 backdrop-blur-sm">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-xl">API Endpoints</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {apiEndpoints.map((endpoint, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{endpoint.name}</h3>
                    <span className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {endpoint.method}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    <code className="px-1 py-0.5 rounded bg-secondary text-secondary-foreground">
                      {endpoint.endpoint}
                    </code>
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border shadow-md bg-white/50 backdrop-blur-sm">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="text-xl">Your Authentication Token</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="bg-secondary p-4 rounded-lg overflow-x-auto">
              <pre className="text-xs text-secondary-foreground whitespace-pre-wrap break-all">
                {localStorage.getItem("auth_token") || "No token found"}
              </pre>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Use this token in the Authorization header for authenticated requests:
              <br />
              <code className="px-1 py-0.5 rounded bg-secondary text-secondary-foreground mt-2 inline-block">
                Authorization: Bearer [your-token]
              </code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
