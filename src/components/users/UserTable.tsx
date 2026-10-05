/**
 * src/components/users/UserTable.tsx
 *
 * Responsive user list/table.
 */
"use client";

import React from "react";
import { Badge } from "../ui/Badge";
import { getInitials } from "../../lib/format";
import type { UserSummary } from "../../lib/types";

// Extend UserSummary locally just in case it has an email or createdAt field internally or for UI mocking.
export interface UserTableItem extends UserSummary {
  email?: string;
  createdAt?: Date;
}

export interface UserTableProps {
  users: UserTableItem[];
  onUserClick?: (id: string) => void;
  onUserEdit?: (id: string) => void;
  onUserToggleActive?: (id: string, currentStatus: boolean) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onUserClick,
  onUserEdit,
  onUserToggleActive,
}) => {
  if (users.length === 0) return null;

  return (
    <>
      {/* ── Desktop Table (≥lg) ──────────────────────────────────────────── */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e2e8f0]">
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider pl-4">
                Name
              </th>
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
                Contact
              </th>
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
                Role
              </th>
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
                Status
              </th>
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
                Joined
              </th>
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider text-right pr-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f8f8f8]/50 transition-colors group ${!user.isActive ? "opacity-75" : ""}`}
              >
                <td className="py-4 pr-4 pl-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border ${
                        user.isActive
                          ? "bg-[#deebff] text-[#0065ff] border-[#0065ff]/20"
                          : "bg-slate-100 text-slate-400 border-slate-200"
                      }`}
                    >
                      {getInitials(user.name)}
                    </div>
                    <button
                      type="button"
                      onClick={() => onUserClick?.(user.id)}
                      className="text-sm font-semibold text-[#292a2e] hover:text-[#0065ff] transition-colors text-left cursor-pointer bg-transparent border-none p-0 truncate"
                    >
                      {user.name}
                    </button>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-[#292a2e]">{user.phone}</span>
                    {user.email && (
                      <span className="text-xs text-[#6b778c]">{user.email}</span>
                    )}
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <Badge variant="role" role={user.role} />
                </td>
                <td className="py-4 pr-4">
                  <Badge variant="active" isActive={user.isActive} />
                </td>
                <td className="py-4 pr-4">
                  <span className="text-sm text-[#6b778c]">
                    {user.createdAt ? user.createdAt.toLocaleDateString() : "—"}
                  </span>
                </td>
                <td className="py-4 pl-4 pr-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                    {onUserEdit && (
                      <button
                        type="button"
                        onClick={() => onUserEdit(user.id)}
                        className="p-2 rounded-lg text-[#6b778c] hover:text-[#0065ff] hover:bg-[#deebff]/40 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#0065ff]/40"
                        title="Edit user"
                        aria-label={`Edit ${user.name}`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                    {onUserToggleActive && (
                      <button
                        type="button"
                        onClick={() => onUserToggleActive(user.id, user.isActive)}
                        className={`p-2 rounded-lg text-[#6b778c] transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center focus:outline-none focus:ring-2 ${
                          user.isActive
                            ? "hover:text-amber-600 hover:bg-amber-50 focus:ring-amber-500/40"
                            : "hover:text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500/40"
                        }`}
                        title={user.isActive ? "Deactivate user" : "Activate user"}
                        aria-label={user.isActive ? `Deactivate ${user.name}` : `Activate ${user.name}`}
                      >
                        {user.isActive ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile/Tablet Card List (<lg) ─────────────────────────────────── */}
      <div className="lg:hidden space-y-3">
        {users.map((user) => (
          <div
            key={user.id}
            className={`bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-xs shadow-slate-200/50 hover:shadow-sm hover:border-slate-300 transition-all duration-150 flex flex-col gap-3 ${!user.isActive ? "opacity-75" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border ${
                    user.isActive
                      ? "bg-[#deebff] text-[#0065ff] border-[#0065ff]/20"
                      : "bg-slate-100 text-slate-400 border-slate-200"
                  }`}
                >
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => onUserClick?.(user.id)}
                    className="text-sm font-semibold text-[#292a2e] hover:text-[#0065ff] transition-colors text-left cursor-pointer bg-transparent border-none p-0 truncate block"
                  >
                    {user.name}
                  </button>
                  <p className="text-xs text-[#6b778c] truncate">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {onUserEdit && (
                  <button
                    type="button"
                    onClick={() => onUserEdit(user.id)}
                    className="p-2 rounded-lg text-[#6b778c] hover:text-[#0065ff] hover:bg-[#deebff]/40 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#0065ff]/40"
                    title="Edit user"
                    aria-label={`Edit ${user.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                )}
                {onUserToggleActive && (
                  <button
                    type="button"
                    onClick={() => onUserToggleActive(user.id, user.isActive)}
                    className={`p-2 rounded-lg text-[#6b778c] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 ${
                      user.isActive
                        ? "hover:text-amber-600 hover:bg-amber-50 focus:ring-amber-500/40"
                        : "hover:text-emerald-600 hover:bg-emerald-50 focus:ring-emerald-500/40"
                    }`}
                    title={user.isActive ? "Deactivate user" : "Activate user"}
                    aria-label={user.isActive ? `Deactivate ${user.name}` : `Activate ${user.name}`}
                  >
                    {user.isActive ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <Badge variant="role" role={user.role} />
                <Badge variant="active" isActive={user.isActive} />
              </div>
              <span className="text-xs text-[#6b778c]">
                Joined: {user.createdAt ? user.createdAt.toLocaleDateString() : "—"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
