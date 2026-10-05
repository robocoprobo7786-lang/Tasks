/**
 * src/components/tasks/TaskPriorityBadge.tsx
 *
 * A dedicated priority badge for tasks. Uses arrows + text labels
 * alongside colour, so priority is never communicated by colour alone.
 */
import React from "react";
import type { TaskPriority } from "../../lib/types";

export interface TaskPriorityBadgeProps {
  priority: TaskPriority;
  /** When true, renders a compact pill without the label text */
  compact?: boolean;
  className?: string;
}

const priorityConfig: Record<
  TaskPriority,
  { label: string; icon: string; styles: string }
> = {
  LOW: {
    label: "Low",
    icon: "↓",
    styles: "bg-slate-100 text-slate-600 border-slate-200",
  },
  MEDIUM: {
    label: "Medium",
    icon: "→",
    styles: "bg-[#deebff] text-[#0065ff] border-[#0065ff]/20",
  },
  HIGH: {
    label: "High",
    icon: "↑",
    styles: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

export const TaskPriorityBadge: React.FC<TaskPriorityBadgeProps> = ({
  priority,
  compact = false,
  className = "",
}) => {
  const config = priorityConfig[priority];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${config.styles} ${className}`}
      title={`${config.label} Priority`}
    >
      <span className="text-xs font-bold leading-none" aria-hidden="true">
        {config.icon}
      </span>
      {!compact && <span>{config.label}</span>}
    </span>
  );
};
