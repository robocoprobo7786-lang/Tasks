import React from "react";
import { Badge } from "../ui/Badge";
import { Role } from "./Sidebar";

export interface HeaderProps {
  role: Role;
  onToggleMobileMenu?: () => void;
  onToggleRole?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  onToggleMobileMenu,
  onToggleRole,
}) => {
  return (
    <header className="h-16 bg-white border-b border-[#e2e8f0] px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-20 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-xl text-[#6b778c] hover:text-[#292a2e] hover:bg-[#f8f8f8] focus:outline-none focus:ring-2 focus:ring-[#0065ff]/20 cursor-pointer"
          aria-label="Open mobile navigation"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Header Title */}
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg font-bold text-[#292a2e] tracking-tight">
            Task Management System
          </span>
          <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-[#deebff] text-[#0065ff] font-semibold">
            MVP
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Active role badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#6b778c]">
          <span>Role:</span>
          <Badge variant="role" role={role} />
        </div>

        {/* Dev switch role button */}
        <button
          type="button"
          onClick={onToggleRole}
          className="text-xs font-semibold py-1.5 px-3 rounded-full bg-[#f8f8f8] border border-[#e2e8f0] text-[#0065ff] hover:bg-[#deebff]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>
          <span className="hidden xs:inline">View as</span>{" "}
          {role === "ADMIN" ? "User" : "Admin"}
        </button>

        {/* User avatar indicator */}
        <div className="w-8 h-8 rounded-full bg-[#deebff] text-[#0065ff] font-bold text-xs flex items-center justify-center border border-[#0065ff]/20">
          {role === "ADMIN" ? "AU" : "AJ"}
        </div>
      </div>
    </header>
  );
};
