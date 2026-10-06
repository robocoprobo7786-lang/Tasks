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
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 pixel-card border-dashed">
      <div className="w-12 h-12 border-2 border-gray-500 bg-gray-800 text-gray-400 flex items-center justify-center shadow-[2px_2px_0_#000] mb-4">
        {icon || (
          <i className="fa-solid fa-folder-open text-xl"></i>
        )}
      </div>

      <h3 className="font-pixel-title text-sm text-white mb-2">{title}</h3>
      {description && (
        <p className="font-pixel-sub text-sm text-gray-400 max-w-md mb-6">{description}</p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
};
