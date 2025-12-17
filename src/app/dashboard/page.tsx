"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ListChecks, Sparkles } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";

export default function DashboardPage() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 md:px-8 md:py-12">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">Welcome back</p>
        <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-sm text-slate-600">Choose what you want to do today: create topics or generate an AI plan.</p>
      </div>

      <DashboardStats refresh={refresh} />

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/dashboard/learning"
          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ListChecks className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Learning Items</p>
              <h3 className="text-xl font-bold text-slate-900">Track and update topics</h3>
            </div>
          </div>
          <p className="text-sm text-slate-600">Add new learning items, update progress, and keep everything organized.</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition-all duration-200 group-hover:text-indigo-700">
            Go to topics <ArrowRight className="h-4 w-4" />
          </div>
        </Link>

        <Link
          href="/dashboard/ai-planner"
          className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">AI Planner</p>
              <h3 className="text-xl font-bold text-slate-900">Generate a 7-day plan</h3>
            </div>
          </div>
          <p className="text-sm text-slate-600">Let the AI draft a focused weekly plan for your chosen skill.</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition-all duration-200 group-hover:text-sky-700">
            Open planner <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setRefresh((prev) => !prev)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          Refresh stats
        </button>
      </div>
    </div>
  );
}
