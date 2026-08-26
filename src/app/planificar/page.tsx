"use client";

import { useState, useMemo, useCallback } from "react";
import { getAllEquipment } from "@/lib/equipment";
import {
  getUseCases,
  getRefinementOptions,
  generateRecommendation,
  buildRefinedTags,
} from "@/lib/recommendation";
import { UseCaseCard } from "@/components/UseCaseCard";
import { RecommendationResult } from "@/components/RecommendationResult";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UseCase, EquipmentTags } from "@/types/equipment";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Wand2,
  Sparkles,
} from "lucide-react";

const allEquipment = getAllEquipment();
const useCases = getUseCases();

export default function PlanificarPage() {
  const [step, setStep] = useState<"select" | "refine" | "result">("select");
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);
  const [refinements, setRefinements] = useState<Record<string, string | number | boolean>>({});
  const [customQuery, setCustomQuery] = useState("");

  const refinementOptions = useMemo(() => {
    if (!selectedUseCase) return [];
    return getRefinementOptions(selectedUseCase.id);
  }, [selectedUseCase]);

  const handleUseCaseSelect = useCallback((uc: UseCase) => {
    setSelectedUseCase(uc);
    setStep("refine");
  }, []);

  const handleRefine = useCallback(() => {
    setStep("result");
  }, []);

  const handleBack = useCallback(() => {
    if (step === "result") setStep("refine");
    else if (step === "refine") {
      setStep("select");
      setSelectedUseCase(null);
      setRefinements({});
    }
  }, [step]);

  const handleReset = useCallback(() => {
    setStep("select");
    setSelectedUseCase(null);
    setRefinements({});
    setCustomQuery("");
  }, []);

  const recommendation = useMemo(() => {
    if (step !== "result" || !selectedUseCase) return null;

    const tags = buildRefinedTags(selectedUseCase, refinements);
    return generateRecommendation(tags, allEquipment);
  }, [step, selectedUseCase, refinements]);

  const customRecommendation = useMemo(() => {
    if (!customQuery.trim() || step !== "select") return null;

    const keywords = customQuery.toLowerCase().split(/\s+/);
    const tags: Partial<EquipmentTags> = {
      activity: [] as EquipmentTags["activity"],
      function: [] as EquipmentTags["function"],
      context: [] as EquipmentTags["context"],
    };

    const activityMap: Record<string, string[]> = {
      podcast: ["podcast"],
      entrevista: ["entrevista"],
      documental: ["documental"],
      streaming: ["streaming"],
      radio: ["programa-de-radio"],
      fotografía: ["fotografia-de-producto"],
      foto: ["fotografia-de-producto"],
      inmersivo: ["corto-inmersivo-3d"],
      "3d": ["corto-inmersivo-3d"],
      animado: ["corto-animado"],
      eventos: ["registro-de-eventos"],
    };

    const functionMap: Record<string, string[]> = {
      audio: ["grabar-audio", "grabar-voz", "capturar-audio"],
      video: ["capturar-video"],
      luz: ["iluminar"],
      iluminación: ["iluminar"],
      grabar: ["grabar-audio", "grabar-voz"],
      cámara: ["capturar-video"],
      camara: ["capturar-video"],
    };

    const contextMap: Record<string, string[]> = {
      interior: ["interior"],
      exterior: ["exterior"],
      estudio: ["estudio"],
      móvil: ["movilidad"],
      movil: ["movilidad"],
    };

    for (const kw of keywords) {
      for (const [key, vals] of Object.entries(activityMap)) {
        if (kw.includes(key)) (tags.activity as string[]).push(...vals);
      }
      for (const [key, vals] of Object.entries(functionMap)) {
        if (kw.includes(key)) (tags.function as string[]).push(...vals);
      }
      for (const [key, vals] of Object.entries(contextMap)) {
        if (kw.includes(key)) (tags.context as string[]).push(...vals);
      }
    }

    if (
      tags.activity!.length === 0 &&
      tags.function!.length === 0 &&
      tags.context!.length === 0
    ) {
      return null;
    }

    tags.activity = [...new Set(tags.activity!)];
    tags.function = [...new Set(tags.function!)];
    tags.context = [...new Set(tags.context!)];

    return generateRecommendation(tags, allEquipment);
  }, [customQuery, step]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Wand2 className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="gradient-text">Planificá</span> tu producción
          </h1>
        </div>
        <p className="text-muted-foreground">
          Elegí qué querés producir y te armamos el kit de equipamiento ideal.
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[
          { key: "select", label: "Producción" },
          { key: "refine", label: "Ajustar" },
          { key: "result", label: "Resultado" },
        ].map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                step === s.key
                  ? "bg-primary text-primary-foreground"
                  : ["select", "refine", "result"].indexOf(step) > i
                  ? "bg-primary/20 text-primary"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm ${
                step === s.key
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            {i < 2 && (
              <div className="w-8 h-px bg-border mx-1" />
            )}
          </div>
        ))}
      </div>

      {/* Back button */}
      {step !== "select" && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="mb-6 text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      )}

      {/* Step: Select Use Case */}
      {step === "select" && (
        <div className="space-y-8">
          {/* Direct text input */}
          <div className="rounded-xl border border-border/50 bg-card p-6 space-y-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Decinos qué querés hacer
            </h2>
            <div className="flex gap-3">
              <Input
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder='Ej: "Quiero grabar un podcast con dos personas"'
                className="h-12 bg-secondary/50 border-border/50"
              />
            </div>
            {customRecommendation && (
              <div className="pt-4 border-t border-border/30">
                <RecommendationResult
                  title="Resultado para tu búsqueda"
                  necessary={customRecommendation.necessary}
                  recommended={customRecommendation.recommended}
                  optional={customRecommendation.optional}
                  explanations={customRecommendation.explanations}
                />
              </div>
            )}
          </div>

          {/* Or select a use case */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              O elegí un tipo de producción
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {useCases.map((uc) => (
                <UseCaseCard
                  key={uc.id}
                  useCase={uc}
                  onSelect={handleUseCaseSelect}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step: Refine */}
      {step === "refine" && selectedUseCase && (
        <div className="space-y-6">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedUseCase.icon}</span>
              <div>
                <h2 className="font-semibold text-foreground">
                  {selectedUseCase.name}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedUseCase.description}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground">
              ¿Querés ajustar algo?
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {refinementOptions.map((opt) => (
                <div
                  key={opt.id}
                  className="rounded-xl border border-border/50 bg-card p-4"
                >
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    {opt.label}
                  </label>
                  {opt.type === "number" && (
                    <Input
                      type="number"
                      min={1}
                      max={20}
                      value={String(refinements[opt.id] || "")}
                      onChange={(e) =>
                        setRefinements((prev) => ({
                          ...prev,
                          [opt.id]: parseInt(e.target.value) || 1,
                        }))
                      }
                      placeholder="Cantidad"
                      className="bg-secondary/50"
                    />
                  )}
                  {opt.type === "select" && opt.options && (
                    <div className="flex flex-wrap gap-2">
                      {opt.options.map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setRefinements((prev) => ({
                              ...prev,
                              [opt.id]: option,
                            }))
                          }
                          className={`rounded-lg px-3 py-1.5 text-sm transition-all ${
                            refinements[opt.id] === option
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              onClick={handleRefine}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Ver recomendación
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Step: Result */}
      {step === "result" && recommendation && selectedUseCase && (
        <div className="space-y-8">
          <RecommendationResult
            title={`${selectedUseCase.icon} ${selectedUseCase.name}`}
            necessary={recommendation.necessary}
            recommended={recommendation.recommended}
            optional={recommendation.optional}
            explanations={recommendation.explanations}
          />

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-border/50"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Empezar de nuevo
            </Button>
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-border/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ajustar filtros
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
