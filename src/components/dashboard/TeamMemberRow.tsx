import React from "react";
import { Badge } from "../ui/Badge";
import { getInitials } from "../../lib/format";
import type { UserSummary } from "../../lib/types";

export interface TeamMemberRowProps {
  user: UserSummary;
}

export const TeamMemberRow: React.FC<TeamMemberRowProps> = ({ user }) => {
  return (
    <div className="pixel-card-sub p-3 flex items-center justify-between gap-2 mb-3">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 ${user.role === 'ADMIN' ? 'bg-blue-600' : 'bg-emerald-600'} border-2 border-black flex items-center justify-center font-pixel-title text-[10px] text-white shadow-[1px_1px_0_#000]`}>
          {getInitials(user.name)}
        </div>
        <div>
          <div className="font-pixel-sub text-base text-white font-bold">{user.name}</div>
          <div className="font-pixel-sub text-xs text-gray-400 font-mono">{user.phone || user.id}</div>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Badge variant="role" role={user.role} />
        <Badge variant="active" isActive={user.isActive} />
      </div>
    </div>
  );
};
