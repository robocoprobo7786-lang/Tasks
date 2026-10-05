import React from "react";

export type TaskStatusType = "TODO" | "IN_PROGRESS" | "COMPLETED";
export type TaskPriorityType = "LOW" | "MEDIUM" | "HIGH";
export type UserRoleType = "ADMIN" | "USER";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "status" | "priority" | "role" | "active";
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
  const baseClasses =
    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors";

  let styles = "bg-[#f8f8f8] text-[#292a2e] border border-[#e2e8f0]";
  let label = children;

  if (variant === "status" && status) {
    switch (status) {
      case "TODO":
        styles = "bg-slate-100 text-slate-700 border border-slate-200";
        label = label || "To Do";
        break;
      case "IN_PROGRESS":
        styles = "bg-[#deebff] text-[#0065ff] border border-[#0065ff]/30";
        label = label || "In Progress";
        break;
      case "COMPLETED":
        styles = "bg-[#fff8e6] text-[#b37700] border border-[#fca700]/40";
        label = label || "Completed";
        break;
    }
  } else if (variant === "priority" && priority) {
    switch (priority) {
      case "LOW":
        styles = "bg-slate-100 text-slate-600 border border-slate-200";
        label = label || "Low Priority";
        break;
      case "MEDIUM":
        styles = "bg-[#deebff] text-[#0065ff] border border-[#0065ff]/20";
        label = label || "Medium Priority";
        break;
      case "HIGH":
        styles = "bg-amber-50 text-amber-700 border border-amber-200";
        label = label || "High Priority";
        break;
    }
  } else if (variant === "role" && role) {
    switch (role) {
      case "ADMIN":
        styles = "bg-purple-50 text-purple-700 border border-purple-200";
        label = label || "Admin";
        break;
      case "USER":
        styles = "bg-slate-100 text-slate-700 border border-slate-200";
        label = label || "User";
        break;
    }
  } else if (variant === "active" && typeof isActive === "boolean") {
    styles = isActive
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
      : "bg-slate-100 text-slate-500 border border-slate-200";
    label = label || (isActive ? "Active" : "Inactive");
  }

  return (
    <span className={`${baseClasses} ${styles} ${className}`} {...props}>
      <span className="w-1.5 h-1.5 rounded-full fill-current bg-current opacity-75" />
      {label}
    </span>
  );
};
