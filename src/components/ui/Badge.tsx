import React from "react";

export type TaskStatusType = "TODO" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriorityType = "LOW" | "MEDIUM" | "HIGH";
export type UserRoleType = "ADMIN" | "USER";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "status" | "priority" | "role" | "active" | "mvp";
  status?: TaskStatusType;
  priority?: TaskPriorityType;
  role?: UserRoleType;
  isActive?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  status,
  priority,
  role,
  isActive,
  className = "",
  ...props
}) => {
  const baseClasses = "pixel-badge";
  let styles = "";
  let dotColor = "bg-current";
  let label = children;
  let pulse = false;

  if (variant === "status" && status) {
    switch (status) {
      case "TODO":
        styles = "badge-todo";
        label = label || "To Do";
        break;
      case "IN_PROGRESS":
        styles = "badge-in-progress";
        label = label || "In Progress";
        break;
      case "COMPLETED":
        styles = "badge-completed";
        label = label || "Completed";
        break;
    }
  } else if (variant === "priority" && priority) {
    switch (priority) {
      case "LOW":
        styles = "badge-low";
        label = label || "Low Priority";
        break;
      case "MEDIUM":
        styles = "badge-medium";
        label = label || "Medium Priority";
        break;
      case "HIGH":
        styles = "badge-high";
        label = label || "High Priority";
        break;
    }
  } else if (variant === "role" && role) {
    switch (role) {
      case "ADMIN":
        styles = "badge-admin";
        dotColor = "bg-blue-400";
        label = label || "Admin";
        pulse = true;
        break;
      case "USER":
        styles = "badge-user";
        dotColor = "bg-emerald-400";
        label = label || "User";
        pulse = true;
        break;
    }
  } else if (variant === "active" && typeof isActive === "boolean") {
    styles = isActive ? "badge-active" : "bg-gray-800 text-gray-400 border-gray-600";
    dotColor = isActive ? "bg-green-400" : "bg-gray-500";
    pulse = isActive;
    label = label || (isActive ? "Active" : "Inactive");
  } else if (variant === "mvp") {
    styles = "badge-mvp";
    label = label || "MVP";
  }

  return (
    <span className={`${baseClasses} ${styles} ${className}`} {...props}>
      {variant !== "mvp" && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor} ${pulse ? 'dot-pulse' : ''}`} />
      )}
      {label}
    </span>
  );
};
