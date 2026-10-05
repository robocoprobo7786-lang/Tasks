"use client";

import React, { useState } from "react";
import { Header } from "./Header";
import { MainContainer } from "./MainContainer";
import { Role, Sidebar } from "./Sidebar";

export interface AppShellProps {
  children: React.ReactNode;
  initialRole?: Role;
  activeHref?: string;
  onNavigate?: (href: string) => void;
  /** When provided the shell fires this instead of managing role internally */
  onRoleToggle?: () => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  initialRole = "ADMIN",
  activeHref = "/",
  onNavigate,
  onRoleToggle,
}) => {
  // Role state is owned here only when the consumer doesn't own it.
  // When onRoleToggle is provided, the consumer owns the role and passes
  // initialRole as the current role value.
  const [internalRole, setInternalRole] = useState<Role>(initialRole);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Use the externally provided role when the consumer manages it
  const role = onRoleToggle ? initialRole : internalRole;

  const toggleRole = () => {
    if (onRoleToggle) {
      onRoleToggle();
    } else {
      setInternalRole((prev) => (prev === "ADMIN" ? "USER" : "ADMIN"));
    }
  };

  const handleNavigate = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] text-[#292a2e]">
      <Header
        role={role}
        onToggleMobileMenu={() => setMobileMenuOpen(true)}
        onToggleRole={toggleRole}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Persistent Sidebar */}
        <div className="hidden lg:block h-[calc(100vh-4rem)] sticky top-16">
          <Sidebar
            role={role}
            activeHref={activeHref}
            onNavigate={handleNavigate}
            onToggleRole={toggleRole}
          />
        </div>

        {/* Mobile Slide-over Drawer & Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-over Content */}
            <div className="relative flex-1 max-w-xs w-full bg-white h-full shadow-xl flex flex-col z-10">
              <div className="absolute top-3 right-3 z-20">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#6b778c] hover:text-[#292a2e] hover:bg-[#f8f8f8]"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <Sidebar
                role={role}
                activeHref={activeHref}
                onNavigate={handleNavigate}
                onToggleRole={toggleRole}
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <MainContainer>{children}</MainContainer>
      </div>
    </div>
  );
};
