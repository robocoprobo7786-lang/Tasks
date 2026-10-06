/**
 * src/components/tasks/TaskForm.tsx
 *
 * Reusable task creation / edit form. Renders labelled fields with
 * validation-ready structure. Does NOT perform real mutations — just
 * calls onSubmit with form data.
 *
 * Used by both the task creation and task edit UIs.
 */
"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import type { TaskFormData, UserSummary } from "../../lib/types";

export interface TaskFormProps {
  /** Pre-filled form data for editing. Omit for creation. */
  initialData?: Partial<TaskFormData>;
  /** Available users to assign the task to */
  assignableUsers: UserSummary[];
  /** Called with the form data on submit */
  onSubmit: (data: TaskFormData) => void;
  /** Called when user cancels */
  onCancel: () => void;
  /** Label for the submit button */
  submitLabel?: string;
  /** Whether the form is currently submitting */
  isSubmitting?: boolean;
}

const statusOptions = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

const priorityOptions = [
  { value: "LOW", label: "↓ Low" },
  { value: "MEDIUM", label: "→ Medium" },
  { value: "HIGH", label: "↑ High" },
];

const emptyFormData: TaskFormData = {
  title: "",
  description: "",
  assignedToId: "",
  priority: "MEDIUM",
  status: "TODO",
  dueDate: "",
};

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  assignableUsers,
  onSubmit,
  onCancel,
  submitLabel = "Create Task",
  isSubmitting = false,
}) => {
  const defaultAssigneeId = initialData?.assignedToId || (assignableUsers.length > 0 ? assignableUsers[0].id : "");

  const [formData, setFormData] = useState<TaskFormData>({
    ...emptyFormData,
    assignedToId: defaultAssigneeId,
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof TaskFormData, string>>>({});

  const assigneeOptions = [
    ...(assignableUsers.length === 0 ? [{ value: "", label: "No users available" }] : []),
    ...assignableUsers.map((u) => ({ value: u.id, label: u.name })),
  ];

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof TaskFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.trim().length < 2) {
      newErrors.title = "Title must be at least 2 characters";
    }

    if (!formData.assignedToId && assignableUsers.length > 0) {
      newErrors.assignedToId = "Please select an assignee";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const updateField = <K extends keyof TaskFormData>(
    field: K,
    value: TaskFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <Input
        label="Title"
        placeholder="Enter task title…"
        value={formData.title}
        onChange={(e) => updateField("title", e.target.value)}
        error={errors.title}
        required
      />

      {/* Description */}
      <div className="w-full flex flex-col gap-1.5">
        <label
          htmlFor="task-description"
          className="font-pixel-sub text-sm text-gray-400"
        >
          Description
        </label>
        <textarea
          id="task-description"
          placeholder="Add a detailed description…"
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          rows={4}
          className="w-full bg-gray-900 text-white placeholder:text-gray-500 border-2 border-gray-500 font-pixel-sub text-sm transition-all duration-150 py-2.5 px-3.5 focus:outline-none focus:border-green-400 focus:shadow-[4px_4px_0_#000] resize-y min-h-[100px]"
        />
      </div>

      {/* Assignee + Priority row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Assignee"
          options={assigneeOptions}
          value={formData.assignedToId}
          onChange={(e) => updateField("assignedToId", e.target.value)}
          error={errors.assignedToId}
        />
        <Select
          label="Priority"
          options={priorityOptions}
          value={formData.priority}
          onChange={(e) =>
            updateField("priority", e.target.value as TaskFormData["priority"])
          }
        />
      </div>

      {/* Due Date + Status row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => updateField("dueDate", e.target.value)}
          helperText="Optional — leave blank if no deadline"
        />
        <Select
          label="Status"
          options={statusOptions}
          value={formData.status}
          onChange={(e) =>
            updateField("status", e.target.value as TaskFormData["status"])
          }
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          icon={<i className="fa-solid fa-check"></i>}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
