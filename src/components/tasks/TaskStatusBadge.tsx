/**
 * src/components/tasks/TaskStatusBadge.tsx
 *
 * A dedicated status badge for tasks that includes both a visual dot indicator
 * and a human-readable label. Uses iconography alongside colour so status is
 * never communicated by colour alone.
 */
import React from "react";
import type { TaskStatus } from "../../lib/types";

export interface TaskStatusBadgeProps {
  status: TaskStatus;
  /** When true, renders a compact pill without the label text */
  compact?: boolean;
  className?: string;
}

const statusConfig: Record<
  TaskStatus,
  { label: string; dot: string; styles: string; textStyle: string }
> = {
  TODO: {
    label: "To Do",
    dot: "bg-slate-300",
    styles: "bg-transparent border-none px-0 py-0",
    textStyle: "text-[13px] font-medium text-[#0f172a] tracking-tight",
  },
  IN_PROGRESS: {
    label: "In Progress",
    dot: "bg-[#0065ff]",
    styles: "bg-transparent border-none px-0 py-0",
    textStyle: "text-[13px] font-medium text-[#0065ff] tracking-tight",
  },
  COMPLETED: {
    label: "Completed",
    dot: "bg-emerald-500",
    styles: "bg-transparent border-none px-0 py-0",
    textStyle: "text-[13px] font-medium text-emerald-700 tracking-tight",
  },
};

export const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({
  status,
  compact = false,
  className = "",
}) => {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-2 ${config.styles} ${className}`}
      title={config.label}
    >
      <span className={`w-2 h-2 rounded-full ${config.dot}`} aria-hidden="true" />
      {!compact && <span className={config.textStyle}>{config.label}</span>}
    </span>
  );
};
