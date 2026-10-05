import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { tasks, users } from "./schema";

async function seed() {
  const { db } = await import("./index");

  console.log("Seed started...");

  // 1. Insert users first and return the inserted records (including generated UUIDs)
  console.log("Inserting users...");
  const insertedUsers = await db
    .insert(users)
    .values([
      {
        name: "Admin User",
        phone: "9000000001",
        role: "ADMIN",
        isActive: true,
      },
      {
        name: "Alice Johnson",
        phone: "9000000002",
        role: "USER",
        isActive: true,
      },
      {
        name: "Bob Smith",
        phone: "9000000003",
        role: "USER",
        isActive: true,
      },
      {
        name: "Charlie Davis",
        phone: "9000000004",
        role: "USER",
        isActive: true,
      },
      {
        name: "Diana Wilson",
        phone: "9000000005",
        role: "USER",
        isActive: true,
      },
      {
        name: "Evan Thomas",
        phone: "9000000006",
        role: "USER",
        isActive: false,
      },
    ])
    .returning();

  console.log(`Users inserted: ${insertedUsers.length} users created.`);

  // Retrieve user references to dynamically use their generated UUIDs
  const admin = insertedUsers.find((u) => u.phone === "9000000001")!;
  const alice = insertedUsers.find((u) => u.phone === "9000000002")!;
  const bob = insertedUsers.find((u) => u.phone === "9000000003")!;
  const charlie = insertedUsers.find((u) => u.phone === "9000000004")!;
  const diana = insertedUsers.find((u) => u.phone === "9000000005")!;

  // 2. Insert tasks referencing the dynamically returned UUIDs
  console.log("Inserting tasks...");
  const insertedTasks = await db
    .insert(tasks)
    .values([
      {
        title: "Set up project repository",
        description: "Initialize Git repository, configure branching model, and setup base Next.js project structure.",
        assignedToId: alice.id,
        createdById: admin.id,
        status: "TODO",
        priority: "HIGH",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // With due date
      },
      {
        title: "Design login screen",
        description: "Create wireframes and Tailwind CSS styles for the phone number and OTP authentication screen.",
        assignedToId: alice.id,
        createdById: admin.id,
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // With due date
      },
      {
        title: "Create dashboard layout",
        description: "Develop modern, responsive layout shell with header navigation and quick action controls.",
        assignedToId: bob.id,
        createdById: admin.id,
        status: "TODO",
        priority: "HIGH",
        dueDate: null, // Without due date
      },
      {
        title: "Implement task creation form",
        description: "Build form component for admins to input task details, assign team members, and select priorities.",
        assignedToId: bob.id,
        createdById: admin.id,
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // With due date
      },
      {
        title: "Review product requirements",
        description: "Audit project scope and MVP deliverables against functional specification document.",
        assignedToId: charlie.id,
        createdById: admin.id,
        status: "COMPLETED",
        priority: "LOW",
        dueDate: null, // Without due date
      },
      {
        title: "Configure database connection",
        description: "Verify Neon PostgreSQL credentials and ensure Drizzle ORM client connects reliably.",
        assignedToId: charlie.id,
        createdById: admin.id,
        status: "COMPLETED",
        priority: "HIGH",
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // With due date
      },
      {
        title: "Build user management page",
        description: "Admin view to list active/inactive accounts and create new team members.",
        assignedToId: diana.id,
        createdById: admin.id,
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // With due date
      },
      {
        title: "Add task filtering",
        description: "Implement status and priority filter buttons on the task list view.",
        assignedToId: diana.id,
        createdById: admin.id,
        status: "IN_PROGRESS",
        priority: "LOW",
        dueDate: null, // Without due date
      },
      {
        title: "Implement task status updates",
        description: "Allow assigned users to quickly toggle task progress states between TODO, IN_PROGRESS, and COMPLETED.",
        assignedToId: alice.id,
        createdById: admin.id,
        status: "TODO",
        priority: "HIGH",
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // With due date
      },
      {
        title: "Test responsive mobile layout",
        description: "Verify UI responsiveness across mobile, tablet, and desktop breakpoints.",
        assignedToId: charlie.id,
        createdById: admin.id,
        status: "IN_PROGRESS",
        priority: "MEDIUM",
        dueDate: null, // Without due date
      },
      {
        title: "Prepare deployment configuration",
        description: "Configure Vercel environment variables, build scripts, and production database pooling.",
        assignedToId: bob.id,
        createdById: admin.id,
        status: "TODO",
        priority: "MEDIUM",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // With due date
      },
      {
        title: "Review application accessibility",
        description: "Ensure keyboard navigation, focus states, and color contrast meet accessibility standards.",
        assignedToId: diana.id,
        createdById: admin.id,
        status: "COMPLETED",
        priority: "LOW",
        dueDate: null, // Without due date
      },
    ])
    .returning();

  console.log(`Tasks inserted: ${insertedTasks.length} tasks created.`);
  console.log("Seed completed.");
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  });
