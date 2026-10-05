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
      <section aria-labelledby="task-summary-heading">
        <h2
          id="task-summary-heading"
          className="text-base font-bold text-[#292a2e] mb-4"
        >
          Task Overview
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Tasks"
            value={taskCounts.total}
            iconBg="bg-slate-100"
            iconColor="text-[#292a2e]"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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

      {/* ── Priority summary ─────────────────────────────────────────────── */}
      <section aria-labelledby="priority-summary-heading">
        <h2
          id="priority-summary-heading"
          className="text-base font-bold text-[#292a2e] mb-4"
        >
          By Priority
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <StatCard
            label="High Priority"
            value={priorityCounts.high}
            iconBg="bg-amber-50"
            iconColor="text-amber-600"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            }
          />
          <StatCard
            label="Medium Priority"
            value={priorityCounts.medium}
            iconBg="bg-[#deebff]"
            iconColor="text-[#0065ff]"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
              </svg>
            }
          />
          <StatCard
            label="Low Priority"
            value={priorityCounts.low}
            iconBg="bg-slate-100"
            iconColor="text-slate-500"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            }
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
              <div className="flex items-center justify-between">
                <CardTitle id="recent-tasks-heading">Recent Tasks</CardTitle>
                <span className="text-xs text-[#6b778c] bg-[#f8f8f8] border border-[#e2e8f0] rounded-full px-2.5 py-0.5 font-semibold">
                  {recentTasks.length} shown
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-0">
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
                <span className="text-xs text-[#6b778c]">
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
              <div className="flex items-center justify-between">
                <CardTitle id="team-heading">Team Members</CardTitle>
                <span className="text-xs text-[#6b778c] bg-[#f8f8f8] border border-[#e2e8f0] rounded-full px-2.5 py-0.5 font-semibold">
                  {teamMembers.length} total
                </span>
              </div>
            </CardHeader>

            <CardContent className="space-y-0">
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
                <span className="text-xs text-[#6b778c]">
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
