
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { CustomButton } from "@/components/CustomButton";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="text-center max-w-md mx-auto">
        <span className="inline-block text-8xl font-thin text-gray-300 mb-6">404</span>
        <h1 className="text-3xl font-semibold mb-4">Page not found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
        </p>
        <Link to="/">
          <CustomButton variant="apple" className="min-w-[180px]">
            Return to Home
          </CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
