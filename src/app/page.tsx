import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock4, Lightbulb, LineChart, Shield, Sparkles, Target, Wand2 } from "lucide-react";
import TryDemoButton from "@/components/TryDemoButton";

const features = [
  {
    title: "AI-powered plans",
    description: "Ship 7-day, outcome-first plans in seconds with context-aware prompts and focused tasks.",
    icon: Sparkles,
  },
  {
    title: "Progress you can feel",
    description: "Status, difficulty, and clear outcomes keep your roadmap visible and accountable.",
    icon: LineChart,
  },
  {
    title: "Ship-ready guidance",
    description: "Practical steps, project suggestions, and checks to avoid tutorial hell.",
    icon: Lightbulb,
  },
  {
    title: "Secure by design",
    description: "Session-backed access with Prisma + NextAuth; your data stays yours.",
    icon: Shield,
  },
];

const steps = [
  "Set your goal and context",
  "Generate a 7-day AI plan",
  "Add topics and track status",
  "Review outcomes every week",
];

const testimonials = [
  {
    name: "Taylor, Frontend Engineer",
    quote: "The AI plans are concise and shippable. I finally stick to a weekly cadence.",
  },
  {
    name: "Priya, Career Switcher",
    quote: "Difficulty tags and filters keep me from overloading. The UI feels premium and clear.",
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-50">
      <header className="relative mx-auto flex max-w-7xl items-center justify-between border-b border-slate-200 bg-white px-4 py-6 md:px-8">
        <div className="text-sm font-semibold text-slate-800">AI Learning Tracker</div>
        <div className="flex items-center gap-3 text-sm font-semibold">
          <Link href="/login" className="rounded-full px-4 py-2 text-slate-700 hover:text-slate-900">Log in</Link>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-700"
          >
            Get started <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
        <section className="grid gap-8 pb-12 pt-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-4 w-4" /> Build momentum with AI
            </div>
            <div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">Your personal AI for weekly learning wins</h1>
              <p className="mt-4 text-base text-slate-700 md:text-lg">
                Generate focused 7-day plans, add shippable topics, and track progress with a polished dashboard. Less drift, more delivery.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-800">
                View dashboard UI
              </Link>
              <TryDemoButton />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Weekly plans", value: "7-day cadences" },
                { label: "Status clarity", value: "Not started → Done" },
                { label: "Fast setup", value: "< 2 minutes" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-3 text-sm shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{item.label}</p>
                  <p className="mt-1 font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="relative space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-indigo-700">AI Planner preview</p>
                <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-100">Live</span>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-inner">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Wand2 className="h-4 w-4 text-indigo-500" /> 7-day AI plan
                </div>
                <div className="space-y-3 text-sm text-slate-700">
                  {["Define scope and success metrics", "Build a small feature end-to-end", "Ship and review learnings"].map((line) => (
                    <div key={line} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-indigo-500" />
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Learning items</p>
                <div className="mt-3 space-y-2">
                  {["Next.js API routes", "Prisma CRUD", "UI polish"].map((title, idx) => (
                    <div key={title} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800">
                      <span>{title}</span>
                      <span className={`rounded-full px-2 py-1 text-xs ${idx === 2 ? "bg-emerald-50 text-emerald-600" : idx === 1 ? "bg-sky-50 text-sky-600" : "bg-amber-50 text-amber-600"}`}>
                        {idx === 2 ? "Completed" : idx === 1 ? "In progress" : "Not started"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Why teams switch</p>
              <h2 className="text-2xl font-bold text-slate-900">Built for momentum, clarity, and ship dates</h2>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              <Clock4 className="h-4 w-4" /> Stay on a 7-day cadence
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 text-slate-800 shadow-sm md:grid-cols-[1fr_1fr] md:p-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">How it works</p>
            <h2 className="text-2xl font-bold text-slate-900">From goal to shipped outcome</h2>
            <p className="text-sm text-slate-700">A concise flow that keeps you shipping: plan, add items, execute, and reflect every week.</p>
          </div>
          <div className="grid gap-3">
            {steps.map((step, idx) => (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">{idx + 1}</span>
                <span className="text-slate-800">{step}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Built-in focus</p>
            <h2 className="text-2xl font-bold text-slate-900">AI planning + human control</h2>
            <p className="text-sm text-slate-700">Add context like time per day, experience, and focus areas. Plans stay tight; you stay in control.</p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Contextual prompts for better plans</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Track items with status and difficulty</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Copy plans and sync with your workflow</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-inner">
            {["Beginner", "Intermediate", "Advanced"].map((level, idx) => (
              <div key={level} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold ${idx === 1 ? "bg-white shadow-sm" : "bg-white/60"}`}>
                <span>{level} focus</span>
                <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs text-white">{idx === 1 ? "Most used" : "Option"}</span>
              </div>
            ))}
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-indigo-700 shadow-sm">
              <Target className="mr-2 inline h-4 w-4" /> 45-60 mins/day → measurable wins
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Social proof</p>
            <h2 className="text-2xl font-bold text-slate-900">People stick to the plan</h2>
            <p className="text-sm text-slate-700">Less context switching, more finishing. You get a clear weekly rhythm.</p>
          </div>
          <div className="grid gap-3">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm shadow-sm">
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p className="mt-1 text-slate-700">“{t.quote}”</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Get started</p>
              <h2 className="text-2xl font-bold text-slate-900">Keep your learning in one flow</h2>
              <p className="text-sm text-slate-700">Create an account, generate your first plan, and start shipping weekly.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
              >
                Create account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-transparent px-5 py-3 text-sm font-semibold text-slate-800 ring-1 ring-slate-300 transition hover:bg-slate-50"
              >
                Sign in
              </Link>
            </div>
          </div>
        </section>

        <footer className="mt-10 flex flex-col gap-3 border-t border-slate-200 py-8 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <div className="font-semibold text-slate-800">AI Learning Tracker</div>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-slate-900">Login</Link>
            <Link href="/register" className="hover:text-slate-900">Register</Link>
            <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
