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
      icon: <i className="fa-solid fa-table-cells-large text-sm"></i>,
    },
    {
      label: "Tasks",
      href: "/admin/tasks",
      badgeCount: 12,
      icon: <i className="fa-solid fa-list-check text-green-400"></i>,
    },
    {
      label: "Users",
      href: "/admin/users",
      badgeCount: 6,
      icon: <i className="fa-solid fa-users text-green-400"></i>,
    },
  ];

  const userNav: NavItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <i className="fa-solid fa-table-cells-large text-sm"></i>,
    },
    {
      label: "My Tasks",
      href: "/tasks",
      badgeCount: 4,
      icon: <i className="fa-solid fa-list-check text-green-400"></i>,
    },
  ];

  const navItems = role === "ADMIN" ? adminNav : userNav;

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    }
  };

  return (
    <aside className="w-64 bg-[#121614] border-r-4 border-black flex flex-col h-full shrink-0">
      <div className="flex-1 px-4 py-6 overflow-y-auto flex flex-col">
        <div className="pixel-card p-4 flex flex-col justify-between h-full">
          <div className="space-y-5">
            {/* Nav Section Title */}
            <div className="flex items-center justify-between pb-2 border-b-2 border-gray-800">
              <span className="font-pixel-title text-[10px] text-gray-400 tracking-wider">
                NAVIGATION
              </span>
              <span
                className={`pixel-badge ${
                  role === "ADMIN" ? "badge-admin" : "badge-user"
                }`}
              >
                ● {role === "ADMIN" ? "Admin" : "User"}
              </span>
            </div>

            {/* Menu List */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = activeHref === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`flex items-center justify-between p-3 border-2 border-black transition-all ${
                      isActive
                        ? "bg-[#0088ff] text-white shadow-[3px_3px_0_#000] font-pixel-title text-[10px]"
                        : "bg-[#151c17] hover:bg-[#202b23] text-gray-300 font-pixel-sub text-base"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {isActive ? (
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                    ) : item.badgeCount !== undefined ? (
                      <span className="pixel-badge badge-todo">
                        {item.badgeCount}
                      </span>
                    ) : null}
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Bottom Sidebar View Switcher & Current User Profile Box */}
          <div className="space-y-4 pt-4 border-t-2 border-gray-800 mt-auto">
            <div className="pixel-card-sub p-3 bg-[#141a16]">
              <div className="flex items-center justify-between mb-2">
                <span className="font-pixel-sub text-xs text-gray-400">
                  Dev Role View
                </span>
                <span className="pixel-badge bg-amber-900 text-amber-300 border-amber-600 text-[9px]">
                  DEMO
                </span>
              </div>

              <button
                onClick={onToggleRole}
                className="w-full pixel-btn pixel-btn-secondary text-[9px] py-2 flex items-center justify-center space-x-2"
              >
                <i className="fa-solid fa-arrow-right-arrow-left"></i>
                <span>
                  Switch to {role === "ADMIN" ? "User View" : "Admin View"}
                </span>
              </button>
            </div>

            {/* Current Profile Display */}
            <div className="flex items-center space-x-3 p-2 bg-[#0d120f] border-2 border-black">
              <div
                className={`w-8 h-8 ${
                  role === "ADMIN" ? "bg-gray-800 border-gray-500" : "bg-emerald-900 border-emerald-700"
                } border-2 font-pixel-title text-xs text-white flex items-center justify-center`}
              >
                {role === "ADMIN" ? "AU" : "AJ"}
              </div>
              <div className="overflow-hidden">
                <div className="font-pixel-title text-[10px] text-white truncate">
                  {role === "ADMIN" ? "Admin User" : "Alice Johnson"}
                </div>
                <div className="font-pixel-sub text-xs text-gray-400 truncate">
                  {role === "ADMIN" ? "9000000001" : "9000000002"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
