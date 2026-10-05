/**
 * src/components/users/UserForm.tsx
 *
 * User creation and edit form.
 */
"use client";

import React, { useState } from "react";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import type { UserFormData } from "../../lib/types";

export interface UserFormProps {
  initialData?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

const roleOptions = [
  { value: "USER", label: "User" },
  { value: "ADMIN", label: "Admin" },
];

const activeOptions = [
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

const emptyFormData: UserFormData = {
  name: "",
  phone: "",
  email: "",
  role: "USER",
  isActive: true,
};

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  submitLabel = "Save User",
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<UserFormData>({
    ...emptyFormData,
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
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

  const updateField = <K extends keyof UserFormData>(
    field: K,
    value: UserFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Full Name"
        placeholder="e.g. Jane Doe"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Phone Number"
          placeholder="e.g. 9000000000"
          value={formData.phone}
          onChange={(e) => updateField("phone", e.target.value)}
          error={errors.phone}
          required
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="e.g. jane@example.com"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={errors.email}
          helperText="Optional"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Role"
          options={roleOptions}
          value={formData.role}
          onChange={(e) => updateField("role", e.target.value as UserFormData["role"])}
        />
        <Select
          label="Account Status"
          options={activeOptions}
          value={formData.isActive.toString()}
          onChange={(e) => updateField("isActive", e.target.value === "true")}
        />
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e2e8f0]">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          icon={
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          }
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
