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
    <header className="bg-[#141a16] border-b-4 border-black sticky top-0 z-40 shadow-xl shrink-0">
      <div className="max-w-[1500px] mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden pixel-btn pixel-btn-secondary p-2"
            aria-label="Open mobile navigation"
          >
            <i className="fa-solid fa-bars text-green-400"></i>
          </button>

          {/* Header Title & Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#0088ff] border-2 border-black flex items-center justify-center text-white font-pixel-title text-base font-bold shadow-[2px_2px_0_#000]">
              TM
            </div>
            <div>
              <div className="font-pixel-title text-xs md:text-sm text-white tracking-wide">
                Task Manager
              </div>
              <div className="text-xs text-gray-400 font-pixel-sub">
                Internal Workspace
              </div>
            </div>
          </div>
        </div>

        {/* Center Badge (Hidden on mobile) */}
        <div className="hidden md:flex items-center space-x-3 bg-[#1b221d] px-4 py-1.5 border-2 border-black shadow-[2px_2px_0_#000]">
          <h1 className="font-pixel-title text-xs text-green-400 tracking-wider">
            Task Management System
          </h1>
          <span className="pixel-badge badge-mvp">MVP</span>
        </div>

        <div className="flex items-center space-x-3">
          {/* Role Tag */}
          <div className="hidden sm:flex items-center space-x-2 text-xs font-pixel-sub bg-[#0f1411] px-3 py-1 border-2 border-black">
            <span className="text-gray-400">Role:</span>
            <span
              className={`pixel-badge ${
                role === "ADMIN" ? "badge-admin" : "badge-user"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  role === "ADMIN" ? "bg-blue-400" : "bg-emerald-400"
                } dot-pulse`}
              ></span>
              {role === "ADMIN" ? "Admin" : "User"}
            </span>
          </div>

          {/* Dev switch role button */}
          <button
            type="button"
            onClick={onToggleRole}
            className="pixel-btn pixel-btn-secondary text-[9px] py-1 px-2.5 flex items-center space-x-1"
          >
            <i className="fa-solid fa-arrows-rotate"></i>
            <span className="hidden xs:inline">
              {role === "ADMIN" ? "User" : "Admin"}
            </span>
          </button>

          {/* User avatar indicator */}
          <div
            className={`w-9 h-9 ${
              role === "ADMIN" ? "bg-blue-600" : "bg-emerald-600"
            } border-2 border-black flex items-center justify-center font-pixel-title text-xs text-white shadow-[2px_2px_0_#000]`}
          >
            {role === "ADMIN" ? "AU" : "AJ"}
          </div>
        </div>
      </div>
    </header>
  );
};
