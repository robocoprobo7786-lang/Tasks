import React from "react";
import { Badge } from "../ui/Badge";

export type Role = "ADMIN" | "USER";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badgeCount?: number;
}

export interface SidebarProps {
  role: Role;
  activeHref?: string;
  onNavigate?: (href: string) => void;
  onToggleRole?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  activeHref = "/",
  onNavigate,
  onToggleRole,
}) => {
  const adminNav: NavItem[] = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
          />
        </svg>
      ),
    },
    {
      label: "Tasks",
      href: "/admin/tasks",
      badgeCount: 12,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
    },
    {
      label: "Users",
      href: "/admin/users",
      badgeCount: 6,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  const userNav: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      label: "My Tasks",
      href: "/tasks",
      badgeCount: 4,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  const navItems = role === "ADMIN" ? adminNav : userNav;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <aside className="w-64 bg-white border-r border-[#e2e8f0] flex flex-col h-full shrink-0">
      {/* Brand logo / header */}
      <div className="h-16 px-6 flex items-center gap-3 border-b border-[#e2e8f0]">
        <div className="w-9 h-9 rounded-xl bg-[#0065ff] text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-[#0065ff]/30">
          TM
        </div>
        <div>
          <span className="font-bold text-[#292a2e] text-base block leading-tight">
            Task Manager
          </span>
          <span className="text-xs text-[#6b778c]">Internal Workspace</span>
        </div>
      </div>

      {/* Navigation menu */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-6">
        <div>
          <div className="px-3 mb-2 flex items-center justify-between">
            <span className="text-xs font-bold text-[#6b778c] uppercase tracking-wider">
              Navigation
            </span>
            <Badge variant="role" role={role} />
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.href)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-[#0065ff] text-white shadow-xs shadow-[#0065ff]/20"
                      : "text-[#292a2e] hover:bg-[#f8f8f8] hover:text-[#0065ff]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-white" : "text-[#6b778c]"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badgeCount !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-[#f8f8f8] text-[#6b778c] border border-[#e2e8f0]"
                      }`}
                    >
                      {item.badgeCount}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Demo Role Switcher Control */}
        <div className="p-3.5 bg-[#f8f8f8] border border-[#e2e8f0] rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs text-[#6b778c] font-medium">
            <span>Dev Role View</span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono">
              DEMO
            </span>
          </div>
          <button
            type="button"
            onClick={onToggleRole}
            className="w-full text-xs font-semibold py-1.5 px-2.5 rounded-lg bg-white border border-[#e2e8f0] text-[#0065ff] hover:bg-[#deebff]/40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Switch to {role === "ADMIN" ? "User View" : "Admin View"}
          </button>
        </div>
      </div>

      {/* User profile / Account footer */}
      <div className="p-4 border-t border-[#e2e8f0] bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#deebff] text-[#0065ff] font-bold text-sm flex items-center justify-center border border-[#0065ff]/20">
              {role === "ADMIN" ? "AU" : "AJ"}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#292a2e] leading-tight">
                {role === "ADMIN" ? "Admin User" : "Alice Johnson"}
              </span>
              <span className="text-xs text-[#6b778c]">
                {role === "ADMIN" ? "9000000001" : "9000000002"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
