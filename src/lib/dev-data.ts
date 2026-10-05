/**
 * src/lib/dev-data.ts
 *
 * Development-only static fixture data that mirrors the seeded Neon database.
 * This is used exclusively when real DB queries are not yet wired up.
 *
 * FUTURE: Replace exports here with actual Drizzle queries from src/db/index.ts,
 * keeping the return types identical so dashboard components require zero changes.
 */

import type {
  AdminDashboardData,
  TaskDetail,
  TaskSummary,
  UserDashboardData,
  UserSummary,
} from "./types";

// ─── Seed-matching user fixtures ────────────────────────────────────────────

const adminUser: UserSummary = {
  id: "seed-admin-1",
  name: "Admin User",
  phone: "9000000001",
  role: "ADMIN",
  isActive: true,
};

const alice: UserSummary = {
  id: "seed-user-2",
  name: "Alice Johnson",
  phone: "9000000002",
  role: "USER",
  isActive: true,
};

const bob: UserSummary = {
  id: "seed-user-3",
  name: "Bob Smith",
  phone: "9000000003",
  role: "USER",
  isActive: true,
};

const charlie: UserSummary = {
  id: "seed-user-4",
  name: "Charlie Davis",
  phone: "9000000004",
  role: "USER",
  isActive: true,
};

const diana: UserSummary = {
  id: "seed-user-5",
  name: "Diana Wilson",
  phone: "9000000005",
  role: "USER",
  isActive: true,
};

const evan: UserSummary = {
  id: "seed-user-6",
  name: "Evan Thomas",
  phone: "9000000006",
  role: "USER",
  isActive: false,
};

// All 6 team members in insertion order
export const devTeamMembers: UserSummary[] = [
  adminUser,
  alice,
  bob,
  charlie,
  diana,
  evan,
];

// ─── Seed-matching task fixtures ─────────────────────────────────────────────

const now = Date.now();
const day = 24 * 60 * 60 * 1000;

export const devTasks: TaskSummary[] = [
  {
    id: "task-1",
    title: "Set up project repository",
    status: "TODO",
    priority: "HIGH",
    dueDate: new Date(now + 3 * day),
    assignedTo: alice,
    createdBy: adminUser,
  },
  {
    id: "task-2",
    title: "Design login screen",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    dueDate: new Date(now + 5 * day),
    assignedTo: alice,
    createdBy: adminUser,
  },
  {
    id: "task-3",
    title: "Create dashboard layout",
    status: "TODO",
    priority: "HIGH",
    dueDate: null,
    assignedTo: bob,
    createdBy: adminUser,
  },
  {
    id: "task-4",
    title: "Implement task creation form",
    status: "IN_PROGRESS",
    priority: "HIGH",
    dueDate: new Date(now + 7 * day),
    assignedTo: bob,
    createdBy: adminUser,
  },
  {
    id: "task-5",
    title: "Review product requirements",
    status: "COMPLETED",
    priority: "LOW",
    dueDate: null,
    assignedTo: charlie,
    createdBy: adminUser,
  },
  {
    id: "task-6",
    title: "Configure database connection",
    status: "COMPLETED",
    priority: "HIGH",
    dueDate: new Date(now - 2 * day),
    assignedTo: charlie,
    createdBy: adminUser,
  },
  {
    id: "task-7",
    title: "Build user management page",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: new Date(now + 10 * day),
    assignedTo: diana,
    createdBy: adminUser,
  },
  {
    id: "task-8",
    title: "Add task filtering",
    status: "IN_PROGRESS",
    priority: "LOW",
    dueDate: null,
    assignedTo: diana,
    createdBy: adminUser,
  },
  {
    id: "task-9",
    title: "Implement task status updates",
    status: "TODO",
    priority: "HIGH",
    dueDate: new Date(now + 4 * day),
    assignedTo: alice,
    createdBy: adminUser,
  },
  {
    id: "task-10",
    title: "Test responsive mobile layout",
    status: "IN_PROGRESS",
    priority: "MEDIUM",
    dueDate: null,
    assignedTo: charlie,
    createdBy: adminUser,
  },
  {
    id: "task-11",
    title: "Prepare deployment configuration",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: new Date(now + 14 * day),
    assignedTo: bob,
    createdBy: adminUser,
  },
  {
    id: "task-12",
    title: "Review application accessibility",
    status: "COMPLETED",
    priority: "LOW",
    dueDate: null,
    assignedTo: diana,
    createdBy: adminUser,
  },
];

// ─── Detailed task fixtures (TaskDetail — includes description & timestamps) ─

export const devTaskDetails: TaskDetail[] = devTasks.map((task, index) => ({
  ...task,
  description: [
    "Set up the project repository with proper branching strategy, CI/CD pipeline, and README documentation. Ensure all team members have access and the initial project structure follows our coding standards.",
    "Create the login screen design following the brand guidelines. Include OTP-based phone authentication flow, error states, and loading indicators. The design should be mobile-first and responsive.",
    "Design and implement the main dashboard layout with sidebar navigation, responsive header, and content area. The layout should adapt gracefully from mobile to desktop viewports.",
    "Build the task creation form with fields for title, description, assignee, priority, due date, and status. Include proper validation and error handling. Form should be reusable for editing.",
    "Go through the product requirements document and provide feedback. Identify any gaps, ambiguities, or technical constraints that need to be addressed before implementation begins.",
    "Configure the PostgreSQL database connection using Drizzle ORM. Set up connection pooling, environment-specific configs, and verify the schema migrations are working correctly.",
    "Build the user management page for admins. Include user listing with search/filter, role management, and active/inactive status toggling. Design should match the existing dashboard aesthetic.",
    "Implement task filtering functionality with support for status, priority, assignee, and search text. Filters should be composable and URL-queryable for shareable filtered views.",
    "Add the ability for users to update task status (TODO → IN_PROGRESS → COMPLETED). Include confirmation for status changes and visual feedback for the transition.",
    "Test the application across different mobile screen sizes. Document any layout issues, touch target problems, or usability concerns. Create a test report with screenshots.",
    "Set up the deployment configuration for staging and production environments. Configure environment variables, build optimizations, and health check endpoints.",
    "Conduct an accessibility audit of the application. Check WCAG 2.1 AA compliance including keyboard navigation, screen reader support, color contrast, and focus management.",
  ][index] || null,
  createdAt: new Date(now - (12 - index) * day),
  updatedAt: new Date(now - Math.floor(index / 3) * day),
}));

// ─── Pre-computed AdminDashboardData ─────────────────────────────────────────

export const devAdminDashboardData: AdminDashboardData = {
  taskCounts: {
    total: devTasks.length,
    todo: devTasks.filter((t) => t.status === "TODO").length,
    inProgress: devTasks.filter((t) => t.status === "IN_PROGRESS").length,
    completed: devTasks.filter((t) => t.status === "COMPLETED").length,
  },
  priorityCounts: {
    high: devTasks.filter((t) => t.priority === "HIGH").length,
    medium: devTasks.filter((t) => t.priority === "MEDIUM").length,
    low: devTasks.filter((t) => t.priority === "LOW").length,
  },
  recentTasks: devTasks.slice(0, 6),
  teamMembers: devTeamMembers,
};

// ─── Pre-computed UserDashboardData (Alice's POV) ────────────────────────────

const aliceTasks = devTasks.filter((t) => t.assignedTo.id === alice.id);

export const devUserDashboardData: UserDashboardData = {
  currentUser: alice,
  taskCounts: {
    total: aliceTasks.length,
    todo: aliceTasks.filter((t) => t.status === "TODO").length,
    inProgress: aliceTasks.filter((t) => t.status === "IN_PROGRESS").length,
    completed: aliceTasks.filter((t) => t.status === "COMPLETED").length,
  },
  todoTasks: aliceTasks.filter((t) => t.status === "TODO"),
  inProgressTasks: aliceTasks.filter((t) => t.status === "IN_PROGRESS"),
  recentlyCompleted: aliceTasks.filter((t) => t.status === "COMPLETED"),
  upcomingDueDates: aliceTasks
    .filter((t) => t.dueDate !== null && t.status !== "COMPLETED")
    .sort(
      (a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0)
    ),
};

// ─── Helper: find a task detail by ID ────────────────────────────────────────

export function getDevTaskById(id: string): TaskDetail | undefined {
  return devTaskDetails.find((t) => t.id === id);
}

// ─── Helper: get the "current user" for user-role views ──────────────────────

export function getDevCurrentUser(): UserSummary {
  return alice;
}

// ─── Helper: get active assignable users ─────────────────────────────────────

export function getDevAssignableUsers(): UserSummary[] {
  return devTeamMembers.filter((u) => u.isActive);
}
