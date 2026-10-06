/**
 * src/components/tasks/TaskCard.tsx
 *
 * A richer card representation of a task, used in kanban-style status
 * groups on the user "My Tasks" page. Includes status actions.
 */
"use client";

import React from "react";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { formatDueDate, getInitials } from "../../lib/format";
import type { TaskSummary, TaskStatus } from "../../lib/types";

export interface TaskCardProps {
  task: TaskSummary;
  /** Show assignee info */
  showAssignee?: boolean;
  /** Called when user clicks the card — navigate to detail */
  onTaskClick?: (taskId: string) => void;
  /** Called when user changes the task status */
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
}

const nextStatusMap: Record<TaskStatus, { label: string; next: TaskStatus } | null> = {
  TODO: { label: "Start Working", next: "IN_PROGRESS" },
  IN_PROGRESS: { label: "Mark Complete", next: "COMPLETED" },
  COMPLETED: null,
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  showAssignee = false,
  onTaskClick,
  onStatusChange,
}) => {
  const due = formatDueDate(task.dueDate);

  const borderColor =
    task.status === "COMPLETED"
      ? "border-l-emerald-400"
      : task.status === "IN_PROGRESS"
      ? "border-l-[#0065ff]"
      : "border-l-slate-300";

  const dueDateClass = due.isOverdue
    ? "text-[#ae2e24] font-semibold"
    : due.isDueSoon
    ? "text-amber-600 font-medium"
    : "text-[#6b778c]";

  const nextAction = nextStatusMap[task.status];

  return (
    <div
      className={`bg-white/85 backdrop-blur-[20px] backdrop-saturate-180 border border-white/40 border-l-4 ${borderColor} rounded-2xl p-4 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05),0_4px_6px_-2px_rgba(0,0,0,0.02)] hover:shadow-sm transition-all duration-150 group`}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <button
          type="button"
          onClick={() => onTaskClick?.(task.id)}
          className="text-sm font-semibold text-[#292a2e] hover:text-[#0065ff] transition-colors text-left cursor-pointer bg-transparent border-none p-0 flex-1 min-w-0 line-clamp-2"
        >
          {task.title}
        </button>
      </div>

      {/* Assignee */}
      {showAssignee && (
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex w-5 h-5 rounded-full bg-[#deebff] text-[#0065ff] text-[10px] font-bold items-center justify-center shrink-0"
            aria-hidden="true"
          >
            {getInitials(task.assignedTo.name)}
          </span>
          <span className="text-xs text-[#6b778c]">{task.assignedTo.name}</span>
        </div>
      )}

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <TaskStatusBadge status={task.status} />
        <TaskPriorityBadge priority={task.priority} />
      </div>

      {/* Due date & action */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-xs ${dueDateClass}`}>{due.label}</span>

        {nextAction && onStatusChange && (
          <button
            type="button"
            onClick={() => onStatusChange(task.id, nextAction.next)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer min-h-[32px] ${
              nextAction.next === "COMPLETED"
                ? "text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
                : "text-[#0065ff] bg-[#deebff]/60 hover:bg-[#deebff] border border-[#0065ff]/20"
            }`}
          >
            {nextAction.label}
          </button>
        )}
      </div>
    </div>
  );
};
