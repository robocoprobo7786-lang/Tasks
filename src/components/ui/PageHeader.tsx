import React from "react";

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  breadcrumbs,
}) => {
  return (
    <div className="pixel-card p-5 flex flex-wrap items-center justify-between gap-4 mb-6">
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="font-pixel-sub text-xs text-gray-400 mb-1">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="mx-1 text-green-500">/</span>}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-green-300 transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-green-400">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <h2 className="font-pixel-title text-sm md:text-lg text-white tracking-wide">
          {title}
        </h2>
        {description && (
          <p className="font-pixel-sub text-base text-gray-300 mt-1 max-w-2xl">{description}</p>
        )}
      </div>

      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
};
