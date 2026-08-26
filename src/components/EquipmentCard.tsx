"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS } from "@/lib/taxonomy";
import { Equipment } from "@/types/equipment";
import { ExternalLink } from "lucide-react";

interface EquipmentCardProps {
  equipment: Equipment;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <Link
      href={`/equipo/${equipment.id}`}
      className="group block rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:bg-card/80 card-hover"
    >
      {/* Image */}
      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-secondary/50">
        <Image
          src={equipment.image}
          alt={equipment.name}
          fill
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {equipment.status === "needs-identification" && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
              Pendiente
            </Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold text-foreground leading-tight group-hover:text-primary transition-colors">
            {equipment.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {equipment.brand} · {equipment.model}
          </p>
        </div>

        {/* One liner */}
        {equipment.content.oneLiner && (
          <p className="text-xs text-muted-foreground/80 line-clamp-2 leading-relaxed">
            {equipment.content.oneLiner}
          </p>
        )}

        {/* Category + Tags */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="text-[10px] px-2 py-0.5">
            {CATEGORY_LABELS[equipment.category]}
          </Badge>
          {equipment.tags.characteristics.slice(0, 2).map((char) => (
            <Badge
              key={char}
              variant="outline"
              className="text-[10px] px-2 py-0.5 border-primary/20 text-primary/80"
            >
              {char}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
