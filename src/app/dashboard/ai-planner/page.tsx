"use client";

import AILearningPlan from "@/components/AILearningPlan";

export default function AIPlannerPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">AI Copilot</p>
        <h1 className="text-3xl font-bold text-slate-900">AI Learning Planner</h1>
        <p className="text-sm text-slate-600">Generate a tailored 7-day plan for any learning goal.</p>
      </div>
      <AILearningPlan />
    </div>
  );
}
