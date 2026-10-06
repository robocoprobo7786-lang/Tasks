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
  const [internalRole, setInternalRole] = useState<Role>(initialRole);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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

  React.useEffect(() => {
    import("../../lib/audio").then(({ retroAudio }) => {
      const initAudio = () => {
        retroAudio.init();
        document.removeEventListener("click", initAudio);
        document.removeEventListener("keydown", initAudio);
      };

      document.addEventListener("click", initAudio);
      document.addEventListener("keydown", initAudio);

      const handleGlobalClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const btn = target.closest("button, a, .pixel-btn, .pixel-card");
        if (btn) {
          retroAudio.playClick();
        }
      };

      const handleGlobalHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const btn = target.closest("button, a, .pixel-btn, .pixel-card");
        // Simple logic to prevent continuous hovering from spamming sound:
        if (btn && btn !== (window as any)._lastHoverTarget) {
          retroAudio.playHover();
          (window as any)._lastHoverTarget = btn;
        }
      };

      const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const btn = target.closest("button, a, .pixel-btn, .pixel-card");
        if (btn && btn === (window as any)._lastHoverTarget) {
          (window as any)._lastHoverTarget = null;
        }
      }

      document.addEventListener("click", handleGlobalClick);
      document.addEventListener("mouseover", handleGlobalHover);
      document.addEventListener("mouseout", handleMouseOut);

      return () => {
        document.removeEventListener("click", initAudio);
        document.removeEventListener("keydown", initAudio);
        document.removeEventListener("click", handleGlobalClick);
        document.removeEventListener("mouseover", handleGlobalHover);
        document.removeEventListener("mouseout", handleMouseOut);
      };
    });
  }, []);

  return (
    <>
      <Header
        role={role}
        onToggleMobileMenu={() => setMobileMenuOpen(true)}
        onToggleRole={toggleRole}
      />

      <div className="max-w-[1500px] mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-6 h-[calc(100vh-3rem)] overflow-y-auto overflow-x-hidden pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <Sidebar
            role={role}
            activeHref={activeHref}
            onNavigate={handleNavigate}
            onToggleRole={toggleRole}
          />
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-9 space-y-6">
          <MainContainer>{children}</MainContainer>
        </main>
      </div>

      {/* Mobile Slide-over Drawer & Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-over Content */}
          <div className="relative flex-1 max-w-xs w-full h-full shadow-[4px_0px_0px_#000] flex flex-col z-10 bg-[#121614]">
            <div className="absolute top-3 right-3 z-20">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="pixel-btn p-2 bg-red-500 hover:bg-red-400 text-white"
              >
                [X]
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
    </>
  );
};
