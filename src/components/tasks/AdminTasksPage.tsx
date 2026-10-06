/**
 * src/components/tasks/AdminTasksPage.tsx
 *
 * Full-featured admin tasks page with:
 * - Task listing table with filters
 * - Task creation (modal)
 * - Task detail view
 * - Task editing (modal)
 * - Delete confirmation
 *
 * All state is client-side dev data. When real mutations are needed,
 * the onSubmit / onDelete handlers can be swapped for server actions.
 */
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { PageHeader } from "../ui/PageHeader";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui/EmptyState";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { TaskFilters } from "./TaskFilters";
import { TaskTable } from "./TaskTable";
import { TaskForm } from "./TaskForm";
import { TaskDetails } from "./TaskDetails";
import type {
  TaskFiltersState,
  TaskSummary,
  TaskDetail,
  TaskFormData,
  TaskStatus,
  TaskPriority,
  UserSummary,
} from "../../lib/types";

type ViewState =
  | { mode: "list" }
  | { mode: "create" }
  | { mode: "detail"; taskId: string }
  | { mode: "edit"; taskId: string };

export interface AdminTasksPageProps {
  tasks: TaskSummary[];
  taskDetails: TaskDetail[];
  assignableUsers: UserSummary[];
  initialMode?: "list" | "create";
  onTasksChange?: (tasks: TaskSummary[], taskDetails: TaskDetail[]) => void;
}

// ─── Priority ordering for sort ──────────────────────────────────────────────
const priorityOrder: Record<TaskPriority, number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };
const statusOrder: Record<TaskStatus, number> = { TODO: 0, IN_PROGRESS: 1, COMPLETED: 2 };

const defaultFilters: TaskFiltersState = {
  search: "",
  status: "ALL",
  priority: "ALL",
  assigneeId: "",
  sortBy: "dueDate",
  sortOrder: "asc",
};

export const AdminTasksPage: React.FC<AdminTasksPageProps> = ({
  tasks,
  taskDetails,
  assignableUsers,
  initialMode = "list",
  onTasksChange,
}) => {
  const [view, setView] = useState<ViewState>({ mode: initialMode });
  const [filters, setFilters] = useState<TaskFiltersState>(defaultFilters);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Local state for demonstration of optimistic updates
  const [localTasks, setLocalTasks] = useState<TaskSummary[]>(tasks);
  const [localDetails, setLocalDetails] = useState<TaskDetail[]>(taskDetails);

  // Synchronize when parent tasks prop updates
  React.useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  React.useEffect(() => {
    setLocalDetails(taskDetails);
  }, [taskDetails]);

  // Synchronize when initialMode changes (e.g. user clicked Create Task from Dashboard)
  React.useEffect(() => {
    if (initialMode === "create") {
      setView({ mode: "create" });
    }
  }, [initialMode]);

  // ─── Filter & sort ─────────────────────────────────────────────────────────
  const filteredTasks = useMemo(() => {
    let result = [...localTasks];

    // Text search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.assignedTo.name.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (filters.status !== "ALL") {
      result = result.filter((t) => t.status === filters.status);
    }

    // Priority filter
    if (filters.priority !== "ALL") {
      result = result.filter((t) => t.priority === filters.priority);
    }

    // Assignee filter
    if (filters.assigneeId) {
      result = result.filter((t) => t.assignedTo.id === filters.assigneeId);
    }

    // Sorting
    result.sort((a, b) => {
      let cmp = 0;
      switch (filters.sortBy) {
        case "title":
          cmp = a.title.localeCompare(b.title);
          break;
        case "dueDate": {
          const aTime = a.dueDate?.getTime() ?? Infinity;
          const bTime = b.dueDate?.getTime() ?? Infinity;
          cmp = aTime - bTime;
          break;
        }
        case "priority":
          cmp = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case "status":
          cmp = statusOrder[a.status] - statusOrder[b.status];
          break;
        case "assignee":
          cmp = a.assignedTo.name.localeCompare(b.assignedTo.name);
          break;
      }
      return filters.sortOrder === "desc" ? -cmp : cmp;
    });

    return result;
  }, [localTasks, filters]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleCreateSubmit = useCallback(
    (data: TaskFormData) => {
      // Find assignee or fallback to first available active user or admin
      const assignee =
        assignableUsers.find((u) => u.id === data.assignedToId) ??
        assignableUsers[0] ?? {
          id: "seed-admin-1",
          name: "Admin User",
          phone: "9000000001",
          role: "ADMIN" as const,
          isActive: true,
        };

      const newTaskInfo: TaskSummary = {
        id: `t-${Date.now()}`,
        title: data.title.trim() || "Untitled Task",
        status: data.status || "TODO",
        priority: data.priority || "MEDIUM",
        assignedTo: assignee,
        dueDate: data.dueDate ? new Date(data.dueDate) : null,
        createdBy: {
          id: "seed-admin-1",
          name: "Admin User",
          phone: "9000000001",
          role: "ADMIN",
          isActive: true,
        },
      };

      const newTaskDetail: TaskDetail = {
        ...newTaskInfo,
        description: data.description?.trim() || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Prepend to local tasks so it is immediately visible at the top
      const nextTasks = [newTaskInfo, ...localTasks];
      const nextDetails = [newTaskDetail, ...localDetails];

      setLocalTasks(nextTasks);
      setLocalDetails(nextDetails);
      onTasksChange?.(nextTasks, nextDetails);

      setNotification(`Task "${newTaskInfo.title}" created successfully!`);
      setTimeout(() => setNotification(null), 4000);

      setView({ mode: "list" });
    },
    [assignableUsers, localTasks, localDetails, onTasksChange]
  );

  const handleEditSubmit = useCallback(
    (data: TaskFormData) => {
      const assignee =
        assignableUsers.find((u) => u.id === data.assignedToId) ??
        assignableUsers[0];
      if (assignee && view.mode === "edit") {
        const updateInfo = {
          title: data.title.trim(),
          status: data.status,
          priority: data.priority,
          assignedTo: assignee,
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
        };
        const nextTasks = localTasks.map((t) =>
          t.id === view.taskId ? { ...t, ...updateInfo } : t
        );
        const nextDetails = localDetails.map((t) =>
          t.id === view.taskId
            ? {
                ...t,
                ...updateInfo,
                description: data.description?.trim() || null,
                updatedAt: new Date(),
              }
            : t
        );
        setLocalTasks(nextTasks);
        setLocalDetails(nextDetails);
        onTasksChange?.(nextTasks, nextDetails);
        setNotification(`Task updated successfully!`);
        setTimeout(() => setNotification(null), 4000);
        setView({ mode: "detail", taskId: view.taskId });
      } else {
        setView({ mode: "list" });
      }
    },
    [view, assignableUsers, localTasks, localDetails, onTasksChange]
  );

  const handleDeleteConfirm = useCallback(() => {
    if (deleteTarget) {
      const nextTasks = localTasks.filter((t) => t.id !== deleteTarget);
      const nextDetails = localDetails.filter((t) => t.id !== deleteTarget);
      setLocalTasks(nextTasks);
      setLocalDetails(nextDetails);
      onTasksChange?.(nextTasks, nextDetails);
      setNotification("Task deleted.");
      setTimeout(() => setNotification(null), 4000);
    }
    setDeleteTarget(null);
    setView({ mode: "list" });
  }, [deleteTarget, localTasks, localDetails, onTasksChange]);

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
      onTasksChange?.(nextTasks, nextDetails);
    },
    [localTasks, localDetails, onTasksChange]
  );

  const getTaskDetail = useCallback(
    (id: string) => localDetails.find((t) => t.id === id),
    [localDetails]
  );

  const getEditFormData = useCallback(
    (id: string): Partial<TaskFormData> | undefined => {
      const task = getTaskDetail(id);
      if (!task) return undefined;
      return {
        title: task.title,
        description: task.description || "",
        assignedToId: task.assignedTo.id,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate
          ? task.dueDate.toISOString().split("T")[0]
          : "",
      };
    },
    [getTaskDetail]
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
              Back to tasks
            </Button>
          }
        />
      );
    }
    return (
      <TaskDetails
        task={detail}
        onBack={() => setView({ mode: "list" })}
        onEdit={() => setView({ mode: "edit", taskId: view.taskId })}
        onDelete={() => setDeleteTarget(view.taskId)}
        onStatusChange={handleStatusChange}
        showAdminActions
      />
    );
  }

  // ─── Create view ───────────────────────────────────────────────────────────
  if (view.mode === "create") {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Create Task"
          description="Add a new task and assign it to a team member."
          breadcrumbs={[
            { label: "Admin" },
            { label: "Tasks", href: "#" },
            { label: "Create" },
          ]}
        />
        <Card>
          <CardContent>
            <TaskForm
              assignableUsers={assignableUsers}
              onSubmit={handleCreateSubmit}
              onCancel={() => setView({ mode: "list" })}
              submitLabel="Create Task"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Edit view ─────────────────────────────────────────────────────────────
  if (view.mode === "edit") {
    const formData = getEditFormData(view.taskId);
    const detail = getTaskDetail(view.taskId);
    return (
      <div className="space-y-6">
        <PageHeader
          title="Edit Task"
          description={`Editing: ${detail?.title ?? "Unknown"}`}
          breadcrumbs={[
            { label: "Admin" },
            { label: "Tasks", href: "#" },
            { label: "Edit" },
          ]}
        />
        <Card>
          <CardContent>
            <TaskForm
              initialData={formData}
              assignableUsers={assignableUsers}
              onSubmit={handleEditSubmit}
              onCancel={() =>
                setView({ mode: "detail", taskId: view.taskId })
              }
              submitLabel="Save Changes"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── List view (default) ───────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks"
        description="Manage and track all tasks across your team."
        breadcrumbs={[{ label: "Admin" }, { label: "Tasks" }]}
        actions={
          <Button
            variant="primary"
            onClick={() => setView({ mode: "create" })}
            icon={<i className="fa-solid fa-plus"></i>}
          >
            Create Task
          </Button>
        }
      />

      {notification && (
        <div className="pixel-card-sub bg-emerald-900 border-emerald-500 text-emerald-100 p-3 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-check text-emerald-400"></i>
            <span className="font-pixel-sub text-sm font-bold">{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-emerald-300 hover:text-white"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* Filters */}
      <TaskFilters
        filters={filters}
        onFiltersChange={setFilters}
        assignableUsers={assignableUsers}
      />

      {/* Results summary */}
      <div className="flex items-center justify-between font-pixel-sub text-xs text-gray-400 mb-2">
        <p>
          Showing{" "}
          <span className="text-white font-bold">
            {filteredTasks.length}
          </span>{" "}
          of {localTasks.length} tasks
        </p>
      </div>

      {/* Task table or empty state */}
      {filteredTasks.length === 0 ? (
        <EmptyState
          title={filters.search || filters.status !== "ALL" || filters.priority !== "ALL" || filters.assigneeId
            ? "No tasks match your filters"
            : "No tasks yet"}
          description={
            filters.search || filters.status !== "ALL" || filters.priority !== "ALL" || filters.assigneeId
              ? "Try adjusting your search or filter criteria."
              : "Create your first task to get started."
          }
          action={
            filters.search || filters.status !== "ALL" || filters.priority !== "ALL" || filters.assigneeId ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setFilters(defaultFilters)}
              >
                Clear all filters
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setView({ mode: "create" })}
              >
                Create Task
              </Button>
            )
          }
        />
      ) : (
        <Card>
          <CardContent>
            <TaskTable
              tasks={filteredTasks}
              showAssignee
              showActions
              onTaskClick={(id) => setView({ mode: "detail", taskId: id })}
              onTaskEdit={(id) => setView({ mode: "edit", taskId: id })}
              onTaskDelete={(id) => setDeleteTarget(id)}
            />
          </CardContent>
        </Card>
      )}

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete Task"
        description="Are you sure you want to delete this task? This action cannot be undone."
        confirmLabel="Delete Task"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};
