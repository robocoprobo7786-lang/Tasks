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
  { label: string; icon: string; styles: string }
> = {
  TODO: {
    label: "To Do",
    icon: "○",
    styles: "bg-slate-100 text-slate-700 border-slate-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    icon: "◐",
    styles: "bg-[#deebff] text-[#0065ff] border-[#0065ff]/30",
  },
  COMPLETED: {
    label: "Completed",
    icon: "●",
    styles: "bg-emerald-50 text-emerald-700 border-emerald-200",
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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${config.styles} ${className}`}
      title={config.label}
    >
      <span className="text-[10px] leading-none" aria-hidden="true">
        {config.icon}
      </span>
      {!compact && <span>{config.label}</span>}
    </span>
  );
};
