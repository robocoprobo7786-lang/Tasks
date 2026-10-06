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
  iconBg = "bg-gray-800",
  iconColor = "text-gray-300",
  sub,
}) => {
  return (
    <div className="pixel-card p-4 flex items-center space-x-4 hover:border-green-400 transition-all cursor-pointer">
      {icon && (
        <div
          className={`w-12 h-12 border-2 border-gray-500 flex items-center justify-center text-lg shadow-[2px_2px_0_#000] ${iconBg} ${iconColor}`}
        >
          {icon}
        </div>
      )}
      <div>
        <div className="font-pixel-title text-xl text-white">{value}</div>
        <div className="font-pixel-sub text-base text-gray-400">{label}</div>
        {sub && <div className="font-pixel-sub text-xs text-gray-500 mt-1">{sub}</div>}
      </div>
    </div>
  );
};
