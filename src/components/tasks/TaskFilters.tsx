/**
 * src/components/tasks/TaskFilters.tsx
 *
 * Composable filter bar for task listing pages.
 * Renders search input + filter dropdowns + sort controls.
 * Works for both admin (shows assignee filter) and user views.
 */
"use client";

import React from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import type {
  TaskFiltersState,
  TaskSortField,
  UserSummary,
} from "../../lib/types";

export interface TaskFiltersProps {
  filters: TaskFiltersState;
  onFiltersChange: (filters: TaskFiltersState) => void;
  /** When provided, shows an assignee filter dropdown */
  assignableUsers?: UserSummary[];
  /** Label text above the filter bar */
  className?: string;
}

const statusOptions = [
  { value: "ALL", label: "All Statuses" },
  { value: "TODO", label: "○ To Do" },
  { value: "IN_PROGRESS", label: "◐ In Progress" },
  { value: "COMPLETED", label: "● Completed" },
];

const priorityOptions = [
  { value: "ALL", label: "All Priorities" },
  { value: "HIGH", label: "↑ High" },
  { value: "MEDIUM", label: "→ Medium" },
  { value: "LOW", label: "↓ Low" },
];

const sortOptions: { value: TaskSortField; label: string }[] = [
  { value: "dueDate", label: "Due Date" },
  { value: "priority", label: "Priority" },
  { value: "title", label: "Title" },
  { value: "status", label: "Status" },
  { value: "assignee", label: "Assignee" },
];

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  assignableUsers,
  className = "",
}) => {
  const update = (partial: Partial<TaskFiltersState>) => {
    onFiltersChange({ ...filters, ...partial });
  };

  const assigneeOptions = assignableUsers
    ? [
        { value: "", label: "All Assignees" },
        ...assignableUsers.map((u) => ({ value: u.id, label: u.name })),
      ]
    : undefined;

  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "ALL" ||
    filters.priority !== "ALL" ||
    filters.assigneeId !== "";

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search tasks…"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            leftIcon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Select
            aria-label="Sort by"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(e) =>
              update({ sortBy: e.target.value as TaskSortField })
            }
            className="min-w-[130px]"
          />
          <button
            type="button"
            onClick={() =>
              update({
                sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
              })
            }
            className="p-2.5 rounded-xl border border-[#e2e8f0] bg-white text-[#6b778c] hover:bg-[#f8f8f8] hover:text-[#292a2e] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={`Sort ${filters.sortOrder === "asc" ? "descending" : "ascending"}`}
            title={`Sort ${filters.sortOrder === "asc" ? "descending" : "ascending"}`}
          >
            {filters.sortOrder === "asc" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Filter dropdowns row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
        <div className="w-full sm:w-auto sm:min-w-[160px]">
          <Select
            aria-label="Filter by status"
            options={statusOptions}
            value={filters.status}
            onChange={(e) => update({ status: e.target.value as TaskFiltersState["status"] })}
          />
        </div>
        <div className="w-full sm:w-auto sm:min-w-[160px]">
          <Select
            aria-label="Filter by priority"
            options={priorityOptions}
            value={filters.priority}
            onChange={(e) => update({ priority: e.target.value as TaskFiltersState["priority"] })}
          />
        </div>
        {assigneeOptions && (
          <div className="w-full sm:w-auto sm:min-w-[180px]">
            <Select
              aria-label="Filter by assignee"
              options={assigneeOptions}
              value={filters.assigneeId}
              onChange={(e) => update({ assigneeId: e.target.value })}
            />
          </div>
        )}

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() =>
              onFiltersChange({
                search: "",
                status: "ALL",
                priority: "ALL",
                assigneeId: "",
                sortBy: "dueDate",
                sortOrder: "asc",
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
