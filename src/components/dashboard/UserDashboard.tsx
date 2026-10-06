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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b-2 border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 border-2 border-black text-white font-pixel-title text-base flex items-center justify-center shadow-[2px_2px_0_#000] shrink-0">
            {getInitials(currentUser.name)}
          </div>
          <div>
            <h1 className="font-pixel-title text-sm md:text-xl text-white tracking-wide">
              {greeting}, {currentUser.name.split(" ")[0]}!
            </h1>
            <p className="font-pixel-sub text-base text-gray-400 mt-1">
              Here's a summary of your assigned work.
            </p>
          </div>
        </div>

        <Badge variant="role" role={currentUser.role} className="self-start sm:self-auto" />
      </div>

      {/* ── My task counts ────────────────────────────────────────────────── */}
      <section aria-labelledby="my-tasks-heading" className="space-y-3">
        <h3 id="my-tasks-heading" className="font-pixel-title text-xs text-gray-300 flex items-center space-x-2 mb-4">
          <i className="fa-solid fa-square-poll-vertical text-green-400"></i>
          <span>My Tasks</span>
        </h3>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Assigned to me"
            value={taskCounts.total}
            iconBg="bg-gray-800"
            iconColor="text-gray-300"
            icon={<i className="fa-regular fa-clipboard"></i>}
          />
          <StatCard
            label="To Do"
            value={taskCounts.todo}
            iconBg="bg-blue-950"
            iconColor="text-blue-300"
            icon={<i className="fa-regular fa-clock"></i>}
          />
          <StatCard
            label="In Progress"
            value={taskCounts.inProgress}
            iconBg="bg-amber-950"
            iconColor="text-amber-300"
            icon={<i className="fa-solid fa-arrows-rotate"></i>}
          />
          <StatCard
            label="Completed"
            value={taskCounts.completed}
            iconBg="bg-emerald-950"
            iconColor="text-emerald-300"
            icon={<i className="fa-regular fa-circle-check"></i>}
          />
        </div>
      </section>

      {/* ── Upcoming due dates ────────────────────────────────────────────── */}
      {upcomingDueDates.length > 0 && (
        <section aria-labelledby="upcoming-heading" className="space-y-3">
          <h3 id="upcoming-heading" className="font-pixel-title text-xs text-gray-300 flex items-center space-x-2 mb-4">
            <i className="fa-solid fa-calendar-day text-green-400"></i>
            <span>Upcoming Due Dates</span>
          </h3>
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
            <CardTitle id="in-progress-heading">In Progress</CardTitle>
            <span className="pixel-badge badge-in-progress">
              {inProgressTasks.length} shown
            </span>
          </CardHeader>

          <CardContent>
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
            <CardTitle id="todo-heading">To Do</CardTitle>
            <span className="pixel-badge badge-todo">
              {todoTasks.length} shown
            </span>
          </CardHeader>

          <CardContent>
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
        <Card>
          <CardHeader>
            <CardTitle id="completed-heading">Recently Completed</CardTitle>
            <span className="pixel-badge badge-completed">
              {recentlyCompleted.length} shown
            </span>
          </CardHeader>

          <CardContent>
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
              <span className="font-pixel-sub text-xs text-gray-400">Great work!</span>
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
    ? "border-red-500"
    : isDueSoon
    ? "border-amber-500"
    : "border-blue-500";

  const dueLabelColor = isOverdue
    ? "text-red-500"
    : isDueSoon
    ? "text-amber-500"
    : "text-blue-500";

  return (
    <div
      className={`pixel-card-sub p-3 border-l-4 ${borderColor} bg-[#18201a] transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]`}
    >
      <p className="font-pixel-sub text-sm font-bold text-white mb-2 line-clamp-2">
        {task.title}
      </p>
      <div className="flex items-center justify-between gap-2 mt-3">
        <Badge variant="priority" priority={task.priority} />
        <span className={`font-pixel-sub text-xs font-bold ${dueLabelColor}`}>{dueLabel}</span>
      </div>
    </div>
  );
};
