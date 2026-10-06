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
      <div className="hidden lg:block overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="pb-3 font-pixel-sub text-xs text-gray-400 pl-4">Name</th>
              <th className="pb-3 font-pixel-sub text-xs text-gray-400">Contact</th>
              <th className="pb-3 font-pixel-sub text-xs text-gray-400">Role</th>
              <th className="pb-3 font-pixel-sub text-xs text-gray-400">Status</th>
              <th className="pb-3 font-pixel-sub text-xs text-gray-400">Joined</th>
              <th className="pb-3 font-pixel-sub text-xs text-gray-400 text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`border-b border-gray-800 last:border-b-0 hover:bg-[#18201a] transition-colors duration-150 group ${!user.isActive ? "opacity-75" : ""}`}
              >
                <td className="py-4 pr-4 pl-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`shrink-0 w-8 h-8 flex items-center justify-center font-pixel-title text-[8px] text-white shadow-[1px_1px_0_#000] border border-black ${
                        user.isActive
                          ? "bg-blue-600"
                          : "bg-gray-600"
                      }`}
                    >
                      {getInitials(user.name)}
                    </div>
                    <button
                      type="button"
                      onClick={() => onUserClick?.(user.id)}
                      className="font-pixel-sub text-sm font-bold text-white hover:text-green-300 transition-colors text-left cursor-pointer bg-transparent border-none p-0 truncate"
                    >
                      {user.name}
                    </button>
                  </div>
                </td>
                <td className="py-4 pr-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-pixel-sub text-xs text-gray-400">{user.phone}</span>
                    {user.email && (
                      <span className="font-pixel-sub text-xs text-gray-400">{user.email}</span>
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
                  <span className="font-pixel-sub text-xs text-gray-400">
                    {user.createdAt ? user.createdAt.toLocaleDateString() : "—"}
                  </span>
                </td>
                <td className="py-4 pl-4 pr-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onUserEdit && (
                      <button
                        type="button"
                        onClick={() => onUserEdit(user.id)}
                        className="text-gray-500 hover:text-blue-400 px-2 cursor-pointer transition-colors"
                        title="Edit user"
                        aria-label={`Edit ${user.name}`}
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    )}
                    {onUserToggleActive && (
                      <button
                        type="button"
                        onClick={() => onUserToggleActive(user.id, user.isActive)}
                        className={`px-2 cursor-pointer transition-colors ${
                          user.isActive
                            ? "text-gray-500 hover:text-amber-500"
                            : "text-gray-500 hover:text-green-400"
                        }`}
                        title={user.isActive ? "Deactivate user" : "Activate user"}
                        aria-label={user.isActive ? `Deactivate ${user.name}` : `Activate ${user.name}`}
                      >
                        {user.isActive ? (
                          <i className="fa-solid fa-ban"></i>
                        ) : (
                          <i className="fa-solid fa-check"></i>
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
            className={`pixel-card-sub p-4 transition-all duration-150 flex flex-col gap-3 ${!user.isActive ? "opacity-75" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`shrink-0 w-8 h-8 flex items-center justify-center font-pixel-title text-[8px] text-white shadow-[1px_1px_0_#000] border border-black ${
                    user.isActive
                      ? "bg-blue-600"
                      : "bg-gray-600"
                  }`}
                >
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => onUserClick?.(user.id)}
                    className="font-pixel-sub text-sm font-bold text-white hover:text-green-300 transition-colors text-left cursor-pointer bg-transparent border-none p-0 truncate block"
                  >
                    {user.name}
                  </button>
                  <p className="font-pixel-sub text-xs text-gray-400 truncate">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {onUserEdit && (
                  <button
                    type="button"
                    onClick={() => onUserEdit(user.id)}
                    className="text-gray-500 hover:text-blue-400 cursor-pointer"
                    title="Edit user"
                    aria-label={`Edit ${user.name}`}
                  >
                    <i className="fa-solid fa-pen"></i>
                  </button>
                )}
                {onUserToggleActive && (
                  <button
                    type="button"
                    onClick={() => onUserToggleActive(user.id, user.isActive)}
                    className={`cursor-pointer ${
                      user.isActive
                        ? "text-gray-500 hover:text-amber-500"
                        : "text-gray-500 hover:text-green-400"
                    }`}
                    title={user.isActive ? "Deactivate user" : "Activate user"}
                    aria-label={user.isActive ? `Deactivate ${user.name}` : `Activate ${user.name}`}
                  >
                    {user.isActive ? (
                      <i className="fa-solid fa-ban"></i>
                    ) : (
                      <i className="fa-solid fa-check"></i>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 flex-wrap mt-2">
              <div className="flex items-center gap-2">
                <Badge variant="role" role={user.role} />
                <Badge variant="active" isActive={user.isActive} />
              </div>
              <span className="font-pixel-sub text-xs text-gray-400">
                Joined: {user.createdAt ? user.createdAt.toLocaleDateString() : "—"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
