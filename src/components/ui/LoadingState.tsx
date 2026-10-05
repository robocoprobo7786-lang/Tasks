import React from "react";

export interface LoadingStateProps {
  message?: string;
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading data...",
  count = 3,
}) => {
  return (
    <div className="w-full space-y-4 py-4 animate-pulse">
      <div className="flex items-center gap-3 text-sm text-[#6b778c] mb-2">
        <svg
          className="animate-spin h-4 w-4 text-[#0065ff]"
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
        <span>{message}</span>
      </div>

      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-5 bg-white border border-[#e2e8f0] rounded-2xl space-y-3"
        >
          <div className="h-4 bg-slate-100 rounded-md w-1/3"></div>
          <div className="h-3 bg-slate-100 rounded-md w-2/3"></div>
          <div className="flex gap-2 pt-2">
            <div className="h-5 bg-slate-100 rounded-full w-16"></div>
            <div className="h-5 bg-slate-100 rounded-full w-20"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
