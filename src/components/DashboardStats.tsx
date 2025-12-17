"use client";

import { useEffect, useState } from "react";
import { Layers, PauseCircle, PlayCircle, CheckCircle2 } from "lucide-react";

type Stats = {
  total: number;
  notStarted: number;
  inProgress: number;
  completed: number;
};

export default function DashboardStats({ refresh }: { refresh: boolean }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/learning/stats");
      const data = await res.json();
      setStats(data);
    }

    fetchStats();
  }, [refresh]);

  if (!stats) {
    return (
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-xl border border-slate-200 bg-white shadow-sm"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
      <StatCard
        label="Total"
        value={stats.total}
        icon={Layers}
        accent="from-indigo-500/15 to-indigo-500/5"
        iconBg="bg-indigo-500/10 text-indigo-600"
      />
      <StatCard
        label="Not Started"
        value={stats.notStarted}
        icon={PauseCircle}
        accent="from-amber-500/15 to-amber-500/5"
        iconBg="bg-amber-500/10 text-amber-600"
      />
      <StatCard
        label="In Progress"
        value={stats.inProgress}
        icon={PlayCircle}
        accent="from-sky-500/15 to-sky-500/5"
        iconBg="bg-sky-500/10 text-sky-600"
      />
      <StatCard
        label="Completed"
        value={stats.completed}
        icon={CheckCircle2}
        accent="from-emerald-500/15 to-emerald-500/5"
        iconBg="bg-emerald-500/10 text-emerald-600"
      />
    </div>
  );
}

type CardProps = {
  label: string;
  value: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accent: string;
  iconBg: string;
};

function StatCard({ label, value, icon: Icon, accent, iconBg }: CardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${iconBg} transition-all duration-200`}>
          <Icon size={22} />
        </div>
      </div>
      <div className={`pointer-events-none absolute inset-0 rounded-xl bg-linear-to-br ${accent}`} aria-hidden />
    </div>
  );
}
