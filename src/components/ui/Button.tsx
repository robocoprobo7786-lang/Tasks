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
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none cursor-pointer";

    const variantStyles = {
      primary:
        "bg-[#0065ff] text-white hover:bg-[#0052cc] active:bg-[#0047b3] focus:ring-[#0065ff] shadow-sm shadow-[#0065ff]/20",
      secondary:
        "bg-white text-[#292a2e] border border-[#e2e8f0] hover:bg-[#f8f8f8] active:bg-slate-100 focus:ring-slate-400 shadow-2xs",
      danger:
        "bg-[#ae2e24] text-white hover:bg-[#92261e] active:bg-[#781f18] focus:ring-[#ae2e24] shadow-sm shadow-[#ae2e24]/20",
      outline:
        "bg-transparent text-[#0065ff] border border-[#0065ff] hover:bg-[#deebff]/40 active:bg-[#deebff] focus:ring-[#0065ff]",
      ghost:
        "bg-transparent text-[#292a2e] hover:bg-[#f8f8f8] hover:text-[#0065ff] focus:ring-slate-300",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 min-h-[32px] gap-1.5",
      md: "text-sm px-4 py-2.5 min-h-[40px] gap-2",
      lg: "text-base px-6 py-3 min-h-[48px] gap-2.5",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
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
        ) : (
          icon
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
