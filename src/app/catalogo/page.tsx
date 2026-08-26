"use client";

import { useState, useMemo } from "react";
import { getAllEquipment } from "@/lib/equipment";
import { searchEquipment } from "@/lib/search";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EquipmentCard } from "@/components/EquipmentCard";
import { Category } from "@/types/equipment";
import { SlidersHorizontal } from "lucide-react";

const allEquipment = getAllEquipment();

export default function CatalogoPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {} as Record<Category, number>;
    for (const eq of allEquipment) {
      counts[eq.category] = (counts[eq.category] || 0) + 1;
    }
    return counts;
  }, []);

  const filteredEquipment = useMemo(() => {
    let result = allEquipment;

    if (searchQuery.trim().length >= 2) {
      result = searchEquipment(searchQuery, result);
    }

    if (selectedCategory) {
      result = result.filter((eq) => eq.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Catálogo de{" "}
          <span className="gradient-text">Equipamiento</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Explorá todo el equipamiento disponible para producciones
          audiovisuales.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <SearchBar
          equipment={allEquipment}
          onResults={() => {}}
          placeholder="Buscar por nombre, marca, modelo, función o tag..."
        />
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">
            Filtrar por categoría
          </span>
        </div>
        <CategoryFilter
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          counts={categoryCounts}
        />
      </div>

      {/* Results count */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          {filteredEquipment.length} equipo
          {filteredEquipment.length !== 1 ? "s" : ""}
          {selectedCategory ? ` en esta categoría` : ""}
        </p>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredEquipment.map((eq) => (
          <EquipmentCard key={eq.id} equipment={eq} />
        ))}
      </div>

      {/* Empty State */}
      {filteredEquipment.length === 0 && (
        <div className="rounded-xl border border-border/50 bg-card/50 p-16 text-center">
          <p className="text-lg text-muted-foreground">
            No se encontraron equipos con esos filtros.
          </p>
          <p className="text-sm text-muted-foreground/60 mt-2">
            Probá buscar por otro término o seleccionar otra categoría.
          </p>
        </div>
      )}
    </div>
  );
}
