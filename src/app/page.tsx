import Link from "next/link";
import { getAllEquipment } from "@/lib/equipment";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Compass,
  HelpCircle,
} from "lucide-react";

export default function HomePage() {
  const equipment = getAllEquipment();
  const availableCount = equipment.filter(
    (eq) => eq.status === "available"
  ).length;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      {/* Hero */}
      <div className="text-center space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          {availableCount} equipos disponibles
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          <span className="gradient-text">Planificá</span> tu próxima
          <br />
          producción audiovisual
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Descubrí qué equipamiento necesitás, combiná kits de producción y
          armá tu plan de reserva — todo en un solo lugar.
        </p>
      </div>

      {/* Quick Search */}
      <div className="mb-16">
        <SearchBar
          equipment={equipment}
          placeholder="Buscá por nombre, marca, modelo o función..."
          className="max-w-2xl mx-auto"
        />
      </div>

      {/* Entry Points */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Entry A: I know what I want to produce */}
        <Link href="/planificar" className="group">
          <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 card-hover h-full">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Sé lo que quiero producir
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  &ldquo;Quiero grabar un podcast&rdquo; — Elegí tu tipo de
                  producción y recibí una propuesta de equipamiento.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1" />
            </div>
          </div>
        </Link>

        {/* Entry B: I know what equipment I need */}
        <Link href="/catalogo" className="group">
          <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-primary/30 card-hover h-full">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  Sé qué equipo necesito
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  &ldquo;Necesito una cámara&rdquo; — Buscá por nombre, marca
                  o modelo y accedé a la ficha técnica.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all mt-1" />
            </div>
          </div>
        </Link>

        {/* Entry C: I want to explore */}
        <Link href="/catalogo" className="group">
          <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-border card-hover h-full">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 text-electric group-hover:bg-electric/20 transition-colors">
                <Compass className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-foreground group-hover:text-electric transition-colors">
                  Quiero explorar
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  &ldquo;¿Qué equipamiento tienen?&rdquo; — Navegá por
                  categorías y descubrí todo lo disponible.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-electric group-hover:translate-x-1 transition-all mt-1" />
            </div>
          </div>
        </Link>

        {/* Entry D: I need help */}
        <Link href="/planificar" className="group">
          <div className="rounded-xl border border-border/50 bg-card p-6 transition-all hover:border-warm/30 card-hover h-full">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-warm/10 text-warm group-hover:bg-warm/20 transition-colors">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-foreground group-hover:text-warm transition-colors">
                  Necesito ayuda
                </h2>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  &ldquo;Quiero hacer una entrevista pero no sé qué
                  necesito&rdquo; — Te guiamos paso a paso.
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-warm group-hover:translate-x-1 transition-all mt-1" />
            </div>
          </div>
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Equipos", value: equipment.length },
          {
            label: "Categorías",
            value: new Set(equipment.map((eq) => eq.category)).size,
          },
          {
            label: "Casos de uso",
            value: "10",
          },
          {
            label: "Disponibles",
            value: availableCount,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/30 bg-card/50 p-4 text-center"
          >
            <p className="text-2xl font-bold gradient-text">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
