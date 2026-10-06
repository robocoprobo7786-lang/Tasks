import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    let variantStyles = "";
    
    if (variant === "secondary") {
      variantStyles = "pixel-btn-secondary";
    } else if (variant === "danger") {
      variantStyles = "bg-red-500 hover:bg-red-400 border-white text-white";
    } else if (variant === "ghost") {
      variantStyles = "bg-transparent text-gray-400 border-transparent shadow-none hover:text-white";
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`pixel-btn ${variantStyles} ${className} flex items-center justify-center space-x-2`}
        {...props}
      >
        {isLoading ? (
          <span className="animate-spin text-current">...</span>
        ) : (
          icon
        )}
        <span>{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";
