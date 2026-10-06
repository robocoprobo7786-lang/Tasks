/**
 * src/components/dashboard/AdminDashboard.tsx
 *
 * Admin dashboard view.
 *
 * Props shape is AdminDashboardData from src/lib/types.ts.
 * The component is a pure presentational component — it receives data from
 * the parent page and renders it. When real server data is available, just
 * pass the DB result instead of the dev fixture.
 */
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui/EmptyState";
import { PageHeader } from "../ui/PageHeader";
import { StatCard } from "./StatCard";
import { TaskRow } from "./TaskRow";
import { TeamMemberRow } from "./TeamMemberRow";
import type { AdminDashboardData } from "../../lib/types";

export interface AdminDashboardProps {
  data: AdminDashboardData;
  onCreateTask?: () => void;
  onViewTasks?: () => void;
  onManageUsers?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data,
  onCreateTask,
  onViewTasks,
  onManageUsers,
}) => {
  const { taskCounts, priorityCounts, recentTasks, teamMembers } = data;

  return (
    <div className="space-y-8">
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <PageHeader
        title="Admin Dashboard"
        description="A real-time overview of tasks, team activity, and project progress."
        breadcrumbs={[{ label: "Admin" }, { label: "Dashboard" }]}
        actions={
          <Button
            variant="primary"
            onClick={onCreateTask}
            icon={
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
          >
            Create Task
          </Button>
        }
      />

      {/* ── Task status summary ──────────────────────────────────────────── */}
      <section aria-labelledby="task-summary-heading" className="space-y-3">
        <h3
          id="task-summary-heading"
          className="font-pixel-title text-xs text-gray-300 flex items-center space-x-2 mb-4"
        >
          <i className="fa-solid fa-square-poll-vertical text-green-400"></i>
          <span>Task Overview</span>
        </h3>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Tasks"
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

      {/* ── Priority summary ─────────────────────────────────────────────── */}
      <section aria-labelledby="priority-summary-heading" className="space-y-3">
        <h3
          id="priority-summary-heading"
          className="font-pixel-title text-xs text-gray-300 flex items-center space-x-2 mb-4"
        >
          <i className="fa-solid fa-layer-group text-green-400"></i>
          <span>By Priority</span>
        </h3>

        <div className="grid grid-cols-3 gap-4">
          <StatCard
            label="High Priority"
            value={priorityCounts.high}
            iconBg="bg-amber-950"
            iconColor="text-amber-400"
            icon={<i className="fa-solid fa-arrow-trend-up"></i>}
          />
          <StatCard
            label="Medium Priority"
            value={priorityCounts.medium}
            iconBg="bg-blue-950"
            iconColor="text-blue-400"
            icon={<i className="fa-solid fa-minus"></i>}
          />
          <StatCard
            label="Low Priority"
            value={priorityCounts.low}
            iconBg="bg-gray-900"
            iconColor="text-gray-400"
            icon={<i className="fa-solid fa-arrow-trend-down"></i>}
          />
        </div>
      </section>

      {/* ── Main content: Recent Tasks + Team Members ────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Recent Tasks — wider column */}
        <section
          aria-labelledby="recent-tasks-heading"
          className="xl:col-span-3"
        >
          <Card>
            <CardHeader>
              <CardTitle id="recent-tasks-heading">Recent Tasks</CardTitle>
              <span className="pixel-badge bg-gray-800 text-gray-300 border-gray-600">
                {recentTasks.length} shown
              </span>
            </CardHeader>

            <CardContent>
              {recentTasks.length === 0 ? (
                <EmptyState
                  title="No tasks yet"
                  description="Create your first task to track project progress."
                  action={
                    <Button variant="primary" size="sm" onClick={onCreateTask}>
                      Create Task
                    </Button>
                  }
                />
              ) : (
                <div>
                  {recentTasks.map((task) => (
                    <TaskRow key={task.id} task={task} showAssignee />
                  ))}
                </div>
              )}
            </CardContent>

            {recentTasks.length > 0 && (
              <CardFooter>
                <span className="font-pixel-sub text-xs text-gray-400">
                  Showing latest {recentTasks.length} of {taskCounts.total} tasks
                </span>
                <Button variant="ghost" size="sm" onClick={onViewTasks}>
                  View all tasks →
                </Button>
              </CardFooter>
            )}
          </Card>
        </section>

        {/* Team Members — narrower column */}
        <section
          aria-labelledby="team-heading"
          className="xl:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle id="team-heading">Team Members</CardTitle>
              <span className="pixel-badge bg-gray-800 text-gray-300 border-gray-600">
                {teamMembers.length} total
              </span>
            </CardHeader>

            <CardContent>
              {teamMembers.length === 0 ? (
                <EmptyState
                  title="No team members"
                  description="Add team members to start assigning tasks."
                />
              ) : (
                <div>
                  {teamMembers.map((user) => (
                    <TeamMemberRow key={user.id} user={user} />
                  ))}
                </div>
              )}
            </CardContent>

            {teamMembers.length > 0 && (
              <CardFooter>
                <span className="font-pixel-sub text-xs text-gray-400">
                  {teamMembers.filter((u) => u.isActive).length} active ·{" "}
                  {teamMembers.filter((u) => !u.isActive).length} inactive
                </span>
                <Button variant="ghost" size="sm" onClick={onManageUsers}>
                  Manage users →
                </Button>
              </CardFooter>
            )}
          </Card>
        </section>
      </div>
    </div>
  );
};
