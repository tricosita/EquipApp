"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Equipment } from "@/types/equipment";
import { CATEGORY_LABELS } from "@/lib/taxonomy";
import { Copy, ExternalLink, CheckCircle2, Star, Plus } from "lucide-react";

interface RecommendationResultProps {
  title: string;
  necessary: Equipment[];
  recommended: Equipment[];
  optional: Equipment[];
  explanations: Map<string, string>;
  onCopyList?: () => void;
}

function EquipmentRow({
  equipment,
  explanation,
  level,
}: {
  equipment: Equipment;
  explanation?: string;
  level: "necessary" | "recommended" | "optional";
}) {
  const levelConfig = {
    necessary: {
      icon: <CheckCircle2 className="h-4 w-4 text-primary" />,
      badge: (
        <Badge className="bg-primary/20 text-primary border-primary/30 text-[10px]">
          NECESARIO
        </Badge>
      ),
    },
    recommended: {
      icon: <Star className="h-4 w-4 text-yellow-400" />,
      badge: (
        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-[10px]">
          RECOMENDADO
        </Badge>
      ),
    },
    optional: {
      icon: <Plus className="h-4 w-4 text-muted-foreground" />,
      badge: (
        <Badge variant="outline" className="text-muted-foreground text-[10px]">
          OPCIONAL
        </Badge>
      ),
    },
  };

  const config = levelConfig[level];

  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/30 bg-card/50 p-3 transition-colors hover:bg-card">
      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-secondary/50">
        <Image
          src={equipment.image}
          alt={equipment.name}
          fill
          className="object-contain p-1"
          sizes="48px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href={`/equipo/${equipment.id}`}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            {equipment.name}
          </Link>
          {config.badge}
        </div>
        {explanation && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {explanation}
          </p>
        )}
        {equipment.content.oneLiner && !explanation && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
            {equipment.content.oneLiner}
          </p>
        )}
      </div>
      {config.icon}
    </div>
  );
}

export function RecommendationResult({
  title,
  necessary,
  recommended,
  optional,
  explanations,
  onCopyList,
}: RecommendationResultProps) {
  const generatePlainText = () => {
    let text = `PLAN DE PRODUCCIÓN\n${title}\n\n`;

    if (necessary.length > 0) {
      text += "NECESARIO\n";
      necessary.forEach((eq) => {
        text += `• ${eq.name} — ${eq.brand} ${eq.model}\n`;
      });
      text += "\n";
    }

    if (recommended.length > 0) {
      text += "RECOMENDADO\n";
      recommended.forEach((eq) => {
        text += `• ${eq.name} — ${eq.brand} ${eq.model}\n`;
      });
      text += "\n";
    }

    if (optional.length > 0) {
      text += "OPCIONAL\n";
      optional.forEach((eq) => {
        text += `• ${eq.name} — ${eq.brand} ${eq.model}\n`;
      });
    }

    return text;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatePlainText());
    onCopyList?.();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold gradient-text">{title}</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="border-primary/30 text-primary hover:bg-primary/10"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copiar lista
        </Button>
      </div>

      {/* Necessary */}
      {necessary.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            NECESARIO
          </h3>
          <div className="space-y-2">
            {necessary.map((eq) => (
              <EquipmentRow
                key={eq.id}
                equipment={eq}
                explanation={explanations.get(eq.id)}
                level="necessary"
              />
            ))}
          </div>
        </div>
      )}

      {/* Recommended */}
      {recommended.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-yellow-400 flex items-center gap-2">
            <Star className="h-4 w-4" />
            RECOMENDADO
          </h3>
          <div className="space-y-2">
            {recommended.map((eq) => (
              <EquipmentRow
                key={eq.id}
                equipment={eq}
                explanation={explanations.get(eq.id)}
                level="recommended"
              />
            ))}
          </div>
        </div>
      )}

      {/* Optional */}
      {optional.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <Plus className="h-4 w-4" />
            OPCIONAL
          </h3>
          <div className="space-y-2">
            {optional.map((eq) => (
              <EquipmentRow
                key={eq.id}
                equipment={eq}
                explanation={explanations.get(eq.id)}
                level="optional"
              />
            ))}
          </div>
        </div>
      )}

      {/* Action buttons & Footer */}
      {(necessary.length > 0 || recommended.length > 0 || optional.length > 0) && (
        <div className="pt-4 border-t border-border/30 flex flex-wrap gap-3 items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
            className="border-primary/30 text-primary hover:bg-primary/10"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copiar plan de producción
          </Button>

          <a
            href="https://reservas.equipamiento.edu.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-sm"
          >
            <span>Consultar disponibilidad / Reservar en sistema externo</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      )}

      {/* Empty state */}
      {necessary.length === 0 &&
        recommended.length === 0 &&
        optional.length === 0 && (
          <div className="rounded-xl border border-border/50 bg-card/50 p-12 text-center">
            <p className="text-muted-foreground">
              No se encontraron equipos para esta configuración. Probá ajustar
              los filtros.
            </p>
          </div>
        )}
    </div>
  );
}
