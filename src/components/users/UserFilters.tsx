/**
 * src/components/users/UserFilters.tsx
 *
 * Filter bar for the admin users list.
 */
"use client";

import React from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import type { UserFiltersState, UserRole } from "../../lib/types";

export interface UserFiltersProps {
  filters: UserFiltersState;
  onFiltersChange: (filters: UserFiltersState) => void;
  className?: string;
}

const roleOptions = [
  { value: "ALL", label: "All Roles" },
  { value: "ADMIN", label: "Admin" },
  { value: "USER", label: "User" },
];

const statusOptions = [
  { value: "ALL", label: "All Statuses" },
  { value: "ACTIVE", label: "Active" },
  { value: "INACTIVE", label: "Inactive" },
];

export const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onFiltersChange,
  className = "",
}) => {
  const update = (partial: Partial<UserFiltersState>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.role !== "ALL" ||
    filters.status !== "ALL";

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        <div className="flex-1 w-full sm:w-auto">
          <Input
            placeholder="Search users by name, phone, or email…"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        <div className="w-full sm:w-auto sm:min-w-[160px]">
          <Select
            aria-label="Filter by role"
            options={roleOptions}
            value={filters.role}
            onChange={(e) => update({ role: e.target.value as UserRole | "ALL" })}
          />
        </div>
        <div className="w-full sm:w-auto sm:min-w-[160px]">
          <Select
            aria-label="Filter by status"
            options={statusOptions}
            value={filters.status}
            onChange={(e) => update({ status: e.target.value as "ALL" | "ACTIVE" | "INACTIVE" })}
          />
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() =>
              onFiltersChange({
                search: "",
                role: "ALL",
                status: "ALL",
              })
            }
            className="text-xs font-medium text-[#0065ff] hover:text-[#0052cc] transition-colors px-3 py-2 rounded-lg hover:bg-[#deebff]/40 cursor-pointer min-h-[44px] flex items-center gap-1.5 whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};
