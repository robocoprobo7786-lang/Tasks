import React from "react";

export interface MainContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {children}
    </div>
  );
};
