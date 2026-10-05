# Task Manager — Design System

## 1. Product Design Direction

This task manager uses a Jira-inspired visual language adapted for a focused internal productivity application.

The interface should feel:

- Friendly
- Approachable
- Lightweight
- Professional
- Task-oriented
- Spacious without wasting screen space

Avoid copying Jira-specific product UI or branding. Use the supplied design system as the visual foundation for our own task manager.

Primary UI surfaces:

- Login / OTP screen
- Admin dashboard
- User dashboard
- User management
- Task list
- Task detail
- Create/edit task forms
- Create/edit user forms
- Navigation and dialogs

The design system specifies a light/white canvas, rounded elements, generous whitespace, bold typography, and a blue primary accent. fileciteturn0file1L5-L18

---

## 2. Color System

Use the supplied palette as the default product palette.

### Core colors

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#ffffff` | Main page background |
| `--color-bg-secondary` | `#f8f8f8` | Cards, panels, secondary surfaces |
| `--color-primary` | `#0065ff` | Primary actions, links, active navigation |
| `--color-secondary` | `#fca700` | Secondary/highlight actions |
| `--color-text` | `#292a2e` | Primary text |
| `--color-text-secondary` | `#6b778c` | Muted text, metadata |
| `--color-border` | `#f8f8f8` | Dividers and subtle borders |
| `--color-info` | `#deebff` | Informational backgrounds |
| `--color-danger` | `#ae2e24` | Destructive/error states |

The source design identifies `#0065ff` as the dominant accent, `#fca700` as a secondary accent, `#ffffff` as the primary canvas, and `#f8f8f8` as a secondary surface. fileciteturn0file1L21-L34

### Status colors

Task statuses should be visually distinct while staying within the supplied palette.

Recommended treatment:

- **TODO:** neutral `#6b778c`
- **IN_PROGRESS:** primary blue `#0065ff`
- **COMPLETED:** secondary/highlight `#fca700`
- **BLOCKED (future):** danger `#ae2e24`

Do not rely on color alone. Status should always include readable text.

### Priority

- **LOW:** neutral
- **MEDIUM:** blue
- **HIGH:** amber
- Future urgent/error states may use the supplied red.

---

## 3. Typography

Use the supplied typography hierarchy.

### Fonts

- Headings: `Charlie Display`, with the supplied system fallback.
- Body: `Charlie Text`, with the supplied system fallback.

The source specifies Charlie Display for headings and Charlie Text for running text. fileciteturn0file1L54-L67

### Product hierarchy

| Role | Size | Weight | Usage |
|---|---:|---:|---|
| Page title | 36px | 800 | Dashboard/page heading |
| Section heading | 24px | 500 | Major sections |
| Card heading | 20–24px | 500 | Cards/task groups |
| Body | 16px | 400 | Main content |
| Small | 14px | 400 | Metadata/forms |
| Caption | ~14px | 400 | Supporting information |

The source type scale ranges from 44px display headings through 14px captions; for this compact application, use the lower part of that scale for most product UI. fileciteturn0file1L69-L82

---

## 4. Layout

### Spacing

Use a 10px base spacing unit.

Preferred values:

- 8px — tight inline spacing
- 10px — compact spacing
- 12px — control spacing
- 16px — standard spacing
- 20px — section spacing
- 24px — card padding
- 30px — larger section spacing
- 40px — page-level spacing

The supplied system identifies 10px as the base unit and includes 8px, 10px, 12px, 16px, 24px, and 32px spacing values. fileciteturn0file1L176-L191

### Desktop

Use a persistent application layout:

```text
┌─────────────────────────────────────────────────────────┐
│ Top bar / product header                                │
├──────────────┬──────────────────────────────────────────┤
│              │                                          │
│ Navigation   │ Main content                             │
│              │                                          │
│ Dashboard    │ Page title                               │
│ Tasks        │ Filters / actions                        │
│ Users*       │                                          │
│              │ Content                                  │
│              │                                          │
└──────────────┴──────────────────────────────────────────┘

* Admin only
```

The navigation should be compact and functional rather than decorative.

### Mobile

On screens below 640px:

- Single-column content
- Navigation collapses
- Forms stack vertically
- Tables become cards or horizontally scrollable where necessary
- Maintain touch targets of at least 44×44px

The supplied responsive rules define mobile below 640px, tablet at 640–1024px, desktop at 1024–1440px, and wide layouts above 1440px. fileciteturn0file1L237-L246

---

## 5. Navigation

### Admin navigation

```text
Dashboard
Tasks
Users
```

### User navigation

```text
My Tasks
```

Include the current user's name/role and a logout action in the account area.

Active navigation should use the primary blue accent.

Do not introduce decorative navigation patterns that are not needed for the product.

---

## 6. Buttons

The supplied design uses rounded buttons, including a primary amber button and blue accent treatments. fileciteturn0file1L84-L101

For this task manager, standardize the product buttons as follows:

### Primary action

Use primary blue for the most important product action.

```text
background: #0065ff
color: #ffffff
border-radius: 21px+
padding: 10px 20px
font-size: 14–16px
font-weight: 500
```

Examples:

- Create task
- Create user
- Save changes
- Sign in

### Secondary action

```text
background: #ffffff
color: #292a2e
border: 1px solid rgba(11, 18, 14, 0.14)
border-radius: 21px
padding: 8px 12px
```

Examples:

- Cancel
- Edit
- Filter

### Destructive action

Use the supplied danger color sparingly.

Examples:

- Delete task
- Deactivate user

Destructive actions should require confirmation when irreversible.

### OTP action

The login screen should have:

- Phone number input
- Send/continue action
- OTP input
- Verify action
- Back/change-number action

Keep the flow visually simple.

---

## 7. Cards

Cards should use:

- `#ffffff` or `#f8f8f8` surface
- Rounded corners
- 20–24px internal padding
- Subtle borders or low elevation
- Clear heading/content separation

Do not overuse shadows.

The supplied design identifies low elevation for cards and stronger elevation for dropdowns/popovers. fileciteturn0file1L204-L212

---

## 8. Task List Design

The task list is the primary product surface.

Each task row/card should display:

```text
Task title
Short description / metadata
Status
Priority
Due date
Assigned user (admin view)
```

### Desktop task table

Preferred columns:

```text
Task | Assignee | Status | Priority | Due date | Actions
```

### User task list

Preferred columns:

```text
Task | Status | Priority | Due date
```

Keep task rows compact and scannable.

Clicking a task opens its detail view.

---

## 9. Task Detail

Task detail should prioritize the work itself.

Suggested layout:

```text
Task title                         [Status]

Description

Priority     Due date     Assignee

Created by   Created      Updated

-----------------------------------

Status
[ TODO ] [ IN PROGRESS ] [ COMPLETED ]

Admin:
[ Edit ] [ Delete ]

User:
[ Update status ]
```

Avoid unnecessary decorative elements.

---

## 10. Dashboard

### Admin dashboard

Show compact summary cards:

```text
Total Users
Active Users
Total Tasks
To Do
In Progress
Completed
```

Below the metrics, show useful task information such as:

- Recent tasks
- Tasks due soon
- Recently completed tasks

### User dashboard

Show:

```text
My Tasks
To Do
In Progress
Completed
```

The user's task list should be the primary content.

---

## 11. Forms

Forms should be simple and consistent.

### Inputs

Use:

- White background
- Primary text `#292a2e`
- Secondary placeholder `#6b778c`
- Subtle border
- Rounded corners
- Clear focus state using `#0065ff`

Labels should always be visible.

Do not rely on placeholder text as the only label.

### Task form

Fields:

```text
Title *
Description
Assigned user *
Status
Priority
Due date
```

### User form

Fields:

```text
Name *
Phone number *
Email
Role
Active
```

---

## 12. Tables

Desktop tables should:

- Have clear column headings
- Use compact rows
- Use subtle separators
- Avoid heavy borders
- Provide enough whitespace for scanning

On mobile, convert tables into stacked cards where practical.

---

## 13. Dialogs and Popovers

Use dialogs for:

- Delete task confirmation
- Deactivate user confirmation
- Other destructive actions

Use popovers/dropdowns for:

- Filters
- Status selection
- Priority selection
- User selection

The supplied design uses stronger elevation for dropdowns and popovers. fileciteturn0file1L204-L212

---

## 14. Shadows

Use the supplied elevation system rather than arbitrary Tailwind shadows.

Low elevation can be used for cards.

Mid elevation can be used for:

- Dropdowns
- Popovers
- Dialogs

The supplied shadows include `rgba(0, 0, 0, 0.25) 0px 2px 10px 0px` and other extracted mid/low elevation values. fileciteturn0file1L204-L212

---

## 15. Responsive Rules

| Breakpoint | Behavior |
|---|---|
| `<640px` | Single column, collapsed navigation, stacked forms |
| `640–1024px` | Compact two-column layouts where useful |
| `1024–1440px` | Full application layout |
| `>1440px` | Centered max-width content |

Minimum mobile touch target:

```text
44 × 44px
```

The source design explicitly specifies this touch-target minimum. fileciteturn0file1L239-L246

---

## 16. Design Don'ts

- Do not use dark/black application backgrounds.
- Do not use pure black `#000000` for normal text.
- Do not introduce unrelated colors without a clear state/semantic reason.
- Do not use excessive rounded/pill elements everywhere.
- Do not make every card heavily elevated.
- Do not add decorative hero sections, pricing sections, ribbons, or marketing UI.
- Do not use Jira logos or Atlassian branding.
- Do not reproduce Jira screens; use the design language for our own product.
- Do not sacrifice information density just to create whitespace.
- Do not hide important task information behind unnecessary interactions.

The supplied design specifically recommends a light theme, rounded elements, the defined palette, consistent spacing, and avoiding invented decorative UI. fileciteturn0file1L217-L234

---

## 17. Tailwind Implementation Guidance

Define product tokens so components do not repeatedly hard-code colors.

Example conceptual tokens:

```text
primary      #0065ff
secondary    #fca700
background   #ffffff
surface      #f8f8f8
text         #292a2e
muted        #6b778c
info         #deebff
danger       #ae2e24
```

Prefer reusable components:

```text
Button
Input
Select
Card
Badge
Dialog
Table
TaskRow
StatusBadge
PriorityBadge
PageHeader
Sidebar
EmptyState
```

---

## 18. Final Design Principle

The application should feel like a small, polished productivity tool:

**clear → friendly → fast → task-focused**

The Jira-inspired source provides the visual language; our product requirements determine the actual UI.
