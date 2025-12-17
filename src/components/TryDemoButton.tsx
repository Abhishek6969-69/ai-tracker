"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2, Play } from "lucide-react";

const DEMO_EMAIL = "sbh123yadav@gmail.com";
const DEMO_PASSWORD = "123456789";

export default function TryDemoButton() {
  const [loading, setLoading] = useState(false);

  const handleDemo = async () => {
    setLoading(true);
    await signIn("credentials", {
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      redirect: true,
      callbackUrl: "/dashboard",
    });
    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleDemo}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
      {loading ? "Signing in..." : "Try demo"}
    </button>
  );
}
