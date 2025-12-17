"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Sparkles,
  Loader2,
  ListTree,
  BookOpen,
  Clipboard,
  ClipboardCheck,
  Clock4,
  Target,
  Wand2,
} from "lucide-react";

type PlanSection = {
  title: string;
  bullets: string[];
  body: string[];
};

function parsePlan(text: string): PlanSection[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const sections: PlanSection[] = [];
  let current: PlanSection | null = null;

  const startSection = (title: string) => {
    if (current) sections.push(current);
    current = { title, bullets: [], body: [] };
  };

  for (const line of lines) {
    const headingMatch = line.match(/^\d+\.\s*(.+)$/);
    if (headingMatch) {
      startSection(headingMatch[1]);
      continue;
    }

    if (/^(?:[-•*]|\d+\))/i.test(line)) {
      if (!current) startSection("Plan");
      current!.bullets.push(line.replace(/^(?:[-•*]|\d+\))\s*/, ""));
    } else {
      if (!current) startSection("Plan");
      current!.body.push(line);
    }
  }
  if (current) sections.push(current);

  return sections.length ? sections : [{ title: "Plan", bullets: [], body: lines }];
}

export default function AILearningPlan() {
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [timePerDay, setTimePerDay] = useState("45-60 mins");
  const [focusArea, setFocusArea] = useState("Projects + spaced repetition");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const quickGoals = [
    "Learn Next.js API routes for a SaaS MVP",
    "Master TypeScript essentials for frontend",
    "Build a full-stack Prisma + Next.js CRUD app",
    "Get interview-ready for React patterns",
  ];

  const planSections = useMemo(() => parsePlan(result), [result]);

  function buildPrompt() {
    const trimmedGoal = goal.trim();
    if (!trimmedGoal) return "";

    return `${trimmedGoal}. Assume learner experience: ${experience}. Daily time: ${timePerDay}. Focus areas: ${focusArea}. Produce a concise 7-day plan with day headers, 3-5 bullet tasks per day, and a short expected outcome per day. Use numbered days.`;
  }

  async function generatePlan() {
    const prompt = buildPrompt();

    if (!prompt) {
      toast.error("Please enter a learning goal");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/ai/learning-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        const message = (data as { message?: string }).message ?? "Failed to generate plan";
        toast.error(message);
        return;
      }

      setResult((data as { result: string }).result);
      toast.success("AI plan generated");
    } catch {
      toast.error("Failed to generate learning plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative mt-8 rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="relative flex flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Sparkles size={22} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">AI Learning Planner</h3>
              <p className="text-sm text-slate-600">7-day, outcome-first plan tuned to your context.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 font-semibold text-indigo-700 ring-1 ring-indigo-100">
              <Clock4 className="h-3.5 w-3.5" />
              ~30s to generate
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 font-semibold text-violet-700 ring-1 ring-violet-100">
              <Target className="h-3.5 w-3.5" />
              7-day cadence
            </span>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-slate-800">What do you want to achieve?</label>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
                  <input
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="e.g. Ship a Next.js SaaS with auth and CRUD"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                  <button
                    onClick={generatePlan}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
                    {loading ? "Generating" : "Generate plan"}
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-xs font-semibold text-slate-600">Experience level</p>
                    <div className="mt-2 flex gap-2">
                      {["Beginner", "Intermediate", "Advanced"].map((level) => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setExperience(level)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold transition ${experience === level ? "bg-indigo-600 text-white shadow" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                    <p className="text-xs font-semibold text-slate-600">Daily time</p>
                    <input
                      className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      value={timePerDay}
                      onChange={(e) => setTimePerDay(e.target.value)}
                    />
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs font-semibold text-slate-600">Focus areas</p>
                  <input
                    className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickGoals.map((text) => (
                    <button
                      key={text}
                      type="button"
                      onClick={() => setGoal(text)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50"
                    >
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-full flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Preview</p>
                <p className="text-sm text-slate-600">Clean, scannable 7-day breakdown</p>
              </div>
              <button
                type="button"
                onClick={async () => {
                  if (!result) return;
                  try {
                    await navigator.clipboard.writeText(result);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                    toast.success("Plan copied");
                  } catch {
                    toast.error("Could not copy plan");
                  }
                }}
                disabled={!result}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {copied ? <ClipboardCheck className="h-4 w-4 text-green-600" /> : <Clipboard className="h-4 w-4" />}
                {copied ? "Copied" : "Copy plan"}
              </button>
            </div>

            <div className="flex-1 overflow-auto rounded-lg border border-slate-200 bg-slate-50 p-3 max-h-96">
              {!result && !loading && (
                <div className="flex h-full min-h-60 items-center justify-center text-sm text-slate-500">
                  Your 7-day roadmap will appear here.
                </div>
              )}

              {loading && (
                <div className="flex h-full min-h-60 items-center justify-center gap-2 text-sm font-semibold text-slate-600">
                  <Loader2 className="h-4 w-4 animate-spin" /> Crafting a focused plan...
                </div>
              )}

              {!loading && result && (
                <div className="space-y-3">
                  {planSections.map((section, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                    >
                      <div className="mb-2 flex items-center gap-2 text-slate-800">
                        {idx === 0 ? (
                          <BookOpen size={16} className="text-indigo-500" />
                        ) : (
                          <ListTree size={16} className="text-violet-500" />
                        )}
                        <h4 className="text-base font-semibold leading-tight">{section.title}</h4>
                      </div>
                      <div className="space-y-2 text-sm text-slate-700">
                        {section.body.map((line, i) => (
                          <p key={i} className="leading-relaxed max-w-3xl">
                            {line}
                          </p>
                        ))}
                        {section.bullets.length > 0 && (
                          <ul className="mt-2 space-y-2">
                            {section.bullets.map((b, i) => (
                              <li key={i} className="flex items-start gap-2 text-slate-700">
                                <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
