/**
 * src/lib/types.ts
 *
 * Shared UI-facing TypeScript types derived from the database schema.
 * These shape the props that dashboard and other page components receive.
 * When real server queries are added, the Drizzle `$inferSelect` types
 * from schema.ts should be mapped into these structures.
 */

export type TaskStatus = "TODO" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";
export type UserRole = "ADMIN" | "USER";

export interface UserSummary {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
}

export interface TaskSummary {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  assignedTo: UserSummary;
  createdBy: UserSummary;
}

/** Extended task details — includes description, timestamps, etc. */
export interface TaskDetail extends TaskSummary {
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/** Form data shape used by TaskForm for create/edit */
export interface TaskFormData {
  title: string;
  description: string;
  assignedToId: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string; // ISO date string for input[type=date]
}

/** Filters state used by task listing pages */
export interface TaskFiltersState {
  search: string;
  status: TaskStatus | "ALL";
  priority: TaskPriority | "ALL";
  assigneeId: string; // "" means all
  sortBy: TaskSortField;
  sortOrder: "asc" | "desc";
}

export type TaskSortField = "title" | "dueDate" | "priority" | "status" | "assignee";

/** Form data shape used by UserForm for create/edit */
export interface UserFormData {
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  isActive: boolean;
}

/** Filters state used by user listing page */
export interface UserFiltersState {
  search: string;
  role: UserRole | "ALL";
  status: "ALL" | "ACTIVE" | "INACTIVE";
}


/** Shape of data the AdminDashboard component consumes */
export interface AdminDashboardData {
  taskCounts: {
    total: number;
    todo: number;
    inProgress: number;
    completed: number;
  };
  priorityCounts: {
    high: number;
    medium: number;
    low: number;
  };
  recentTasks: TaskSummary[];
  teamMembers: UserSummary[];
}

/** Shape of data the UserDashboard component consumes */
export interface UserDashboardData {
  currentUser: UserSummary;
  taskCounts: {
    total: number;
    todo: number;
    inProgress: number;
    completed: number;
  };
  todoTasks: TaskSummary[];
  inProgressTasks: TaskSummary[];
  recentlyCompleted: TaskSummary[];
  upcomingDueDates: TaskSummary[];
}
