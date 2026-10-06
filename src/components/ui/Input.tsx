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
            className="font-pixel-sub text-sm text-gray-400 flex items-center justify-between"
          >
            <span>{label}</span>
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 pointer-events-none text-gray-500">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={`w-full bg-gray-900 text-white placeholder:text-gray-500 border-2 font-pixel-sub text-sm transition-all duration-150 py-2.5 px-3.5 focus:outline-none focus:shadow-[4px_4px_0_#000] disabled:bg-gray-800 disabled:cursor-not-allowed ${
              leftIcon ? "pl-10" : ""
            } ${rightIcon ? "pr-10" : ""} ${
              error
                ? "border-red-500 focus:border-red-400"
                : "border-gray-500 focus:border-green-400"
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 text-gray-500">
              {rightIcon}
            </div>
          )}
        </div>

        {error ? (
          <span className="font-pixel-sub text-xs text-red-500 flex items-center gap-1">
            <i className="fa-solid fa-triangle-exclamation"></i>
            {error}
          </span>
        ) : helperText ? (
          <span className="font-pixel-sub text-xs text-gray-500">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
