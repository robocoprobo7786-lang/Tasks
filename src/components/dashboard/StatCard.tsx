/**
 * src/components/dashboard/StatCard.tsx
 *
 * A compact metric card used in the summary rows at the top of both dashboards.
 * Accepts a label, numeric value, an optional icon, and an accent colour class.
 */
import React from "react";

export interface StatCardProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  /** Tailwind bg-* class for the icon container background  */
  iconBg?: string;
  /** Tailwind text-* class for the icon colour */
  iconColor?: string;
  /** Optional sub-label shown beneath the value */
  sub?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  iconBg = "bg-[#deebff]",
  iconColor = "text-[#0065ff]",
  sub,
}) => {
  return (
    <div className="bg-white border border-[#e2e8f0] rounded-2xl p-5 flex items-center gap-4 shadow-xs shadow-slate-200/50 transition-all duration-150 hover:shadow-sm hover:border-slate-300">
      {icon && (
        <div
          className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      )}
      <div className="min-w-0">
        <p className="text-2xl font-extrabold text-[#292a2e] leading-none tabular-nums">
          {value}
        </p>
        <p className="text-sm font-medium text-[#6b778c] mt-0.5 truncate">{label}</p>
        {sub && <p className="text-xs text-[#6b778c] mt-0.5">{sub}</p>}
      </div>
    </div>
  );
};
