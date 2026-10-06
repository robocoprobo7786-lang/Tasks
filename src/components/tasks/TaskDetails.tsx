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
import { Badge } from "../ui/Badge";
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
    ? "text-red-500 font-bold"
    : due.isDueSoon
    ? "text-amber-500 font-bold"
    : "text-gray-300";

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
          className="inline-flex items-center gap-2 font-pixel-sub text-sm text-gray-400 hover:text-green-300 transition-colors cursor-pointer bg-transparent border-none p-0 min-h-[44px]"
        >
          <i className="fa-solid fa-arrow-left"></i>
          Back to tasks
        </button>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="font-pixel-title text-2xl sm:text-3xl text-white tracking-tight mb-3 break-words">
            {task.title}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="status" status={task.status} />
            <Badge variant="priority" priority={task.priority} />
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
                  <i className="fa-solid fa-check"></i>
                ) : (
                  <i className="fa-solid fa-play"></i>
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
              <h2 className="font-pixel-title text-base text-gray-300 mb-3">
                Description
              </h2>
              {task.description ? (
                <p className="font-pixel-sub text-sm text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
                  {task.description}
                </p>
              ) : (
                <p className="font-pixel-sub text-sm text-gray-500 italic">
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
                icon={<i className="fa-regular fa-calendar text-gray-500"></i>}
              >
                <span className={`font-pixel-sub text-sm ${dueDateClass}`}>{due.label}</span>
                {task.dueDate && (
                  <span className="font-pixel-sub text-xs text-gray-500 block mt-0.5">
                    {task.dueDate.toLocaleDateString("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                )}
              </DetailRow>

              {/* Assigned to */}
              <DetailRow
                label="Assigned To"
                icon={<i className="fa-solid fa-user text-gray-500"></i>}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 border border-black flex items-center justify-center font-pixel-title text-[8px] text-white shadow-[1px_1px_0_#000]">
                    {getInitials(task.assignedTo.name)}
                  </span>
                  <span className="font-pixel-sub text-sm text-gray-300">
                    {task.assignedTo.name}
                  </span>
                </div>
              </DetailRow>

              {/* Created by */}
              <DetailRow
                label="Created By"
                icon={<i className="fa-solid fa-user-pen text-gray-500"></i>}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-600 border border-black flex items-center justify-center font-pixel-title text-[8px] text-white shadow-[1px_1px_0_#000]">
                    {getInitials(task.createdBy.name)}
                  </span>
                  <span className="font-pixel-sub text-sm text-gray-300">
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
                icon={<i className="fa-regular fa-clock text-gray-500"></i>}
              >
                <span className="font-pixel-sub text-sm text-gray-300">
                  {formatTimestamp(task.createdAt)}
                </span>
              </DetailRow>

              <DetailRow
                label="Last Updated"
                icon={<i className="fa-solid fa-clock-rotate-left text-gray-500"></i>}
              >
                <span className="font-pixel-sub text-sm text-gray-300">
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
    <div className="flex items-center gap-2 font-pixel-sub text-xs text-gray-500 uppercase tracking-wider">
      <span>{icon}</span>
      {label}
    </div>
    <div className="pl-6">{children}</div>
  </div>
);
