/**
 * src/components/tasks/TaskTable.tsx
 *
 * A responsive task table/list component.
 * On desktop (≥lg): renders a proper table with sortable column headers.
 * On mobile/tablet: renders a card-based list layout.
 *
 * Used by both admin tasks page and user's my-tasks page.
 */
"use client";

import React from "react";
import { Badge } from "../ui/Badge";
import { formatDueDate, getInitials } from "../../lib/format";
import type { TaskSummary } from "../../lib/types";

export interface TaskTableProps {
  tasks: TaskSummary[];
  /** Show the assignee column (admin view) */
  showAssignee?: boolean;
  /** Called when user clicks a task row — navigates to detail */
  onTaskClick?: (taskId: string) => void;
  /** Called when user clicks the edit action */
  onTaskEdit?: (taskId: string) => void;
  /** Called when user clicks the delete action */
  onTaskDelete?: (taskId: string) => void;
  /** Show action buttons column */
  showActions?: boolean;
}

export const TaskTable: React.FC<TaskTableProps> = ({
  tasks,
  showAssignee = true,
  onTaskClick,
  onTaskEdit,
  onTaskDelete,
  showActions = false,
}) => {
  if (tasks.length === 0) return null;

  return (
    <>
      {/* ── Desktop Table (≥lg) ──────────────────────────────────────────── */}
      <div className="hidden lg:block overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="pb-3 font-pixel-sub text-xs text-gray-400">Title</th>
              {showAssignee && (
                <th className="pb-3 font-pixel-sub text-xs text-gray-400">Assignee</th>
              )}
              <th className="pb-3 font-pixel-sub text-xs text-gray-400">Status</th>
              <th className="pb-3 font-pixel-sub text-xs text-gray-400">Priority</th>
              <th className="pb-3 font-pixel-sub text-xs text-gray-400">Due Date</th>
              {showActions && (
                <th className="pb-3 font-pixel-sub text-xs text-gray-400 text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const due = formatDueDate(task.dueDate);
              const dueDateClass = due.isOverdue
                ? "text-red-500 font-bold"
                : due.isDueSoon
                ? "text-amber-500 font-bold"
                : "text-gray-400";

              return (
                <tr
                  key={task.id}
                  className="border-b border-gray-800 last:border-b-0 hover:bg-[#18201a] transition-colors duration-150 group"
                >
                  <td className="py-4 pr-4">
                    <button
                      type="button"
                      onClick={() => onTaskClick?.(task.id)}
                      className="font-pixel-sub text-sm font-bold text-white hover:text-green-300 transition-colors text-left cursor-pointer bg-transparent border-none p-0 truncate block max-w-[200px] xl:max-w-[400px]"
                      title={task.title}
                    >
                      {task.title}
                    </button>
                  </td>
                  {showAssignee && (
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-6 h-6 bg-blue-600 border border-black flex items-center justify-center font-pixel-title text-[8px] text-white shadow-[1px_1px_0_#000]"
                          aria-hidden="true"
                        >
                          {getInitials(task.assignedTo.name)}
                        </span>
                        <span className="font-pixel-sub text-xs text-gray-300">
                          {task.assignedTo.name}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="py-4 pr-4">
                    <Badge variant="status" status={task.status} />
                  </td>
                  <td className="py-4 pr-4">
                    <Badge variant="priority" priority={task.priority} />
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`font-pixel-sub text-xs ${dueDateClass}`}>
                      {due.label}
                    </span>
                  </td>
                  {showActions && (
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onTaskEdit && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onTaskEdit(task.id);
                            }}
                            className="text-gray-500 hover:text-blue-400 px-2 cursor-pointer transition-colors"
                            title="Edit task"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </button>
                        )}
                        {onTaskDelete && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onTaskDelete(task.id);
                            }}
                            className="text-gray-500 hover:text-red-500 px-2 cursor-pointer transition-colors"
                            title="Delete task"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile/Tablet Card List (<lg) ─────────────────────────────────── */}
      <div className="lg:hidden space-y-3">
        {tasks.map((task) => {
          const due = formatDueDate(task.dueDate);
          const dueDateClass = due.isOverdue
            ? "text-red-500 font-bold"
            : due.isDueSoon
            ? "text-amber-500 font-bold"
            : "text-gray-400";

          return (
            <div
              key={task.id}
              className="pixel-card-sub p-4 transition-all duration-150 hover:border-green-400"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => onTaskClick?.(task.id)}
                  className="font-pixel-sub text-sm font-bold text-white hover:text-green-300 transition-colors text-left cursor-pointer bg-transparent border-none p-0 flex-1 min-w-0 line-clamp-2"
                  title={task.title}
                >
                  {task.title}
                </button>
                {showActions && (
                  <div className="flex items-center gap-2 shrink-0">
                    {onTaskEdit && (
                      <button
                        type="button"
                        onClick={() => onTaskEdit(task.id)}
                        className="text-gray-500 hover:text-blue-400 cursor-pointer"
                        title="Edit task"
                      >
                        <i className="fa-solid fa-pen"></i>
                      </button>
                    )}
                    {onTaskDelete && (
                      <button
                        type="button"
                        onClick={() => onTaskDelete(task.id)}
                        className="text-gray-500 hover:text-red-500 cursor-pointer"
                        title="Delete task"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {showAssignee && (
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-5 h-5 bg-blue-600 border border-black flex items-center justify-center font-pixel-title text-[8px] text-white shadow-[1px_1px_0_#000]"
                    aria-hidden="true"
                  >
                    {getInitials(task.assignedTo.name)}
                  </span>
                  <span className="font-pixel-sub text-xs text-gray-400">
                    {task.assignedTo.name}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 flex-wrap mt-3">
                <div className="flex items-center gap-2">
                  <Badge variant="status" status={task.status} />
                  <Badge variant="priority" priority={task.priority} />
                </div>
                <span className={`font-pixel-sub text-xs ${dueDateClass}`}>{due.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
