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
    <main className={`flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto w-full ${className}`}>
      {children}
    </main>
  );
};
