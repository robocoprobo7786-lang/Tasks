/**
 * src/components/dashboard/UserDashboard.tsx
 *
 * User-role dashboard view.
 *
 * Props shape is UserDashboardData from src/lib/types.ts.
 * Pure presentational — receives all data via props for easy
 * swap-in of real DB results later.
 */
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { EmptyState } from "../ui/EmptyState";
import { StatCard } from "./StatCard";
import { TaskRow } from "./TaskRow";
import { formatDueDate, getInitials } from "../../lib/format";
import type { TaskSummary, UserDashboardData } from "../../lib/types";

export interface UserDashboardProps {
  data: UserDashboardData;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ data }) => {
  const {
    currentUser,
    taskCounts,
    todoTasks,
    inProgressTasks,
    recentlyCompleted,
    upcomingDueDates,
  } = data;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="space-y-8">
      {/* ── Welcome header ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#deebff] text-[#0065ff] font-extrabold text-base flex items-center justify-center border-2 border-[#0065ff]/20 shrink-0">
            {getInitials(currentUser.name)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#292a2e] tracking-tight">
              {greeting}, {currentUser.name.split(" ")[0]}!
            </h1>
            <p className="text-sm text-[#6b778c] mt-0.5">
              Here&rsquo;s a summary of your assigned work.
            </p>
          </div>
        </div>

        <Badge variant="role" role={currentUser.role} className="self-start sm:self-auto" />
      </div>

      {/* ── My task counts ────────────────────────────────────────────────── */}
      <section aria-labelledby="my-tasks-heading">
        <h2 id="my-tasks-heading" className="text-base font-bold text-[#292a2e] mb-4">
          My Tasks
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Assigned to me"
            value={taskCounts.total}
            iconBg="bg-slate-100"
            iconColor="text-[#292a2e]"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
          <StatCard
            label="To Do"
            value={taskCounts.todo}
            iconBg="bg-slate-100"
            iconColor="text-slate-600"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
          <StatCard
            label="In Progress"
            value={taskCounts.inProgress}
            iconBg="bg-[#deebff]"
            iconColor="text-[#0065ff]"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
          />
          <StatCard
            label="Completed"
            value={taskCounts.completed}
            iconBg="bg-[#fff8e6]"
            iconColor="text-[#b37700]"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* ── Upcoming due dates ────────────────────────────────────────────── */}
      {upcomingDueDates.length > 0 && (
        <section aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className="text-base font-bold text-[#292a2e] mb-4">
            Upcoming Due Dates
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingDueDates.map((task) => {
              const due = formatDueDate(task.dueDate);
              return (
                <UpcomingTaskCard key={task.id} task={task} dueLabel={due.label} isOverdue={due.isOverdue} isDueSoon={due.isDueSoon} />
              );
            })}
          </div>
        </section>
      )}

      {/* ── In Progress ───────────────────────────────────────────────────── */}
      <section aria-labelledby="in-progress-heading">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle id="in-progress-heading">In Progress</CardTitle>
              <span className="text-xs bg-[#deebff] text-[#0065ff] border border-[#0065ff]/20 rounded-full px-2.5 py-0.5 font-semibold">
                {inProgressTasks.length}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-0">
            {inProgressTasks.length === 0 ? (
              <EmptyState
                title="No tasks in progress"
                description="Pick up a task from your To Do list to get started."
              />
            ) : (
              inProgressTasks.map((task) => (
                <TaskRow key={task.id} task={task} showAssignee={false} />
              ))
            )}
          </CardContent>
        </Card>
      </section>

      {/* ── To Do ─────────────────────────────────────────────────────────── */}
      <section aria-labelledby="todo-heading">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle id="todo-heading">To Do</CardTitle>
              <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 rounded-full px-2.5 py-0.5 font-semibold">
                {todoTasks.length}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-0">
            {todoTasks.length === 0 ? (
              <EmptyState
                title="No tasks to do"
                description="You're all caught up! Your to-do queue is empty."
              />
            ) : (
              todoTasks.map((task) => (
                <TaskRow key={task.id} task={task} showAssignee={false} />
              ))
            )}
          </CardContent>
        </Card>
      </section>

      {/* ── Recently Completed ────────────────────────────────────────────── */}
      <section aria-labelledby="completed-heading">
        <Card variant="secondary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle id="completed-heading">Recently Completed</CardTitle>
              <span className="text-xs bg-[#fff8e6] text-[#b37700] border border-[#fca700]/30 rounded-full px-2.5 py-0.5 font-semibold">
                {recentlyCompleted.length}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-0">
            {recentlyCompleted.length === 0 ? (
              <EmptyState
                title="Nothing completed yet"
                description="Completed tasks will appear here. Keep going!"
              />
            ) : (
              recentlyCompleted.map((task) => (
                <TaskRow key={task.id} task={task} showAssignee={false} />
              ))
            )}
          </CardContent>

          {recentlyCompleted.length > 0 && (
            <CardFooter>
              <span className="text-xs text-[#6b778c]">Great work! 🎉</span>
            </CardFooter>
          )}
        </Card>
      </section>
    </div>
  );
};

// ─── Upcoming task mini-card ─────────────────────────────────────────────────

interface UpcomingTaskCardProps {
  task: TaskSummary;
  dueLabel: string;
  isOverdue: boolean;
  isDueSoon: boolean;
}

const UpcomingTaskCard: React.FC<UpcomingTaskCardProps> = ({
  task,
  dueLabel,
  isOverdue,
  isDueSoon,
}) => {
  const borderColor = isOverdue
    ? "border-l-[#ae2e24]"
    : isDueSoon
    ? "border-l-[#fca700]"
    : "border-l-[#0065ff]";

  const dueLabelColor = isOverdue
    ? "text-[#ae2e24]"
    : isDueSoon
    ? "text-amber-600"
    : "text-[#0065ff]";

  return (
    <div
      className={`bg-white border border-[#e2e8f0] border-l-4 ${borderColor} rounded-2xl p-4 shadow-xs shadow-slate-200/50`}
    >
      <p className="text-sm font-semibold text-[#292a2e] mb-2 line-clamp-2">
        {task.title}
      </p>
      <div className="flex items-center justify-between gap-2">
        <Badge variant="priority" priority={task.priority} />
        <span className={`text-xs font-semibold ${dueLabelColor}`}>{dueLabel}</span>
      </div>
    </div>
  );
};
