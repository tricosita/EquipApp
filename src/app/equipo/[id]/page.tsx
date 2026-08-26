import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getEquipmentById, getAllEquipment } from "@/lib/equipment";
import { CATEGORY_LABELS, SKILL_LABELS, ACTIVITY_LABELS, FUNCTION_LABELS, CONTEXT_LABELS, TECH_LABELS, CHAR_LABELS, STAGE_LABELS } from "@/lib/taxonomy";
import { getImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, AlertTriangle, CheckCircle2 } from "lucide-react";

function RelationshipSection({
  title,
  equipmentIds,
  allEquipment,
}: {
  title: string;
  equipmentIds: string[];
  allEquipment: ReturnType<typeof getAllEquipment>;
}) {
  if (equipmentIds.length === 0) return null;
  const related = equipmentIds
    .map((id) => allEquipment.find((eq) => eq.id === id))
    .filter(Boolean);

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {related.map((eq) => (
          <Link
            key={eq!.id}
            href={`/equipo/${eq!.id}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border/50 bg-card px-3 py-2 text-sm transition-colors hover:border-primary/30 hover:bg-card/80"
          >
            <div className="relative h-6 w-6 overflow-hidden rounded bg-secondary/50">
              <Image
                src={getImageUrl(eq!.image)}
                alt={eq!.name}
                fill
                className="object-contain p-0.5"
                sizes="24px"
              />
            </div>
            <span className="text-foreground">{eq!.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const equipment = getAllEquipment();
  return equipment.map((eq) => ({
    id: eq.id,
  }));
}

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const equipment = getEquipmentById(id);
  if (!equipment) notFound();

  const allEquipment = getAllEquipment();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Back button */}
      <Link
        href="/catalogo"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al catálogo
      </Link>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-[1fr_320px]">
        {/* Left: Content */}
        <div className="space-y-8">
          {/* Status banner */}
          {equipment.status === "needs-identification" && (
            <div className="flex items-center gap-3 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4">
              <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-yellow-400">
                  Equipo pendiente de identificación
                </p>
                <p className="text-xs text-yellow-400/70 mt-0.5">
                  El modelo exacto aún no fue confirmado. Los datos mostrados
                  son parciales.
                </p>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {equipment.name}
            </h1>
            <p className="text-muted-foreground mt-1">
              {equipment.brand} · {equipment.model}
            </p>
          </div>

          {/* One liner */}
          {equipment.content.oneLiner && (
            <p className="text-lg text-muted-foreground/80 leading-relaxed border-l-2 border-primary/30 pl-4">
              {equipment.content.oneLiner}
            </p>
          )}

          {/* Content sections */}
          <div className="space-y-6">
            {equipment.content.whatFor && (
              <div>
                <h3 className="text-sm font-semibold text-primary mb-2">
                  ¿Para qué sirve?
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {equipment.content.whatFor}
                </p>
              </div>
            )}

            {equipment.content.whenToUse && (
              <div>
                <h3 className="text-sm font-semibold text-primary mb-2">
                  ¿Cuándo lo necesito?
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {equipment.content.whenToUse}
                </p>
              </div>
            )}

            {equipment.content.whatYouNeed && (
              <div>
                <h3 className="text-sm font-semibold text-primary mb-2">
                  ¿Qué necesitás para usarlo?
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {equipment.content.whatYouNeed}
                </p>
              </div>
            )}

            {equipment.content.quickTip && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <h3 className="text-sm font-semibold text-primary mb-2">
                  💡 Consejo rápido
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {equipment.content.quickTip}
                </p>
              </div>
            )}
          </div>

          <Separator className="bg-border/50" />

          {/* Relationships */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Relaciones
            </h3>
            <RelationshipSection
              title="Requiere"
              equipmentIds={equipment.requires}
              allEquipment={allEquipment}
            />
            <RelationshipSection
              title="Recomendado junto con"
              equipmentIds={equipment.recommendedWith}
              allEquipment={allEquipment}
            />
            <RelationshipSection
              title="Compatible con"
              equipmentIds={equipment.compatibleWith}
              allEquipment={allEquipment}
            />
            <RelationshipSection
              title="Alternativas"
              equipmentIds={equipment.alternatives}
              allEquipment={allEquipment}
            />
            <RelationshipSection
              title="No adecuado para"
              equipmentIds={equipment.notSuitableFor}
              allEquipment={allEquipment}
            />
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="space-y-6">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-xl border border-border/50 bg-secondary/30">
            <Image
              src={getImageUrl(equipment.image)}
              alt={equipment.name}
              fill
              className="object-contain p-4"
              sizes="320px"
              priority
            />
          </div>

          {/* Quick Info */}
          <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Información rápida
            </h3>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Categoría</p>
                <Badge variant="secondary">
                  {CATEGORY_LABELS[equipment.category]}
                </Badge>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Nivel</p>
                <div className="flex flex-wrap gap-1">
                  {equipment.skillLevel.map((level) => (
                    <Badge
                      key={level}
                      variant="outline"
                      className="text-[10px]"
                    >
                      {SKILL_LABELS[level]}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Casos de uso
                </p>
                <div className="flex flex-wrap gap-1">
                  {equipment.useCases.map((uc) => (
                    <Badge
                      key={uc}
                      variant="outline"
                      className="text-[10px] border-primary/20 text-primary/80"
                    >
                      {uc}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-border/50 bg-card p-5 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              Tags del equipo
            </h3>

            {equipment.tags.activity.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Actividad
                </p>
                <div className="flex flex-wrap gap-1">
                  {equipment.tags.activity.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {ACTIVITY_LABELS[tag] || tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {equipment.tags.function.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Función
                </p>
                <div className="flex flex-wrap gap-1">
                  {equipment.tags.function.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {FUNCTION_LABELS[tag] || tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {equipment.tags.context.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Contexto
                </p>
                <div className="flex flex-wrap gap-1">
                  {equipment.tags.context.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {CONTEXT_LABELS[tag] || tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {equipment.tags.technology.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Tecnología
                </p>
                <div className="flex flex-wrap gap-1">
                  {equipment.tags.technology.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[10px] border-electric/20 text-electric"
                    >
                      {TECH_LABELS[tag] || tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {equipment.tags.characteristics.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Características
                </p>
                <div className="flex flex-wrap gap-1">
                  {equipment.tags.characteristics.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[10px]"
                    >
                      {CHAR_LABELS[tag] || tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {equipment.tags.productionStage.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                  Etapa
                </p>
                <div className="flex flex-wrap gap-1">
                  {equipment.tags.productionStage.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[10px]"
                    >
                      {STAGE_LABELS[tag] || tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Aliases */}
          {equipment.aliases.length > 0 && (
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                Nombres alternativos
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {equipment.aliases.map((alias) => (
                  <Badge
                    key={alias}
                    variant="outline"
                    className="text-[10px] text-muted-foreground"
                  >
                    {alias}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
