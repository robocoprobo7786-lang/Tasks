import React from "react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-[#f8f8f8] border border-dashed border-[#e2e8f0] rounded-2xl">
      <div className="w-12 h-12 rounded-full bg-[#deebff] text-[#0065ff] flex items-center justify-center mb-4">
        {icon || (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        )}
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#292a2e] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[#6b778c] max-w-md mb-6">{description}</p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
};
