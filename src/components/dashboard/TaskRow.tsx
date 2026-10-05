/**
 * src/components/dashboard/TaskRow.tsx
 *
 * A single task row used inside recent-task tables / lists on both dashboards.
 * On ≥ md screens: horizontal table-style row.
 * On mobile: stacked card-like layout.
 */
import React from "react";
import { Badge } from "../ui/Badge";
import { formatDueDate, getInitials } from "../../lib/format";
import type { TaskSummary } from "../../lib/types";

export interface TaskRowProps {
  task: TaskSummary;
  /** When true, shows the assigned-user column (admin sees all tasks) */
  showAssignee?: boolean;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  task,
  showAssignee = true,
}) => {
  const due = formatDueDate(task.dueDate);

  const dueDateClass = due.isOverdue
    ? "text-[#ae2e24] font-semibold"
    : due.isDueSoon
    ? "text-amber-600 font-medium"
    : "text-[#6b778c]";

  return (
    <div className="flex flex-col gap-3 py-4 border-b border-[#e2e8f0] last:border-b-0 sm:flex-row sm:items-center sm:gap-4">
      {/* Title */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#292a2e] truncate">{task.title}</p>
        {showAssignee && (
          <p className="text-xs text-[#6b778c] mt-0.5 flex items-center gap-1.5">
            <span
              className="inline-flex w-5 h-5 rounded-full bg-[#deebff] text-[#0065ff] text-[10px] font-bold items-center justify-center shrink-0"
              aria-hidden="true"
            >
              {getInitials(task.assignedTo.name)}
            </span>
            {task.assignedTo.name}
          </p>
        )}
      </div>

      {/* Badges row — always visible */}
      <div className="flex items-center gap-2 flex-wrap sm:shrink-0">
        <Badge variant="status" status={task.status} />
        <Badge variant="priority" priority={task.priority} />
      </div>

      {/* Due date */}
      <div className="sm:shrink-0 sm:w-36 text-left sm:text-right">
        <span className={`text-xs ${dueDateClass}`}>{due.label}</span>
      </div>
    </div>
  );
};
