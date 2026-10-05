# Task Manager Project Files

## Source Design

The project UI is based on the supplied Jira-inspired design system.

- `DESIGN-task-manager.md` — project-specific visual/design specification.
- `SKILL-task-manager.md` — project-specific UI implementation/agent guidance.
- `requirements.md` — functional and technical product requirements.

## Project Stack

Next.js + TypeScript/TSX + Tailwind CSS + Auth.js/NextAuth + Drizzle ORM + Neon PostgreSQL + Vercel.

## Authentication

The MVP uses a configurable fixed OTP. No production SMS OTP provider is required.

## Roles

- Admin: manages users and all tasks.
- User: views assigned tasks and updates task status.
