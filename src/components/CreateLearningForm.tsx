"use client";
import { toast } from "sonner";

import { useState } from "react";
import { Loader2, PlusCircle, Sparkles } from "lucide-react";

export default function CreateLearningForm({
  onCreated = () => {},
}: {
  onCreated?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("BEGINNER");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please add a topic title");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/learning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, difficulty }),
      });

      if (!res.ok) throw new Error();

      toast.success("Learning item added");
      setTitle("");
      setDifficulty("BEGINNER");
      onCreated();
    } catch {
      toast.error("Failed to add learning item");
    } finally {
      setLoading(false);
    }
  }

  const difficultyOptions = [
    { value: "BEGINNER", label: "Beginner" },
    { value: "INTERMEDIATE", label: "Intermediate" },
    { value: "ADVANCED", label: "Advanced" },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <Sparkles className="h-4 w-4 text-indigo-600" />
        Add learning item
      </div>
      <p className="mt-1 text-xs text-slate-500">Keep titles outcome-focused, e.g. “Build a CRUD API with Prisma”.</p>

      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        <input
          className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition-all duration-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
          placeholder="Add a learning topic"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div className="flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
          {difficultyOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setDifficulty(option.value)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                difficulty === option.value
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-indigo-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle size={16} />}
          {loading ? "Adding" : "Add topic"}
        </button>
      </div>
    </form>
  );
}
