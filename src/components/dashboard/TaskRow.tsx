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
    ? "text-red-500 font-bold"
    : due.isDueSoon
    ? "text-amber-500 font-bold"
    : "text-gray-400";

  return (
    <div className="pixel-card-sub p-3 flex flex-wrap items-center justify-between gap-3 hover:border-green-400 transition-all mb-3">
      <div className="flex items-center space-x-3 min-w-[220px]">
        {showAssignee && (
          <div className="w-8 h-8 bg-blue-600 border-2 border-black flex items-center justify-center font-pixel-title text-[10px] text-white shadow-[1px_1px_0_#000]">
            {getInitials(task.assignedTo.name)}
          </div>
        )}
        <div>
          <div className="font-pixel-sub text-base text-white font-bold cursor-pointer hover:text-green-300">
            {task.title}
          </div>
          {showAssignee && (
            <div className="font-pixel-sub text-xs text-gray-400">
              {task.assignedTo.name}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="status" status={task.status} />
        <Badge variant="priority" priority={task.priority} />
        
        {task.dueDate && (
          <span className={`font-pixel-sub text-xs ml-2 ${dueDateClass}`}>
            {due.label}
          </span>
        )}
      </div>
    </div>
  );
};
