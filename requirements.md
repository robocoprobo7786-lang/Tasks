# Task Manager — Requirements

## 1. Project Overview

A small task management application with two user roles:

- **Admin** — manages users and tasks.
- **User** — views assigned tasks and updates their status.

The application will use a fixed OTP for authentication during the initial MVP. No production SMS OTP provider is required at this stage.

---

## 2. Goals

The MVP should allow an administrator to:

1. Create and manage users.
2. Create tasks.
3. Assign tasks to users.
4. Track task status.

Users should be able to:

1. Sign in using their registered phone number and a fixed OTP.
2. View tasks assigned to them.
3. Update the status of their assigned tasks.

The application should be simple, secure through server-side authorization, and easy to deploy on Vercel.

---

## 3. Technology Stack

| Area | Technology |
|---|---|
| Framework | Next.js |
| Language | TypeScript / TSX |
| UI | Tailwind CSS |
| Authentication | Auth.js / NextAuth |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| Deployment | Vercel |
| OTP | Fixed OTP for MVP |

### Authentication note

The MVP will use a fixed OTP instead of an external SMS provider.

The fixed OTP must only be enabled for the intended MVP/development environment and must not be treated as production-grade authentication.

The OTP value should be configurable through an environment variable rather than hard-coded in application code.

Example:

```env
DEV_OTP=123456
```

---

## 4. User Roles

### 4.1 Admin

Admin users can:

- Sign in.
- View all users.
- Create users.
- Edit users.
- Activate/deactivate users.
- View all tasks.
- Create tasks.
- Assign tasks to users.
- Edit tasks.
- Delete tasks.
- Change task status.
- View task details.

### 4.2 User

Regular users can:

- Sign in using their phone number and OTP.
- View their assigned tasks.
- View task details.
- Update the status of their assigned tasks.

Users cannot:

- Create users.
- View other users' tasks unless explicitly assigned.
- Create tasks.
- Assign tasks.
- Delete tasks.
- Modify tasks belonging to other users.

---

## 5. Authentication Requirements

### 5.1 Login

The login flow is:

1. User enters their phone number.
2. Application checks that the phone number belongs to an active user.
3. User enters the fixed OTP.
4. Application verifies the OTP.
5. Auth.js creates an authenticated session.
6. User is redirected based on their role.

Suggested redirects:

- Admin → `/admin`
- User → `/tasks`

### 5.2 Fixed OTP

For the MVP:

- OTP is fixed.
- OTP is configurable through an environment variable.
- OTP must not be stored in the database.
- OTP verification must happen server-side.
- The fixed OTP must not be exposed in client-side JavaScript.
- An inactive user must not be allowed to sign in even with the correct OTP.

### 5.3 Future OTP Provider

Production SMS OTP is explicitly out of scope for the MVP.

The authentication implementation should be structured so that a real OTP provider such as MSG91 can be introduced later without redesigning the application's user/role model.

---

## 6. User Management

Only admins can manage users.

### 6.1 Create User

Admin can create a user with:

- Name
- Phone number
- Email (optional)
- Role
- Active/inactive status

For normal user creation, the role should default to `USER`.

### 6.2 User Status

Users should have an active/inactive state.

- Active users can authenticate and use the application.
- Inactive users cannot authenticate.
- Existing sessions for deactivated users should be rejected when authorization is checked.

### 6.3 User Uniqueness

Phone number must be unique.

Email, when provided, should also be unique.

---

## 7. Task Management

### 7.1 Task Fields

Each task should contain:

- ID
- Title
- Description
- Status
- Priority
- Due date
- Assigned user
- Created by
- Created date
- Updated date

### 7.2 Task Status

MVP statuses:

- `TODO`
- `IN_PROGRESS`
- `COMPLETED`

Optional future status:

- `BLOCKED`

### 7.3 Task Priority

MVP priorities:

- `LOW`
- `MEDIUM`
- `HIGH`

### 7.4 Create Task

Admin can create a task with:

- Title
- Description
- Assigned user
- Status
- Priority
- Due date

A task must have an assigned user.

### 7.5 Edit Task

Admin can edit:

- Title
- Description
- Assigned user
- Status
- Priority
- Due date

### 7.6 Delete Task

Admin can delete tasks.

Deletion should require an explicit user action/confirmation in the UI.

### 7.7 User Task Updates

A regular user can update the status of a task assigned to them.

A user cannot change:

- Task title
- Description
- Assignment
- Creator
- Priority
- Due date

unless this requirement is expanded later.

---

## 8. Authorization

Authorization must be enforced server-side.

Frontend UI visibility is not sufficient for security.

### Admin-only operations

The following operations require the `ADMIN` role:

- Create user
- Edit user
- Activate/deactivate user
- View all users
- Create task
- Edit any task
- Delete task
- Assign/reassign tasks
- View all tasks

### User operations

A regular user may:

- View their own assigned tasks.
- View details of their assigned tasks.
- Update status of their assigned tasks.

A user must never be able to access or modify another user's tasks by changing an ID in a URL or request.

---

## 9. Pages / Routes

### Public

```text
/login
```

### Admin

```text
/admin
/admin/users
/admin/users/new
/admin/users/[id]
/admin/tasks
/admin/tasks/new
/admin/tasks/[id]
```

### User

```text
/tasks
/tasks/[id]
```

The exact route structure can be adjusted during implementation.

---

## 10. Admin Dashboard

The admin dashboard should provide a simple overview.

Suggested metrics:

- Total users
- Active users
- Total tasks
- TODO tasks
- In-progress tasks
- Completed tasks

The dashboard should also provide quick access to:

- Create user
- Create task
- View users
- View tasks

---

## 11. User Dashboard

The user dashboard should focus on assigned work.

It should display:

- Total assigned tasks
- TODO tasks
- In-progress tasks
- Completed tasks

The main task list should show:

- Title
- Status
- Priority
- Due date

Users should be able to filter tasks by status.

---

## 12. Task List

### Admin task list

Admin can:

- View all tasks.
- Search tasks.
- Filter by status.
- Filter by priority.
- Filter by assigned user.
- Open task details.

### User task list

Users can:

- View only tasks assigned to themselves.
- Search their tasks.
- Filter by status.
- Filter by priority.

---

## 13. Database Schema

### users

Suggested fields:

```text
id
name
phone
email
role
is_active
created_at
updated_at
```

Suggested role values:

```text
ADMIN
USER
```

### tasks

Suggested fields:

```text
id
title
description
status
priority
due_date
assigned_to_id
created_by_id
created_at
updated_at
```

Relationships:

```text
users.id
    |
    +---- tasks.assigned_to_id
    |
    +---- tasks.created_by_id
```

A user can have many assigned tasks.

A user can create many tasks.

---

## 14. Drizzle ORM

Drizzle ORM will be used for:

- Database schema definition.
- Type-safe queries.
- Migrations.
- User queries.
- Task queries.

The database is PostgreSQL hosted on Neon.

The schema should use database-level constraints where appropriate, including:

- Unique phone number.
- Unique email when applicable.
- Foreign keys for task/user relationships.
- Non-null constraints for required task fields.
- Appropriate indexes for frequently queried fields.

---

## 15. Authentication / Session Model

Auth.js will manage authenticated sessions.

The session should contain enough information to identify:

- User ID
- User role

The application should retrieve the current user's identity server-side when performing protected operations.

Authorization should be checked on every protected server operation.

---

## 16. Server Actions / API

Next.js Server Actions are preferred for application mutations where practical.

Potential mutations:

```text
createUser
updateUser
deactivateUser
createTask
updateTask
deleteTask
updateTaskStatus
```

Queries can be implemented using server-side data fetching with Drizzle.

A traditional REST API is not required for the MVP unless a future external client needs one.

---

## 17. Environment Variables

Expected environment variables:

```env
DATABASE_URL=
AUTH_SECRET=
DEV_OTP=
```

Additional Auth.js configuration variables may be added depending on the selected Auth.js setup.

Production secrets must be stored in Vercel environment variables and never committed to source control.

---

## 18. Security Requirements

- Passwords are not used for users.
- Fixed OTP must remain server-side.
- Database credentials must never be exposed to the browser.
- Admin authorization must be checked server-side.
- User task ownership must be checked server-side.
- Users cannot access another user's tasks by manipulating URLs or request parameters.
- Inactive users cannot authenticate.
- Secrets must be stored as environment variables.
- Input should be validated before database operations.
- Destructive operations should require confirmation in the UI.
- Database queries should use Drizzle's parameterized/type-safe query mechanisms.

---

## 19. Validation Requirements

### User

- Name is required.
- Phone number is required.
- Phone number must be unique.
- Email is optional but must be valid when provided.
- Role must be one of the supported roles.

### Task

- Title is required.
- Description is optional.
- Assigned user is required.
- Status must be a supported status.
- Priority must be a supported priority.
- Due date is optional.

Server-side validation is required even when client-side validation exists.

---

## 20. MVP Out of Scope

The following are intentionally excluded from the first version:

- Real SMS OTP.
- Email OTP.
- Password authentication.
- Task comments.
- File attachments.
- Subtasks.
- Recurring tasks.
- Notifications.
- Email notifications.
- Push notifications.
- Kanban drag-and-drop.
- Task labels/tags.
- Advanced reporting.
- Audit log.
- Time tracking.
- Mobile application.
- Multi-organization/tenant support.

These can be considered in future versions.

---

## 21. Future Enhancements

Potential future features:

1. Real SMS OTP provider.
2. Task comments.
3. Attachments.
4. Notifications.
5. Task history/audit trail.
6. Kanban board.
7. Search and advanced filters.
8. Recurring tasks.
9. Task reminders.
10. Reporting and analytics.
11. Multiple admin levels.
12. Organization/workspace support.

---

## 22. MVP Acceptance Criteria

The MVP is considered complete when:

### Authentication

- [ ] A registered active user can sign in with their phone number and fixed OTP.
- [ ] An unknown phone number cannot sign in.
- [ ] An inactive user cannot sign in.
- [ ] An authenticated user receives the correct role in their session.
- [ ] Users are redirected to the appropriate dashboard.

### Users

- [ ] Admin can create a user.
- [ ] Admin can view users.
- [ ] Admin can edit a user.
- [ ] Admin can deactivate a user.
- [ ] Phone numbers cannot be duplicated.
- [ ] Regular users cannot manage users.

### Tasks

- [ ] Admin can create a task.
- [ ] Admin can assign a task to a user.
- [ ] Admin can edit a task.
- [ ] Admin can delete a task.
- [ ] Admin can view all tasks.
- [ ] User can view only their assigned tasks.
- [ ] User can update the status of their assigned tasks.
- [ ] User cannot modify task ownership or other protected task fields.
- [ ] Task status is persisted in Neon PostgreSQL.

### Security

- [ ] Admin routes are protected.
- [ ] User routes are protected.
- [ ] Server-side authorization prevents unauthorized task access.
- [ ] Database credentials are not exposed to the client.
- [ ] OTP secret is not exposed to the client.

### Deployment

- [ ] Application runs successfully on Vercel.
- [ ] Neon PostgreSQL is connected through `DATABASE_URL`.
- [ ] Production secrets are configured through Vercel environment variables.
- [ ] Database migrations can be run reliably.

---

## 23. Recommended Build Order

### Phase 1 — Project Setup

- Create Next.js project.
- Configure TypeScript.
- Configure Tailwind.
- Configure Drizzle.
- Connect Neon PostgreSQL.
- Set up environment variables.
- Create database schema and migrations.

### Phase 2 — Authentication

- Configure Auth.js.
- Implement fixed OTP login.
- Create session handling.
- Add role information to the session.
- Protect routes.

### Phase 3 — User Management

- Admin dashboard.
- User list.
- Create user.
- Edit user.
- Activate/deactivate user.

### Phase 4 — Task Management

- Task schema.
- Create task.
- Assign task.
- Task list.
- Task details.
- Edit/delete task.
- User task view.
- User status updates.

### Phase 5 — Authorization & Validation

- Server-side role checks.
- Task ownership checks.
- Input validation.
- Error handling.
- Empty states.
- Loading states.

### Phase 6 — Deployment

- Configure Vercel.
- Configure Neon production database.
- Configure production environment variables.
- Run migrations.
- Test authentication.
- Test role permissions.
- Test task workflows.

---

## 24. MVP Definition

The simplest successful version of the product is:

```text
ADMIN
  ↓
Create User
  ↓
Create Task
  ↓
Assign Task
  ↓
USER
  ↓
Login with Fixed OTP
  ↓
View Assigned Task
  ↓
Update Status
  ↓
ADMIN sees updated status
```

Everything else should be treated as secondary until this workflow works reliably.
