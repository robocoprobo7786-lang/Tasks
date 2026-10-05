/**
 * src/components/users/UserDetails.tsx
 *
 * Full detail view for a single user, showing info, status, and related tasks snippet.
 */
"use client";

import React from "react";
import { Card, CardContent } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { getInitials } from "../../lib/format";
import type { UserTableItem } from "./UserTable";

export interface UserDetailsProps {
  user: UserTableItem;
  onEdit?: () => void;
  onToggleActive?: (id: string, currentStatus: boolean) => void;
  onBack?: () => void;
}

export const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  onEdit,
  onToggleActive,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm text-[#6b778c] hover:text-[#0065ff] transition-colors cursor-pointer bg-transparent border-none p-0 min-h-[44px]"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to users
        </button>
      )}

      {/* Header Profile Card */}
      <Card className={!user.isActive ? "opacity-90" : ""}>
        <CardContent className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 p-2">
          <div className="flex items-center sm:items-start gap-5">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold border-4 ${
                user.isActive
                  ? "bg-[#deebff] text-[#0065ff] border-white shadow-sm shadow-[#0065ff]/20"
                  : "bg-slate-100 text-slate-400 border-white shadow-sm shadow-slate-200"
              }`}
            >
              {getInitials(user.name)}
            </div>
            
            <div className="flex flex-col gap-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#292a2e] tracking-tight break-words">
                {user.name}
              </h1>
              <div className="flex items-center gap-3 flex-wrap mt-1">
                <Badge variant="role" role={user.role} />
                <Badge variant="active" isActive={user.isActive} />
                {!user.isActive && (
                  <span className="text-xs font-semibold text-[#ae2e24] bg-[#ffebe6] px-2 py-0.5 rounded-full">
                    Account Disabled
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onToggleActive && (
              <Button
                variant={user.isActive ? "secondary" : "primary"}
                size="sm"
                onClick={() => onToggleActive(user.id, user.isActive)}
                icon={
                  user.isActive ? (
                    <svg className="w-4 h-4 text-[#ae2e24]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              >
                {user.isActive ? "Deactivate" : "Activate"}
              </Button>
            )}
            {onEdit && (
              <Button variant="secondary" size="sm" onClick={onEdit}>
                Edit User
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="space-y-4">
              <h2 className="text-sm font-bold text-[#292a2e] uppercase tracking-wider mb-2">
                Contact Information
              </h2>
              
              <div className="space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#6b778c]">Phone</span>
                  <a href={`tel:${user.phone}`} className="text-sm text-[#0065ff] hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-[#0065ff]/40 rounded-sm inline-block w-fit">
                    {user.phone}
                  </a>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-[#6b778c]">Email</span>
                  {user.email ? (
                    <a href={`mailto:${user.email}`} className="text-sm text-[#0065ff] hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-[#0065ff]/40 rounded-sm inline-block w-fit truncate max-w-full">
                      {user.email}
                    </a>
                  ) : (
                    <span className="text-sm text-[#292a2e] italic">Not provided</span>
                  )}
                </div>

                <div className="border-t border-[#e2e8f0] pt-3 mt-1">
                  <span className="text-xs font-semibold text-[#6b778c] block mb-1">Joined Date</span>
                  <span className="text-sm text-[#292a2e]">
                    {user.createdAt ? user.createdAt.toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    }) : "Unknown"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder for future tasks/activity panel */}
        <div className="lg:col-span-2">
          <Card className="h-full bg-[#f8f8f8] border-dashed border-[#e2e8f0]">
            <CardContent className="flex flex-col items-center justify-center h-full text-center py-12">
               <div className="w-12 h-12 rounded-full bg-[#deebff] text-[#0065ff] flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
              </div>
              <h3 className="text-lg font-bold text-[#292a2e] mb-1">User Activity</h3>
              <p className="text-sm text-[#6b778c] max-w-md">
                Recent tasks and activity history for {user.name.split(" ")[0]} will appear here when connected to the backend.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
