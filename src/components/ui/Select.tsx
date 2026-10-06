import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, helperText, error, options, className = "", id, disabled, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="font-pixel-sub text-sm text-gray-400">
            {label}
          </label>
        )}

        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={`w-full appearance-none bg-gray-900 text-white border-2 text-sm font-pixel-sub transition-all duration-150 py-2.5 pl-3.5 pr-10 focus:outline-none focus:shadow-[4px_4px_0_#000] disabled:bg-gray-800 disabled:cursor-not-allowed cursor-pointer ${
              error
                ? "border-red-500 focus:border-red-400"
                : "border-gray-500 focus:border-green-400"
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>

        {error ? (
          <span className="font-pixel-sub text-xs text-red-500 flex items-center gap-1">
            {error}
          </span>
        ) : helperText ? (
          <span className="font-pixel-sub text-xs text-gray-500">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
