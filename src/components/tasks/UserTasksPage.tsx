/**
 * src/components/tasks/UserTasksPage.tsx
 *
 * User-facing "My Tasks" page with:
 * - Status-grouped task cards (In Progress → To Do → Completed)
 * - Search & priority filter
 * - Task detail view
 * - Status update interaction
 *
 * The user view doesn't include create/edit/delete — those are admin-only.
 */
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui/EmptyState";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { TaskCard } from "./TaskCard";
import { TaskDetails } from "./TaskDetails";
import { getInitials } from "../../lib/format";
import type {
  TaskSummary,
  TaskDetail,
  TaskStatus,
  TaskPriority,
  UserSummary,
} from "../../lib/types";

type ViewState =
  | { mode: "list" }
  | { mode: "detail"; taskId: string };

export interface UserTasksPageProps {
  currentUser: UserSummary;
  tasks: TaskSummary[];
  taskDetails: TaskDetail[];
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

const priorityFilterOptions = [
  { value: "ALL", label: "All Priorities" },
  { value: "HIGH", label: "↑ High" },
  { value: "MEDIUM", label: "→ Medium" },
  { value: "LOW", label: "↓ Low" },
];

export const UserTasksPage: React.FC<UserTasksPageProps> = ({
  currentUser,
  tasks,
  taskDetails,
  onStatusChange,
}) => {
  const [view, setView] = useState<ViewState>({ mode: "list" });
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "ALL">("ALL");

  const [localTasks, setLocalTasks] = useState<TaskSummary[]>(tasks);
  const [localDetails, setLocalDetails] = useState<TaskDetail[]>(taskDetails);

  React.useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  React.useEffect(() => {
    setLocalDetails(taskDetails);
  }, [taskDetails]);

  // ─── Filter tasks ──────────────────────────────────────────────────────────
  const filteredTasks = useMemo(() => {
    let result = [...localTasks];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }

    if (priorityFilter !== "ALL") {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    return result;
  }, [localTasks, search, priorityFilter]);

  // ─── Group by status ──────────────────────────────────────────────────────
  const groupedTasks = useMemo(() => {
    const inProgress = filteredTasks.filter((t) => t.status === "IN_PROGRESS");
    const todo = filteredTasks.filter((t) => t.status === "TODO");
    const completed = filteredTasks.filter((t) => t.status === "COMPLETED");
    return { inProgress, todo, completed };
  }, [filteredTasks]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleStatusChange = useCallback(
    (taskId: string, newStatus: TaskStatus) => {
      const nextTasks = localTasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      const nextDetails = localDetails.map((t) =>
        t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date() } : t
      );
      setLocalTasks(nextTasks);
      setLocalDetails(nextDetails);
      onStatusChange?.(taskId, newStatus);
    },
    [localTasks, localDetails, onStatusChange]
  );

  const getTaskDetail = useCallback(
    (id: string) => localDetails.find((t) => t.id === id),
    [localDetails]
  );

  // ─── Detail view ───────────────────────────────────────────────────────────
  if (view.mode === "detail") {
    const detail = getTaskDetail(view.taskId);
    if (!detail) {
      return (
        <EmptyState
          title="Task not found"
          description="The task you're looking for doesn't exist."
          action={
            <Button variant="primary" onClick={() => setView({ mode: "list" })}>
              Back to my tasks
            </Button>
          }
        />
      );
    }
    return (
      <TaskDetails
        task={detail}
        onBack={() => setView({ mode: "list" })}
        onStatusChange={handleStatusChange}
        showAdminActions={false}
      />
    );
  }

  const hasFilters = search.trim() !== "" || priorityFilter !== "ALL";

  // ─── List view ─────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#deebff] text-[#0065ff] font-extrabold text-base flex items-center justify-center border-2 border-[#0065ff]/20 shrink-0">
            {getInitials(currentUser.name)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#292a2e] tracking-tight">
              My Tasks
            </h1>
            <p className="text-sm text-[#6b778c] mt-0.5">
              {tasks.length} task{tasks.length !== 1 ? "s" : ""} assigned to you
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search my tasks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          />
        </div>
        <div className="w-full sm:w-auto sm:min-w-[160px]">
          <Select
            options={priorityFilterOptions}
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as TaskPriority | "ALL")}
          />
        </div>
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setPriorityFilter("ALL");
            }}
            className="text-xs font-medium text-[#0065ff] hover:text-[#0052cc] transition-colors px-3 py-2 rounded-lg hover:bg-[#deebff]/40 cursor-pointer min-h-[44px] flex items-center gap-1.5 whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Results count */}
      {hasFilters && (
        <p className="text-sm text-[#6b778c]">
          Showing{" "}
          <span className="font-semibold text-[#292a2e]">
            {filteredTasks.length}
          </span>{" "}
          of {tasks.length} tasks
        </p>
      )}

      {/* All empty */}
      {filteredTasks.length === 0 && (
        <EmptyState
          title={hasFilters ? "No tasks match your search" : "No tasks assigned"}
          description={
            hasFilters
              ? "Try adjusting your search or filter."
              : "You don't have any tasks assigned yet."
          }
          action={
            hasFilters ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setPriorityFilter("ALL");
                }}
              >
                Clear filters
              </Button>
            ) : undefined
          }
        />
      )}

      {/* ── In Progress group ────────────────────────────────────────────── */}
      {groupedTasks.inProgress.length > 0 && (
        <StatusGroup
          title="In Progress"
          count={groupedTasks.inProgress.length}
          badgeStyles="bg-[#deebff] text-[#0065ff] border-[#0065ff]/20"
          icon="◐"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {groupedTasks.inProgress.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskClick={(id) => setView({ mode: "detail", taskId: id })}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </StatusGroup>
      )}

      {/* ── To Do group ──────────────────────────────────────────────────── */}
      {groupedTasks.todo.length > 0 && (
        <StatusGroup
          title="To Do"
          count={groupedTasks.todo.length}
          badgeStyles="bg-slate-100 text-slate-600 border-slate-200"
          icon="○"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {groupedTasks.todo.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskClick={(id) => setView({ mode: "detail", taskId: id })}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </StatusGroup>
      )}

      {/* ── Completed group ──────────────────────────────────────────────── */}
      {groupedTasks.completed.length > 0 && (
        <StatusGroup
          title="Completed"
          count={groupedTasks.completed.length}
          badgeStyles="bg-emerald-50 text-emerald-700 border-emerald-200"
          icon="●"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {groupedTasks.completed.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskClick={(id) => setView({ mode: "detail", taskId: id })}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        </StatusGroup>
      )}
    </div>
  );
};

// ─── Status Group wrapper ────────────────────────────────────────────────────

interface StatusGroupProps {
  title: string;
  count: number;
  badgeStyles: string;
  icon: string;
  children: React.ReactNode;
}

const StatusGroup: React.FC<StatusGroupProps> = ({
  title,
  count,
  badgeStyles,
  icon,
  children,
}) => (
  <section>
    <div className="flex items-center gap-3 mb-4">
      <h2 className="text-base font-bold text-[#292a2e] flex items-center gap-2">
        <span className="text-sm" aria-hidden="true">{icon}</span>
        {title}
      </h2>
      <span
        className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${badgeStyles}`}
      >
        {count}
      </span>
    </div>
    {children}
  </section>
);
