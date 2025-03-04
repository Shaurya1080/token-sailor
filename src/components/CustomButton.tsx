
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

// Define our custom variants separate from the base ButtonProps
type CustomVariants = "primary" | "apple";

interface CustomButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "variant"> {
  isLoading?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"] | CustomVariants;
  size?: VariantProps<typeof buttonVariants>["size"];
  className?: string;
  asChild?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ className, children, isLoading, variant = "default", size, asChild = false, ...props }, ref) => {
    // Mapping custom variants to tailwind classes
    const variantClasses = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      apple: "bg-[#0071e3] text-white hover:bg-[#0077ED] transition-all duration-300 shadow-sm",
    };

    // Check if we're using a custom variant
    const isCustomVariant = variant === "primary" || variant === "apple";
    
    // Pass variant to Button only if it's a standard variant
    const buttonVariantProp = isCustomVariant ? undefined : variant;

    return (
      <Button
        ref={ref}
        className={cn(
          "relative font-medium transition-all overflow-hidden",
          variant === "apple" && "rounded-full px-8",
          isCustomVariant ? variantClasses[variant as CustomVariants] : "",
          isLoading && "cursor-not-allowed",
          className
        )}
        disabled={isLoading || props.disabled}
        variant={buttonVariantProp}
        size={size}
        asChild={asChild}
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
