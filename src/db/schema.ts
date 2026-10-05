import { relations } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// PostgreSQL Enums
export const roleEnum = pgEnum('role', ['ADMIN', 'USER']);
export const taskStatusEnum = pgEnum('task_status', ['TODO', 'IN_PROGRESS', 'COMPLETED']);
export const taskPriorityEnum = pgEnum('task_priority', ['LOW', 'MEDIUM', 'HIGH']);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 255 }).unique(),
  role: roleEnum('role').default('USER').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Tasks Table
export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  status: taskStatusEnum('status').default('TODO').notNull(),
  priority: taskPriorityEnum('priority').default('MEDIUM').notNull(),
  dueDate: timestamp('due_date'),
  assignedToId: uuid('assigned_to_id')
    .notNull()
    .references(() => users.id),
  createdById: uuid('created_by_id')
    .notNull()
    .references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  assignedTasks: many(tasks, { relationName: 'assignedTasks' }),
  createdTasks: many(tasks, { relationName: 'createdTasks' }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  assignedUser: one(users, {
    fields: [tasks.assignedToId],
    references: [users.id],
    relationName: 'assignedTasks',
  }),
  creator: one(users, {
    fields: [tasks.createdById],
    references: [users.id],
    relationName: 'createdTasks',
  }),
}));

// Inferred TypeScript Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;

export type Role = (typeof roleEnum.enumValues)[number];
export type TaskStatus = (typeof taskStatusEnum.enumValues)[number];
export type TaskPriority = (typeof taskPriorityEnum.enumValues)[number];
