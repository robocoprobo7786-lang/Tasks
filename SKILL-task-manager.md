# Task Manager — UI / Implementation Skill

## Purpose

Use this skill when building or modifying the Task Manager UI.

The project is a small task management application with:

- Admin and User roles
- Admin-created users
- Fixed OTP authentication for the MVP
- Admin-created and assigned tasks
- User task status updates
- Next.js + TypeScript/TSX
- Tailwind CSS
- Auth.js / NextAuth
- Drizzle ORM
- Neon PostgreSQL
- Vercel deployment

The supplied Jira-inspired design system is the visual foundation. It specifies a friendly, rounded, light interface with generous whitespace, Charlie typography, and a blue primary accent. fileciteturn0file0L17-L30

---

## 1. Core UI Rules

Always prioritize:

1. Clear hierarchy
2. Task information density
3. Fast scanning
4. Consistent spacing
5. Consistent component behavior
6. Responsive behavior
7. Accessible interaction states

Use the supplied design system rather than inventing a new visual language.

### Visual defaults

```text
Background: #ffffff
Surface: #f8f8f8
Primary: #0065ff
Secondary: #fca700
Text: #292a2e
Muted: #6b778c
Info: #deebff
Danger: #ae2e24
```

The supplied design identifies these core roles and values. fileciteturn0file0L33-L46

---

## 2. Typography

Use:

```text
Headings: Charlie Display
Body: Charlie Text
```

Fallback to the supplied system font stacks when the branded fonts are unavailable.

Headings should generally use a strong weight. The source design specifies weight 800 for headings. fileciteturn0file0L23-L30

For compact product UI:

```text
Page title: 36px / 800
Section title: 24px / 500
Card title: 20–24px / 500
Body: 16px / 400
Small: 14px / 400
```

---

## 3. Spacing

Use a 10px base unit.

Preferred spacing:

```text
8px
10px
12px
16px
20px
24px
30px
40px
```

The supplied system uses 10px as its base spacing unit and provides a scale including 8px, 10px, 12px, 16px, 24px, and 32px. fileciteturn0file0L188-L203

Avoid arbitrary values unless required for alignment.

---

## 4. Component Rules

### Button

Use rounded buttons.

Primary:

```text
bg #0065ff
text #ffffff
rounded 21px or larger
```

Secondary:

```text
bg #ffffff
text #292a2e
subtle border
rounded 21px
```

Danger:

```text
danger #ae2e24
```

Do not make every button primary.

---

### Card

Use:

```text
bg #ffffff or #f8f8f8
rounded corners
20–24px padding
subtle border or low shadow
```

---

### Input

Use:

```text
bg #ffffff
text #292a2e
placeholder #6b778c
subtle border
rounded corners
blue focus state
```

Always render a visible label.

---

### Badge

Use badges for task status and priority only.

Badges should be compact and readable.

Do not use badges for arbitrary decorative purposes.

---

## 5. Application Shell

### Admin

```text
Sidebar
  Dashboard
  Tasks
  Users

Main content
```

### User

```text
Sidebar
  My Tasks

Main content
```

Navigation must be role-aware.

Do not render admin navigation for regular users.

---

## 6. Page Patterns

Every authenticated page should generally follow:

```text
Page container
  Page header
    Title
    Supporting text (optional)
    Primary action (optional)

  Filters / controls (optional)

  Main content
```

Keep page headers consistent.

---

## 7. Admin Dashboard

Build a compact dashboard with summary cards:

```text
Total Users
Active Users
Total Tasks
TODO
IN PROGRESS
COMPLETED
```

Then show useful task activity.

Do not create a marketing-style dashboard.

---

## 8. User Dashboard

The user should get to their work immediately.

Primary content:

```text
My Tasks
```

Secondary summary:

```text
TODO
IN PROGRESS
COMPLETED
```

---

## 9. Task UI

### Task list

Admin:

```text
Task | Assignee | Status | Priority | Due Date | Actions
```

User:

```text
Task | Status | Priority | Due Date
```

On mobile, convert rows into cards.

### Task detail

Display:

```text
Title
Description
Status
Priority
Due date
Assignee
Created by
Created date
Updated date
```

Actions should depend on role.

---

## 10. Authentication UI

The MVP uses a fixed OTP.

### Login screen

Step 1:

```text
Welcome back

Phone number
[________________]

[Continue]
```

Step 2:

```text
Enter verification code

We sent a code to +XX XXXXX XXXXX

[ _ ][ _ ][ _ ][ _ ][ _ ][ _ ]

[Verify]
Change phone number
```

The fixed OTP must never be displayed in the UI.

The UI should not explain that the OTP is fixed unless this is explicitly a development-only environment.

---

## 11. User Management UI

Admin-only.

### Users page

Show:

```text
Name | Phone | Role | Status | Created | Actions
```

Actions:

- Edit
- Activate
- Deactivate

### Create user

Use a simple form:

```text
Name *
Phone *
Email
Role
Active

[Create user]
```

---

## 12. Task Creation UI

Admin-only.

Use:

```text
Title *
Description
Assign to *
Status
Priority
Due date

[Create task]
```

Assignment should show active users only.

---

## 13. Authorization UX

The backend remains the source of truth.

The frontend should also provide a good UX:

- Hide actions the user cannot perform.
- Redirect unauthorized users away from protected pages.
- Show a clear unauthorized state when appropriate.
- Never rely on hidden UI for security.

A regular user must never be able to access another user's task by modifying a URL.

---

## 14. States

Every important data component should account for:

### Loading

Use simple skeletons or restrained loading indicators.

### Empty

Examples:

```text
No tasks yet
There are no tasks assigned to you.
```

```text
No users yet
Create your first user to get started.
```

### Error

Show concise, actionable error messages.

### Success

Use restrained confirmation feedback after:

- User creation
- Task creation
- Task update
- Task deletion
- Status update

---

## 15. Responsive Behavior

Follow:

```text
<640px     mobile
640–1024px tablet
1024–1440px desktop
>1440px    centered wide layout
```

On mobile:

- Collapse navigation.
- Stack forms.
- Use full-width primary actions when appropriate.
- Convert tables to cards or scrollable containers.
- Maintain 44×44px minimum touch targets.

These breakpoints and touch requirements come directly from the supplied design system. fileciteturn0file0L249-L259

---

## 16. Accessibility

Always:

- Use semantic HTML.
- Associate labels with inputs.
- Provide keyboard focus states.
- Ensure buttons have clear accessible names.
- Do not rely on color alone for task status.
- Maintain sufficient contrast.
- Provide confirmation for destructive actions.
- Keep mobile touch targets at least 44×44px.

---

## 17. Component Reuse

Prefer reusable components over page-specific duplicated markup.

Suggested structure:

```text
components/
  ui/
    button.tsx
    input.tsx
    select.tsx
    card.tsx
    dialog.tsx
    badge.tsx

  layout/
    sidebar.tsx
    header.tsx
    page-header.tsx

  tasks/
    task-table.tsx
    task-card.tsx
    task-form.tsx
    task-status.tsx
    task-priority.tsx

  users/
    user-table.tsx
    user-form.tsx
```

Exact file organization can change based on the final Next.js architecture.

---

## 18. Tailwind Rules

Prefer semantic/reusable class combinations.

Avoid scattering raw color values throughout components.

Use design tokens/theme variables for:

```text
primary
secondary
background
surface
text
muted
info
danger
```

Do not introduce a separate color palette for individual pages.

---

## 19. Do Not

Do not:

- Add marketing hero sections.
- Add pricing sections.
- Add unnecessary illustrations.
- Add Jira/Atlassian logos.
- Copy Jira branding.
- Use dark application themes.
- Use pure black body text.
- Introduce random colors.
- Create inconsistent button styles.
- Create different card styles for every page.
- Use excessive shadows.
- Hide essential task data behind tabs or dialogs.
- Add features that are not in the requirements just because they are common in task-management products.

The supplied design system explicitly advises against dark backgrounds, sharp corners, arbitrary colors, decorative additions, and invented UI patterns. fileciteturn0file0L229-L246

---

## 20. Implementation Sequence

When building a new page:

1. Establish the layout.
2. Apply background and surfaces.
3. Add typography.
4. Add spacing.
5. Add reusable components.
6. Apply primary/secondary actions.
7. Add state styling.
8. Add responsive behavior.
9. Add accessibility.
10. Verify against the product requirements.

This follows the supplied design iteration guidance: layout → colors → typography → components → radius → elevation → responsive review → final verification. fileciteturn0file0L283-L289

---

## 21. Product-Specific Priority

When design decisions conflict, prioritize in this order:

```text
1. Functional requirements
2. Security / authorization
3. Accessibility
4. Task information clarity
5. Responsive usability
6. Design system consistency
7. Decorative polish
```

The application is a productivity tool, so clarity and speed of use are more important than visual decoration.
