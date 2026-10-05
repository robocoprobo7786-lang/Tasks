"use client";

import React, { useState, useMemo } from "react";
import { AppShell } from "../components/layout/AppShell";
import { AdminDashboard } from "../components/dashboard/AdminDashboard";
import { UserDashboard } from "../components/dashboard/UserDashboard";
import { AdminTasksPage } from "../components/tasks/AdminTasksPage";
import { UserTasksPage } from "../components/tasks/UserTasksPage";
import { AdminUsersPage } from "../components/users/AdminUsersPage";
import {
  devTasks,
  devTaskDetails,
  devTeamMembers,
  getDevCurrentUser,
} from "../lib/dev-data";
import type {
  AdminDashboardData,
  TaskDetail,
  TaskStatus,
  TaskSummary,
  UserDashboardData,
  UserSummary,
} from "../lib/types";

type Role = "ADMIN" | "USER";

export default function Home() {
  const [role, setRole] = useState<Role>("ADMIN");
  const [activeHref, setActiveHref] = useState("/admin");
  const [adminTasksMode, setAdminTasksMode] = useState<"list" | "create">("list");

  // Lifted state so task creations, edits, deletes, and status changes persist across navigation
  const [allTasks, setAllTasks] = useState<TaskSummary[]>(devTasks);
  const [allTaskDetails, setAllTaskDetails] = useState<TaskDetail[]>(devTaskDetails);
  const [allUsers, setAllUsers] = useState<UserSummary[]>(devTeamMembers);

  const currentUser = useMemo(() => getDevCurrentUser(), []);

  const assignableUsers = useMemo(
    () => allUsers.filter((u) => u.isActive),
    [allUsers]
  );

  const toggleRole = () => {
    setRole((prev) => {
      const nextRole = prev === "ADMIN" ? "USER" : "ADMIN";
      setActiveHref(nextRole === "ADMIN" ? "/admin" : "/dashboard");
      return nextRole;
    });
  };

  const handleNavigate = (href: string) => {
    if (href === "/admin/tasks") {
      setAdminTasksMode("list");
    }
    setActiveHref(href);
  };

  const handleCreateTaskFromDashboard = () => {
    setAdminTasksMode("create");
    setActiveHref("/admin/tasks");
  };

  const handleTasksChange = (
    newTasks: TaskSummary[],
    newDetails: TaskDetail[]
  ) => {
    setAllTasks(newTasks);
    setAllTaskDetails(newDetails);
  };

  const handleUserStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setAllTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
    setAllTaskDetails((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date() } : t
      )
    );
  };

  // ─── Reactive Admin Dashboard Data ──────────────────────────────────────────
  const adminDashboardData = useMemo<AdminDashboardData>(() => {
    return {
      taskCounts: {
        total: allTasks.length,
        todo: allTasks.filter((t) => t.status === "TODO").length,
        inProgress: allTasks.filter((t) => t.status === "IN_PROGRESS").length,
        completed: allTasks.filter((t) => t.status === "COMPLETED").length,
      },
      priorityCounts: {
        high: allTasks.filter((t) => t.priority === "HIGH").length,
        medium: allTasks.filter((t) => t.priority === "MEDIUM").length,
        low: allTasks.filter((t) => t.priority === "LOW").length,
      },
      recentTasks: allTasks.slice(0, 6),
      teamMembers: allUsers,
    };
  }, [allTasks, allUsers]);

  // ─── Reactive User Dashboard Data ───────────────────────────────────────────
  const userDashboardData = useMemo<UserDashboardData>(() => {
    const userTasks = allTasks.filter(
      (t) => t.assignedTo.id === currentUser.id
    );
    return {
      currentUser,
      taskCounts: {
        total: userTasks.length,
        todo: userTasks.filter((t) => t.status === "TODO").length,
        inProgress: userTasks.filter((t) => t.status === "IN_PROGRESS").length,
        completed: userTasks.filter((t) => t.status === "COMPLETED").length,
      },
      todoTasks: userTasks.filter((t) => t.status === "TODO"),
      inProgressTasks: userTasks.filter((t) => t.status === "IN_PROGRESS"),
      recentlyCompleted: userTasks.filter((t) => t.status === "COMPLETED"),
      upcomingDueDates: userTasks
        .filter((t) => t.dueDate !== null && t.status !== "COMPLETED")
        .sort(
          (a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0)
        ),
    };
  }, [allTasks, currentUser]);

  // ─── Content routing based on role + activeHref ────────────────────────────
  const renderContent = () => {
    if (role === "ADMIN") {
      switch (activeHref) {
        case "/admin/tasks":
          return (
            <AdminTasksPage
              tasks={allTasks}
              taskDetails={allTaskDetails}
              assignableUsers={assignableUsers}
              initialMode={adminTasksMode}
              onTasksChange={handleTasksChange}
            />
          );
        case "/admin/users":
          return <AdminUsersPage users={allUsers} />;
        case "/admin":
        default:
          return (
            <AdminDashboard
              data={adminDashboardData}
              onCreateTask={handleCreateTaskFromDashboard}
              onViewTasks={() => handleNavigate("/admin/tasks")}
              onManageUsers={() => handleNavigate("/admin/users")}
            />
          );
      }
    }

    // USER role
    switch (activeHref) {
      case "/tasks": {
        const userTasks = allTasks.filter(
          (t) => t.assignedTo.id === currentUser.id
        );
        const userTaskDetails = allTaskDetails.filter(
          (t) => t.assignedTo.id === currentUser.id
        );
        return (
          <UserTasksPage
            currentUser={currentUser}
            tasks={userTasks}
            taskDetails={userTaskDetails}
            onStatusChange={handleUserStatusChange}
          />
        );
      }
      case "/dashboard":
      default:
        return <UserDashboard data={userDashboardData} />;
    }
  };

  return (
    <AppShell
      initialRole={role}
      activeHref={activeHref}
      onNavigate={handleNavigate}
      onRoleToggle={toggleRole}
    >
      {renderContent()}

      {/* Dev role toggle — visible at bottom on mobile where sidebar is hidden */}
      <div className="mt-10 pt-6 border-t border-[#e2e8f0] flex justify-center lg:hidden">
        <button
          type="button"
          onClick={toggleRole}
          className="text-xs font-semibold py-2 px-4 rounded-full bg-[#f8f8f8] border border-[#e2e8f0] text-[#0065ff] hover:bg-[#deebff]/40 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          Switch to {role === "ADMIN" ? "User" : "Admin"} View
        </button>
      </div>
    </AppShell>
  );
}
