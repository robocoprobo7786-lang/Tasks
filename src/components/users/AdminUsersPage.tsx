/**
 * src/components/users/AdminUsersPage.tsx
 *
 * Full-featured admin users page with:
 * - User listing table with filters
 * - User creation (modal/form)
 * - User detail view
 * - User editing
 * - Active/Inactive toggle dialog
 */
"use client";

import React, { useState, useMemo, useCallback } from "react";
import { PageHeader } from "../ui/PageHeader";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui/EmptyState";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { UserFilters } from "./UserFilters";
import { UserTable, type UserTableItem } from "./UserTable";
import { UserForm } from "./UserForm";
import { UserDetails } from "./UserDetails";
import type { UserFiltersState, UserFormData } from "../../lib/types";

type ViewState =
  | { mode: "list" }
  | { mode: "create" }
  | { mode: "detail"; userId: string }
  | { mode: "edit"; userId: string };

export interface AdminUsersPageProps {
  users: UserTableItem[];
}

const defaultFilters: UserFiltersState = {
  search: "",
  role: "ALL",
  status: "ALL",
};

export const AdminUsersPage: React.FC<AdminUsersPageProps> = ({ users }) => {
  const [view, setView] = useState<ViewState>({ mode: "list" });
  const [filters, setFilters] = useState<UserFiltersState>(defaultFilters);
  const [toggleTarget, setToggleTarget] = useState<{ id: string; currentStatus: boolean } | null>(null);

  // Local state for demonstration of optimistic updates
  const [localUsers, setLocalUsers] = useState<UserTableItem[]>(users);

  // ─── Filter users ────────────────────────────────────────────────────────
  const filteredUsers = useMemo(() => {
    let result = [...localUsers];

    // Text search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.phone.includes(q) ||
          (u.email && u.email.toLowerCase().includes(q))
      );
    }

    // Role filter
    if (filters.role !== "ALL") {
      result = result.filter((u) => u.role === filters.role);
    }

    // Status filter
    if (filters.status !== "ALL") {
      const isActive = filters.status === "ACTIVE";
      result = result.filter((u) => u.isActive === isActive);
    }

    // Sort by name
    result.sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [localUsers, filters]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleCreateSubmit = useCallback((data: UserFormData) => {
    // FUTURE: call server action / API
    const newUser: UserTableItem = {
      id: `u-${Date.now()}`,
      name: data.name,
      phone: data.phone,
      email: data.email || undefined,
      role: data.role,
      isActive: data.isActive,
      createdAt: new Date(),
    };
    setLocalUsers((prev) => [...prev, newUser]);
    setView({ mode: "list" });
  }, []);

  const handleEditSubmit = useCallback(
    (data: UserFormData) => {
      // FUTURE: call server action / API
      if (view.mode === "edit") {
        const updateInfo = {
          name: data.name,
          phone: data.phone,
          email: data.email || undefined,
          role: data.role,
          isActive: data.isActive,
        };
        setLocalUsers((prev) =>
          prev.map((u) => (u.id === view.userId ? { ...u, ...updateInfo } : u))
        );
        setView({ mode: "detail", userId: view.userId });
      } else {
        setView({ mode: "list" });
      }
    },
    [view]
  );

  const handleToggleConfirm = useCallback(() => {
    if (!toggleTarget) return;
    // FUTURE: call server action / API
    setLocalUsers((prev) =>
      prev.map((u) =>
        u.id === toggleTarget.id ? { ...u, isActive: !toggleTarget.currentStatus } : u
      )
    );
    setToggleTarget(null);
  }, [toggleTarget]);

  const getUser = useCallback(
    (id: string) => localUsers.find((u) => u.id === id),
    [localUsers]
  );

  const getEditFormData = useCallback(
    (id: string): Partial<UserFormData> | undefined => {
      const user = getUser(id);
      if (!user) return undefined;
      return {
        name: user.name,
        phone: user.phone,
        email: user.email || "",
        role: user.role,
        isActive: user.isActive,
      };
    },
    [getUser]
  );

  // ─── Detail view ───────────────────────────────────────────────────────────
  if (view.mode === "detail") {
    const detail = getUser(view.userId);
    if (!detail) {
      return (
        <EmptyState
          title="User not found"
          description="The user you're looking for doesn't exist."
          action={
            <Button variant="primary" onClick={() => setView({ mode: "list" })}>
              Back to users
            </Button>
          }
        />
      );
    }
    return (
      <UserDetails
        user={detail}
        onBack={() => setView({ mode: "list" })}
        onEdit={() => setView({ mode: "edit", userId: view.userId })}
        onToggleActive={(id, status) => setToggleTarget({ id, currentStatus: status })}
      />
    );
  }

  // ─── Create view ───────────────────────────────────────────────────────────
  if (view.mode === "create") {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Create User"
          description="Add a new team member."
          breadcrumbs={[
            { label: "Admin" },
            { label: "Users", href: "#" },
            { label: "Create" },
          ]}
        />
        <Card className="max-w-3xl">
          <CardContent>
            <UserForm
              onSubmit={handleCreateSubmit}
              onCancel={() => setView({ mode: "list" })}
              submitLabel="Create User"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── Edit view ─────────────────────────────────────────────────────────────
  if (view.mode === "edit") {
    const formData = getEditFormData(view.userId);
    const detail = getUser(view.userId);
    return (
      <div className="space-y-6">
        <PageHeader
          title="Edit User"
          description={`Editing: ${detail?.name ?? "Unknown"}`}
          breadcrumbs={[
            { label: "Admin" },
            { label: "Users", href: "#" },
            { label: "Edit" },
          ]}
        />
        <Card className="max-w-3xl">
          <CardContent>
            <UserForm
              initialData={formData}
              onSubmit={handleEditSubmit}
              onCancel={() => setView({ mode: "detail", userId: view.userId })}
              submitLabel="Save Changes"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  // ─── List view (default) ───────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <PageHeader
        title="Users"
        description="Manage team members, roles, and account access."
        breadcrumbs={[{ label: "Admin" }, { label: "Users" }]}
        actions={
          <Button
            variant="primary"
            onClick={() => setView({ mode: "create" })}
            icon={<i className="fa-solid fa-user-plus"></i>}
          >
            Create User
          </Button>
        }
      />

      <UserFilters filters={filters} onFiltersChange={setFilters} />

      <div className="flex items-center justify-between font-pixel-sub text-xs text-gray-400 mb-2">
        <p>
          Showing <span className="text-white font-bold">{filteredUsers.length}</span> of {localUsers.length} users
        </p>
      </div>

      {filteredUsers.length === 0 ? (
        <EmptyState
          title={filters.search || filters.role !== "ALL" || filters.status !== "ALL"
            ? "No users match your filters"
            : "No users yet"}
          description={
            filters.search || filters.role !== "ALL" || filters.status !== "ALL"
              ? "Try adjusting your search or filter criteria."
              : "Add your first user to get started."
          }
          action={
            filters.search || filters.role !== "ALL" || filters.status !== "ALL" ? (
              <Button variant="secondary" size="sm" onClick={() => setFilters(defaultFilters)}>
                Clear all filters
              </Button>
            ) : (
              <Button variant="primary" size="sm" onClick={() => setView({ mode: "create" })}>
                Create User
              </Button>
            )
          }
        />
      ) : (
        <Card>
          <CardContent>
            <UserTable
              users={filteredUsers}
              onUserClick={(id) => setView({ mode: "detail", userId: id })}
              onUserEdit={(id) => setView({ mode: "edit", userId: id })}
              onUserToggleActive={(id, status) => setToggleTarget({ id, currentStatus: status })}
            />
          </CardContent>
        </Card>
      )}

      {/* Toggle Active Confirmation */}
      <ConfirmDialog
        isOpen={toggleTarget !== null}
        title={toggleTarget?.currentStatus ? "Deactivate User" : "Activate User"}
        description={
          toggleTarget?.currentStatus
            ? "Are you sure you want to deactivate this user? They will no longer be able to log in or be assigned new tasks. Existing assigned tasks will remain."
            : "Are you sure you want to activate this user? They will regain access to the platform."
        }
        confirmLabel={toggleTarget?.currentStatus ? "Deactivate" : "Activate"}
        variant={toggleTarget?.currentStatus ? "danger" : "primary"}
        onConfirm={handleToggleConfirm}
        onCancel={() => setToggleTarget(null)}
      />
    </div>
  );
};
