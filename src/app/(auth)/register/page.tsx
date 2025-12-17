"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, Mail, Sparkles, User } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError((data as { message?: string }).message || "Something went wrong");
      return;
    }

    router.push("/login");
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
              <h1 className="text-3xl font-bold text-slate-900">Create your account</h1>
              <p className="mt-2 text-sm text-slate-600">Set up your profile so your learning items and AI plans stay connected.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 ring-1 ring-red-100">{error}</p>}

              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
                <User className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>

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
                  autoComplete="new-password"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? "Creating" : "Create account"}
              </button>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-sm">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">Get started fast</p>
              <h2 className="text-2xl font-semibold leading-tight text-slate-900">Launch with a guided learning stack</h2>
              <p className="text-sm text-slate-700">Sign up to save your topics, track progress, and generate AI plans that stay in sync with your dashboard.</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Save topics and states
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" /> AI plans tailored to you
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-amber-400" /> Seamless handoff to dashboard
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
              Use a strong password and the same email to keep your data consistent across planner and learning list.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
