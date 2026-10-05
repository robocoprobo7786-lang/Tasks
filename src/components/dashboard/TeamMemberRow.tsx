/**
 * src/components/dashboard/TeamMemberRow.tsx
 *
 * A single team-member row used in the admin dashboard's team section.
 */
import React from "react";
import { Badge } from "../ui/Badge";
import { getInitials } from "../../lib/format";
import type { UserSummary } from "../../lib/types";

export interface TeamMemberRowProps {
  user: UserSummary;
}

export const TeamMemberRow: React.FC<TeamMemberRowProps> = ({ user }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#e2e8f0] last:border-b-0 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {/* Avatar */}
        <div
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border ${
            user.isActive
              ? "bg-[#deebff] text-[#0065ff] border-[#0065ff]/20"
              : "bg-slate-100 text-slate-400 border-slate-200"
          }`}
        >
          {getInitials(user.name)}
        </div>

        {/* Name + phone */}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#292a2e] truncate">{user.name}</p>
          <p className="text-xs text-[#6b778c]">{user.phone}</p>
        </div>
      </div>

      {/* Role + active badges */}
      <div className="flex items-center gap-2 shrink-0">
        <Badge variant="role" role={user.role} />
        <Badge variant="active" isActive={user.isActive} />
      </div>
    </div>
  );
};
