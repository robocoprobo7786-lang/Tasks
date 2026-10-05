import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      className = "",
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[#292a2e] flex items-center justify-between"
          >
            <span>{label}</span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-[#6b778c]">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full bg-white text-[#292a2e] placeholder:text-[#6b778c] border rounded-xl text-sm transition-all duration-150 py-2.5 px-3.5 focus:outline-none focus:ring-2 disabled:bg-[#f8f8f8] disabled:cursor-not-allowed ${
              leftIcon ? "pl-10" : ""
            } ${rightIcon ? "pr-10" : ""} ${
              error
                ? "border-[#ae2e24] focus:border-[#ae2e24] focus:ring-[#ae2e24]/20"
                : "border-[#e2e8f0] focus:border-[#0065ff] focus:ring-[#0065ff]/20"
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 text-[#6b778c]">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <span className="text-xs font-medium text-[#ae2e24] flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </span>
        ) : helperText ? (
          <span className="text-xs text-[#6b778c]">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
