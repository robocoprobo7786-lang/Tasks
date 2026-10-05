/**
 * src/components/tasks/TaskDetails.tsx
 *
 * Full task detail view. Shows all task information in a clean,
 * structured layout. Used by both admin and user task detail views.
 */
"use client";

import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { TaskStatusBadge } from "./TaskStatusBadge";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
import { formatDueDate, getInitials } from "../../lib/format";
import type { TaskDetail, TaskStatus } from "../../lib/types";

export interface TaskDetailsProps {
  task: TaskDetail;
  /** Called when user clicks edit */
  onEdit?: () => void;
  /** Called when user clicks delete */
  onDelete?: () => void;
  /** Called when user clicks back */
  onBack?: () => void;
  /** Called when user changes task status */
  onStatusChange?: (taskId: string, newStatus: TaskStatus) => void;
  /** Whether to show admin actions (edit/delete) */
  showAdminActions?: boolean;
}

const nextStatusMap: Record<TaskStatus, { label: string; next: TaskStatus } | null> = {
  TODO: { label: "Start Working", next: "IN_PROGRESS" },
  IN_PROGRESS: { label: "Mark Complete", next: "COMPLETED" },
  COMPLETED: null,
};

export const TaskDetails: React.FC<TaskDetailsProps> = ({
  task,
  onEdit,
  onDelete,
  onBack,
  onStatusChange,
  showAdminActions = false,
}) => {
  const due = formatDueDate(task.dueDate);
  const nextAction = nextStatusMap[task.status];

  const dueDateClass = due.isOverdue
    ? "text-[#ae2e24] font-semibold"
    : due.isDueSoon
    ? "text-amber-600 font-medium"
    : "text-[#292a2e]";

  const formatTimestamp = (date: Date) =>
    date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-6">
      {/* Back button */}
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#6b778c] hover:text-[#0065ff] transition-colors cursor-pointer bg-transparent border-none p-0 min-h-[44px]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to tasks
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#292a2e] tracking-tight mb-3 break-words">
            {task.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <TaskStatusBadge status={task.status} />
            <TaskPriorityBadge priority={task.priority} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {nextAction && onStatusChange && (
            <Button
              variant={nextAction.next === "COMPLETED" ? "primary" : "outline"}
              size="sm"
              onClick={() => onStatusChange(task.id, nextAction.next)}
              icon={
                nextAction.next === "COMPLETED" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                )
              }
            >
              {nextAction.label}
            </Button>
          )}
          {showAdminActions && onEdit && (
            <Button variant="secondary" size="sm" onClick={onEdit}>
              Edit
            </Button>
          )}
          {showAdminActions && onDelete && (
            <Button variant="danger" size="sm" onClick={onDelete}>
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Description — wider column */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              <h2 className="text-base font-bold text-[#292a2e] mb-3">
                Description
              </h2>
              {task.description ? (
                <p className="text-sm text-[#292a2e] leading-relaxed whitespace-pre-wrap break-words">
                  {task.description}
                </p>
              ) : (
                <p className="text-sm text-[#6b778c] italic">
                  No description provided.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Metadata sidebar */}
        <div className="space-y-4">
          {/* Due Date */}
          <Card>
            <CardContent className="space-y-3">
              <DetailRow
                label="Due Date"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
              >
                <span className={dueDateClass}>{due.label}</span>
                {task.dueDate && (
                  <span className="text-xs text-[#6b778c] block mt-0.5">
                    {task.dueDate.toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </DetailRow>

              <div className="border-t border-[#e2e8f0]" />

              {/* Assigned to */}
              <DetailRow
                label="Assigned To"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-6 h-6 rounded-full bg-[#deebff] text-[#0065ff] text-[10px] font-bold items-center justify-center shrink-0">
                    {getInitials(task.assignedTo.name)}
                  </span>
                  <span className="text-sm font-medium text-[#292a2e]">
                    {task.assignedTo.name}
                  </span>
                </div>
              </DetailRow>

              <div className="border-t border-[#e2e8f0]" />

              {/* Created by */}
              <DetailRow
                label="Created By"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex w-6 h-6 rounded-full bg-purple-50 text-purple-700 text-[10px] font-bold items-center justify-center shrink-0 border border-purple-200">
                    {getInitials(task.createdBy.name)}
                  </span>
                  <span className="text-sm font-medium text-[#292a2e]">
                    {task.createdBy.name}
                  </span>
                </div>
              </DetailRow>
            </CardContent>
          </Card>

          {/* Timestamps */}
          <Card variant="secondary">
            <CardContent className="space-y-2">
              <DetailRow
                label="Created"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
              >
                <span className="text-sm text-[#292a2e]">
                  {formatTimestamp(task.createdAt)}
                </span>
              </DetailRow>

              <div className="border-t border-[#e2e8f0]" />

              <DetailRow
                label="Last Updated"
                icon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                }
              >
                <span className="text-sm text-[#292a2e]">
                  {formatTimestamp(task.updatedAt)}
                </span>
              </DetailRow>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// ─── Detail Row helper ──────────────────────────────────────────────────────

interface DetailRowProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, icon, children }) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
      <span className="text-[#6b778c]">{icon}</span>
      {label}
    </div>
    <div className="pl-6">{children}</div>
  </div>
);
