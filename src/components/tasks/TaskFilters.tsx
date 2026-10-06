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
    <div className={`space-y-4 ${className} pixel-card-sub p-4 mb-6`}>
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search tasks…"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            leftIcon={<i className="fa-solid fa-magnifying-glass text-gray-500"></i>}
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
            className="pixel-btn px-3 flex items-center justify-center min-h-[44px]"
            aria-label={`Sort ${filters.sortOrder === "asc" ? "descending" : "ascending"}`}
            title={`Sort ${filters.sortOrder === "asc" ? "descending" : "ascending"}`}
          >
            {filters.sortOrder === "asc" ? (
              <i className="fa-solid fa-arrow-up-a-z"></i>
            ) : (
              <i className="fa-solid fa-arrow-down-z-a"></i>
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
            className="text-xs font-pixel-sub text-red-500 hover:text-red-400 transition-colors py-2 cursor-pointer min-h-[44px] flex items-center gap-1.5 whitespace-nowrap"
          >
            <i className="fa-solid fa-xmark"></i>
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
};
