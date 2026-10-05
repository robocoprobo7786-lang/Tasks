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
import { TaskStatusBadge } from "./TaskStatusBadge";
import { TaskPriorityBadge } from "./TaskPriorityBadge";
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
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#e2e8f0]">
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
                Title
              </th>
              {showAssignee && (
                <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
                  Assignee
                </th>
              )}
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
                Status
              </th>
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
                Priority
              </th>
              <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider">
                Due Date
              </th>
              {showActions && (
                <th className="pb-3 text-xs font-bold text-[#6b778c] uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const due = formatDueDate(task.dueDate);
              const dueDateClass = due.isOverdue
                ? "text-[#ae2e24] font-semibold"
                : due.isDueSoon
                ? "text-amber-600 font-medium"
                : "text-[#6b778c]";

              return (
                <tr
                  key={task.id}
                  className="border-b border-[#e2e8f0] last:border-b-0 hover:bg-[#f8f8f8]/50 transition-colors group"
                >
                  <td className="py-4 pr-4">
                    <button
                      type="button"
                      onClick={() => onTaskClick?.(task.id)}
                      className="text-sm font-semibold text-[#292a2e] hover:text-[#0065ff] transition-colors text-left cursor-pointer bg-transparent border-none p-0 truncate block max-w-[200px] xl:max-w-[400px]"
                      title={task.title}
                    >
                      {task.title}
                    </button>
                  </td>
                  {showAssignee && (
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-flex w-6 h-6 rounded-full bg-[#deebff] text-[#0065ff] text-[10px] font-bold items-center justify-center shrink-0"
                          aria-hidden="true"
                        >
                          {getInitials(task.assignedTo.name)}
                        </span>
                        <span className="text-sm text-[#292a2e]">
                          {task.assignedTo.name}
                        </span>
                      </div>
                    </td>
                  )}
                  <td className="py-4 pr-4">
                    <TaskStatusBadge status={task.status} />
                  </td>
                  <td className="py-4 pr-4">
                    <TaskPriorityBadge priority={task.priority} />
                  </td>
                  <td className="py-4 pr-4">
                    <span className={`text-xs ${dueDateClass}`}>
                      {due.label}
                    </span>
                  </td>
                  {showActions && (
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onTaskEdit && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onTaskEdit(task.id);
                            }}
                            className="p-2 rounded-lg text-[#6b778c] hover:text-[#0065ff] hover:bg-[#deebff]/40 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                            title="Edit task"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}
                        {onTaskDelete && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onTaskDelete(task.id);
                            }}
                            className="p-2 rounded-lg text-[#6b778c] hover:text-[#ae2e24] hover:bg-[#ffebe6] transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                            title="Delete task"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
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
            ? "text-[#ae2e24] font-semibold"
            : due.isDueSoon
            ? "text-amber-600 font-medium"
            : "text-[#6b778c]";

          return (
            <div
              key={task.id}
              className="bg-white border border-[#e2e8f0] rounded-2xl p-4 shadow-xs shadow-slate-200/50 hover:shadow-sm hover:border-slate-300 transition-all duration-150"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <button
                  type="button"
                  onClick={() => onTaskClick?.(task.id)}
                  className="text-sm font-semibold text-[#292a2e] hover:text-[#0065ff] transition-colors text-left cursor-pointer bg-transparent border-none p-0 flex-1 min-w-0 line-clamp-2"
                  title={task.title}
                >
                  {task.title}
                </button>
                {showActions && (
                  <div className="flex items-center gap-1 shrink-0">
                    {onTaskEdit && (
                      <button
                        type="button"
                        onClick={() => onTaskEdit(task.id)}
                        className="p-2 rounded-lg text-[#6b778c] hover:text-[#0065ff] hover:bg-[#deebff]/40 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Edit task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    )}
                    {onTaskDelete && (
                      <button
                        type="button"
                        onClick={() => onTaskDelete(task.id)}
                        className="p-2 rounded-lg text-[#6b778c] hover:text-[#ae2e24] hover:bg-[#ffebe6] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                        title="Delete task"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {showAssignee && (
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="inline-flex w-5 h-5 rounded-full bg-[#deebff] text-[#0065ff] text-[10px] font-bold items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    {getInitials(task.assignedTo.name)}
                  </span>
                  <span className="text-xs text-[#6b778c]">
                    {task.assignedTo.name}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <TaskStatusBadge status={task.status} />
                  <TaskPriorityBadge priority={task.priority} />
                </div>
                <span className={`text-xs ${dueDateClass}`}>{due.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
