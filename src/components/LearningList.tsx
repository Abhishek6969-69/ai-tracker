"use client";
import { toast } from "sonner";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  CheckSquare2,
  Filter,
  NotepadText,
  Search,
  Trash2,
} from "lucide-react";

type LearningItem = {
  id: string;
  title: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  difficulty: string;
};

export default function LearningList({ refresh = false }: { refresh?: boolean }) {
  const [items, setItems] = useState<LearningItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<"ALL" | LearningItem["status"]>("ALL");
  const [difficultyFilter, setDifficultyFilter] = useState<"ALL" | LearningItem["difficulty"]>("ALL");
  const [search, setSearch] = useState("");

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch("/api/learning");
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        const message = (payload as { message?: string }).message ?? "Failed to load items";
        toast.error(message);
        setItems([]);
        return;
      }

      const payload = await res.json();
      const normalized = Array.isArray(payload) ? payload : [];
      if (!Array.isArray(payload)) {
        toast.error("Unexpected response while loading items");
      }
      setItems(normalized as LearningItem[]);
    } catch {
      toast.error("Could not load items");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchItems();
    })();
  }, [refresh]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim();
    return items.filter((item) => {
      const matchesStatus = statusFilter === "ALL" || item.status === statusFilter;
      const matchesDifficulty = difficultyFilter === "ALL" || item.difficulty === difficultyFilter;
      const matchesSearch = !term || item.title.toLowerCase().includes(term);
      return matchesStatus && matchesDifficulty && matchesSearch;
    });
  }, [difficultyFilter, items, search, statusFilter]);

  async function updateStatus(id: string, status: LearningItem["status"]) {
    try {
      await fetch(`/api/learning/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      toast.success("Status updated");
      fetchItems();
    } catch {
      toast.error("Failed to update status");
    }
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this learning item?")) return;

    try {
      await fetch(`/api/learning/${id}`, { method: "DELETE" });
      toast.success("Learning item deleted");
      fetchItems();
    } catch {
      toast.error("Failed to delete item");
    }
  }


  if (loading) {
    return (
      <div className="mt-6 space-y-3">
        {[1, 2, 3].map((key) => (
          <div
            key={key}
            className="animate-pulse rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <div className="h-4 w-40 rounded bg-slate-200" />
            <div className="mt-3 flex gap-2">
              <div className="h-6 w-20 rounded-full bg-slate-200" />
              <div className="h-6 w-24 rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const noItems = items.length === 0;
  const noResults = !loading && items.length > 0 && filtered.length === 0;

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Filter className="h-4 w-4 text-indigo-600" />
            Filter and search
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 ring-1 ring-slate-200">
              <NotepadText className="h-3.5 w-3.5 text-slate-500" /> {items.length} total
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 ring-1 ring-indigo-100">
              <CheckSquare2 className="h-3.5 w-3.5 text-indigo-600" /> {filtered.length} visible
            </span>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title"
              className="w-full bg-transparent text-sm text-slate-800 outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="ALL">All statuses</option>
            <option value="NOT_STARTED">Not started</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as typeof difficultyFilter)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="ALL">All difficulties</option>
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        {(statusFilter !== "ALL" || difficultyFilter !== "ALL" || search) && (
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <button
              type="button"
              onClick={() => {
                setStatusFilter("ALL");
                setDifficultyFilter("ALL");
                setSearch("");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Reset filters
            </button>
            <span className="text-slate-400">|</span>
            <span className="text-slate-500">Showing {filtered.length} items</span>
          </div>
        )}
      </div>

      {noItems && (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-700">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-indigo-500 shadow">🚀</div>
          <p className="mt-3 text-base font-semibold text-slate-900">No learning items yet</p>
          <p className="text-sm text-slate-600">Add a topic above to kickstart your list.</p>
        </div>
      )}

      {noResults && (
        <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-5 text-sm text-amber-700">
          <div className="flex items-center gap-2 font-semibold">
            <ArrowUpRight className="h-4 w-4" /> No items match your filters
          </div>
          <p className="mt-1 text-slate-700">Try clearing search or switching status/difficulty.</p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-200 hover:shadow-md md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-500" />
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 capitalize ring-1 ring-slate-200">
                  <NotepadText className="h-3.5 w-3.5 text-slate-500" />
                  {item.difficulty.toLowerCase()}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ring-1 ${
                    item.status === "COMPLETED"
                      ? "bg-emerald-50 text-emerald-600 ring-emerald-200"
                      : item.status === "IN_PROGRESS"
                      ? "bg-sky-50 text-sky-600 ring-sky-200"
                      : "bg-amber-50 text-amber-600 ring-amber-200"
                  }`}
                >
                  {item.status.replace("_", " ")}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <select
                value={item.status}
                onChange={(e) =>
                  updateStatus(item.id, e.target.value as LearningItem["status"])
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
              >
                <option value="NOT_STARTED">Not started</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="COMPLETED">Completed</option>
              </select>

              <button
                onClick={() => deleteItem(item.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
