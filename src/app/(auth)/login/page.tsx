"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 md:px-8">
        <div className="grid w-full gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.05fr_0.95fr] md:p-10">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-indigo-700">
              <Sparkles className="h-4 w-4" /> AI Learning Tracker
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
              <p className="mt-2 text-sm text-slate-600">Sign in to keep your learning momentum and AI plans in sync.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 ring-1 ring-red-100">{error}</p>}

              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                <Mail className="h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </label>

              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                <Lock className="h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? "Signing in" : "Sign in"}
              </button>

              <p className="text-center text-sm text-slate-600">
                Don’t have an account?{" "}
                <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Create one
                </Link>
              </p>
            </form>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Why sign in</p>
              <h2 className="text-2xl font-semibold leading-tight text-slate-900">Stay aligned with your learning plan</h2>
              <p className="text-sm text-slate-700">Track topics, update progress, and generate AI plans in one place with a cohesive experience across dashboard and planner.</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Progress synced with dashboard
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" /> AI planner ready in seconds
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Clean, focused workspace
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              Tip: Use the same email you registered with to see your saved learning items and stats.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
