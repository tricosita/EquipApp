"use client";

import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, CATEGORIES } from "@/lib/taxonomy";
import { Category } from "@/types/equipment";

interface CategoryFilterProps {
  selected: Category | null;
  onSelect: (category: Category | null) => void;
  counts: Record<Category, number>;
}

export function CategoryFilter({
  selected,
  onSelect,
  counts,
}: CategoryFilterProps) {
  const categories = Object.keys(CATEGORIES) as Category[];

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
          selected === null
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
            : "bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground"
        }`}
      >
        Todos
      </button>
      {categories.map((cat) => {
        const count = counts[cat] || 0;
        if (count === 0) return null;
        return (
          <button
            key={cat}
            onClick={() => onSelect(selected === cat ? null : cat)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              selected === cat
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-secondary/80 text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {CATEGORIES[cat].icon} {CATEGORY_LABELS[cat]}
            <span className="ml-1.5 text-xs opacity-70">({count})</span>
          </button>
        );
      })}
    </div>
  );
}
