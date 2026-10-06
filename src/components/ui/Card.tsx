import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "flat";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "default", className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`pixel-card p-4 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex items-center justify-between pb-3 mb-4 border-b-2 border-gray-800 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`font-pixel-title text-xs text-white ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`font-pixel-sub text-xs text-gray-400 ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`space-y-3 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex items-center justify-between pt-4 mt-4 border-t-2 border-gray-800 ${className}`}
    {...props}
  >
    {children}
  </div>
);
