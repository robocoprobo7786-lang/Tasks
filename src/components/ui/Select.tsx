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
          <label htmlFor={selectId} className="text-sm font-medium text-[#292a2e]">
            {label}
          </label>
        )}

        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            className={`w-full appearance-none bg-white text-[#292a2e] border rounded-xl text-sm transition-all duration-150 py-2.5 pl-3.5 pr-10 focus:outline-none focus:ring-2 disabled:bg-[#f8f8f8] disabled:cursor-not-allowed cursor-pointer ${
              error
                ? "border-[#ae2e24] focus:border-[#ae2e24] focus:ring-[#ae2e24]/20"
                : "border-[#e2e8f0] focus:border-[#0065ff] focus:ring-[#0065ff]/20"
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#6b778c]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {error ? (
          <span className="text-xs font-medium text-[#ae2e24] flex items-center gap-1">
            {error}
          </span>
        ) : helperText ? (
          <span className="text-xs text-[#6b778c]">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
