
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends ButtonProps {
  isLoading?: boolean;
  variant?: 
    | "default" 
    | "destructive" 
    | "outline" 
    | "secondary" 
    | "ghost" 
    | "link" 
    | "primary"
    | "apple";
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, isLoading, variant = "default", ...props }, ref) => {
    // Mapping custom variants to tailwind classes
    const variantClasses = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      apple: "bg-[#0071e3] text-white hover:bg-[#0077ED] transition-all duration-300 shadow-sm",
    };

    return (
      <Button
        ref={ref}
        className={cn(
          "relative font-medium transition-all overflow-hidden",
          variant === "apple" && "rounded-full px-8",
          variant in variantClasses ? variantClasses[variant as keyof typeof variantClasses] : "",
          isLoading && "cursor-not-allowed",
          className
        )}
        disabled={isLoading || props.disabled}
        variant={variant !== "primary" && variant !== "apple" ? variant : "default"}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center bg-inherit">
            <svg
              className="animate-spin h-5 w-5 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={isLoading ? "invisible" : ""}>{children}</span>
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";

export { CustomButton };
