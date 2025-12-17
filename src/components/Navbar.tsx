"use client";

import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const email = session?.user?.email ?? "user";
  const initial = email.charAt(0)?.toUpperCase() ?? "U";

  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 text-slate-900">
          <span className="text-2xl">🤖</span>
          <div className="leading-tight">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">AI Learning Tracker</p>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 text-slate-900">
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-900">
              {initial}
            </div>
            <div className="leading-tight">
              <p className="text-xs text-slate-500">Signed in as</p>
              <p className="text-sm font-semibold">{email}</p>
            </div>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <LogOut size={16} className="text-slate-700" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
