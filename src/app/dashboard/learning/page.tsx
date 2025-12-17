"use client";

import { useState } from "react";
import { Lightbulb, ListChecks } from "lucide-react";
import CreateLearningForm from "@/components/CreateLearningForm";
import LearningList from "@/components/LearningList";

export default function LearningPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 md:px-8">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Library</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">Learning Items</h1>
          <p className="mt-2 text-sm text-slate-600">
            Add topics, track status, and keep your roadmap organized with clean, actionable cards.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <ListChecks className="h-3.5 w-3.5" /> Status per item
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700 ring-1 ring-amber-100">
              <Lightbulb className="h-3.5 w-3.5" /> Difficulty tagging
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick tips</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>Break goals into shippable topics with clear outcomes.</li>
            <li>Update status weekly to keep momentum visible.</li>
            <li>Use difficulty to balance your learning stack.</li>
          </ul>
        </div>
      </div>

      <CreateLearningForm onCreated={() => setRefresh((prev) => !prev)} />
      <LearningList refresh={refresh} />
    </div>
  );
}
