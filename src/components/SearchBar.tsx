"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { searchEquipment } from "@/lib/search";
import { Equipment } from "@/types/equipment";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface SearchBarProps {
  equipment: Equipment[];
  onResults?: (results: Equipment[]) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  equipment,
  onResults,
  placeholder = "Buscar equipo, marca, función...",
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Equipment[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      if (value.trim().length < 2) {
        setResults([]);
        setIsOpen(false);
        onResults?.(equipment);
        return;
      }

      const found = searchEquipment(value, equipment);
      setResults(found.slice(0, 8));
      setIsOpen(true);
      onResults?.(found);
    },
    [equipment, onResults]
  );

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    onResults?.(equipment);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className || ""}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder={placeholder}
          className="pl-10 pr-10 h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-primary/20"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-border/50 bg-card shadow-2xl shadow-black/30">
          {results.map((eq) => (
            <Link
              key={eq.id}
              href={`/equipo/${eq.id}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-primary/10 border-b border-border/30 last:border-0"
            >
              <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg bg-secondary/50">
                <Image
                  src={getImageUrl(eq.image)}
                  alt={eq.name}
                  fill
                  className="object-contain p-1"
                  sizes="40px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {eq.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {eq.brand} · {eq.content.oneLiner || eq.model}
                </p>
              </div>
              {eq.status === "needs-identification" && (
                <Badge
                  variant="outline"
                  className="text-[10px] bg-yellow-500/20 text-yellow-400 border-yellow-500/30 flex-shrink-0"
                >
                  Pendiente
                </Badge>
              )}
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border/50 bg-card p-8 text-center shadow-2xl shadow-black/30">
          <p className="text-sm text-muted-foreground">
            No se encontraron resultados para &ldquo;{query}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
