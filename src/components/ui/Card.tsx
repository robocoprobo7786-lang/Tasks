import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "flat";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "default", className = "", ...props }, ref) => {
    const variantStyles = {
      default: "bg-white border border-[#e2e8f0] shadow-xs shadow-slate-200/50",
      secondary: "bg-[#f8f8f8] border border-[#e2e8f0]",
      outline: "bg-transparent border border-[#e2e8f0]",
      flat: "bg-white border-none shadow-none",
    };

    return (
      <div
        ref={ref}
        className={`rounded-2xl p-5 sm:p-6 transition-all duration-150 ${variantStyles[variant]} ${className}`}
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
  <div className={`flex flex-col gap-1 mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`text-lg sm:text-xl font-bold text-[#292a2e] tracking-tight ${className}`}
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
  <p className={`text-sm text-[#6b778c] ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`space-y-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`flex items-center justify-between pt-4 mt-4 border-t border-[#e2e8f0] ${className}`}
    {...props}
  >
    {children}
  </div>
);
