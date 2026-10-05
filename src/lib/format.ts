/**
 * src/lib/format.ts
 *
 * Shared formatting utilities used across dashboard and task components.
 */

/**
 * Format a Date as a human-readable relative due-date label.
 * Includes urgency cues so the UI can colour-code the text.
 */
export function formatDueDate(date: Date | null): {
  label: string;
  isOverdue: boolean;
  isDueSoon: boolean;
} {
  if (!date) {
    return { label: "No due date", isOverdue: false, isDueSoon: false };
  }

  const now = Date.now();
  const diff = date.getTime() - now;
  const dayMs = 24 * 60 * 60 * 1000;

  if (diff < 0) {
    const days = Math.ceil(Math.abs(diff) / dayMs);
    return {
      label: days === 1 ? "Overdue by 1 day" : `Overdue by ${days} days`,
      isOverdue: true,
      isDueSoon: false,
    };
  }

  const days = Math.ceil(diff / dayMs);

  if (days === 0)
    return { label: "Due today", isOverdue: false, isDueSoon: true };
  if (days === 1)
    return { label: "Due tomorrow", isOverdue: false, isDueSoon: true };
  if (days <= 3)
    return {
      label: `Due in ${days} days`,
      isOverdue: false,
      isDueSoon: true,
    };

  return {
    label: date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    isOverdue: false,
    isDueSoon: false,
  };
}

/** Get user initials (up to 2 chars) from a display name */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
