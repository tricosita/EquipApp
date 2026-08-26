import { Equipment, EquipmentTags, UseCase } from "@/types/equipment";
import { USE_CASES } from "./taxonomy";

interface ScoredEquipment {
  equipment: Equipment;
  score: number;
  reasons: string[];
}

interface RecommendationResult {
  necessary: Equipment[];
  recommended: Equipment[];
  optional: Equipment[];
  explanations: Map<string, string>;
}

const WEIGHTS = {
  activity: 3,
  function: 3,
  context: 2,
  compatibility: 2,
  skillLevel: 1,
  versatility: 1,
};

function scoreTags(
  userTags: Partial<EquipmentTags>,
  equipTags: EquipmentTags
): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  for (const tag of userTags.activity || []) {
    if (equipTags.activity.includes(tag)) {
      score += WEIGHTS.activity;
      reasons.push(`actividad: ${tag}`);
    }
  }

  for (const tag of userTags.function || []) {
    if (equipTags.function.includes(tag)) {
      score += WEIGHTS.function;
      reasons.push(`función: ${tag}`);
    }
  }

  for (const tag of userTags.context || []) {
    if (equipTags.context.includes(tag)) {
      score += WEIGHTS.context;
      reasons.push(`contexto: ${tag}`);
    }
  }

  return { score, reasons };
}

function buildUseCaseTags(useCase: UseCase): Partial<EquipmentTags> {
  return {
    activity: useCase.requiredTags.activity,
    function: useCase.requiredTags.function,
    context: useCase.requiredTags.context,
  };
}

export function buildRefinedTags(
  baseUseCase: UseCase,
  refinements: Record<string, string | number | boolean>
): Partial<EquipmentTags> {
  const tags = buildUseCaseTags(baseUseCase);

  if (refinements.audioVideo === "audio") {
    tags.function = (tags.function || []).filter(
      (f) => f !== "capturar-video"
    );
  } else if (refinements.audioVideo === "video") {
    tags.function = (tags.function || []).filter(
      (f) => f !== "grabar-audio" && f !== "grabar-voz"
    );
  }

  if (refinements.location === "exterior") {
    tags.context = ["exterior"];
  } else if (refinements.location === "interior") {
    tags.context = ["interior"];
  } else if (refinements.location === "estudio") {
    tags.context = ["estudio"];
  }

  if (refinements.mobility === "movil") {
    tags.context = [...(tags.context || []), "movilidad"];
  }

  if (refinements.level === "basico") {
    tags.characteristics = ["portatil"];
  }

  return tags;
}

export function generateRecommendation(
  userTags: Partial<EquipmentTags>,
  allEquipment: Equipment[],
  userSkillLevel: string = "beginner"
): RecommendationResult {
  const scored: ScoredEquipment[] = [];
  const userActivities = userTags.activity || [];

  for (const eq of allEquipment) {
    if (eq.status === "needs-identification") continue;

    // Check if equipment is unsuitable for any selected user activity
    const isUnsuitable = userActivities.some((act) =>
      eq.notSuitableFor.includes(act)
    );
    if (isUnsuitable) continue;

    const { score, reasons } = scoreTags(userTags, eq.tags);

    // Only apply versatility bonus if there is an actual matching tag
    if (score > 0) {
      const versatilityBonus = eq.useCases.length * WEIGHTS.versatility;
      const finalScore = score + versatilityBonus;
      scored.push({ equipment: eq, score: finalScore, reasons });
    }
  }

  scored.sort((a, b) => b.score - a.score);

  const necessary: Equipment[] = [];
  const recommended: Equipment[] = [];
  const optional: Equipment[] = [];
  const explanations = new Map<string, string>();
  const visited = new Set<string>();

  for (const { equipment: eq, score, reasons } of scored) {
    if (visited.has(eq.id)) continue;
    visited.add(eq.id);

    // Check required items
    if (eq.requires.length > 0) {
      for (const reqId of eq.requires) {
        const req = allEquipment.find((e) => e.id === reqId);
        if (req && !visited.has(req.id)) {
          const reqUnsuitable = userActivities.some((act) =>
            req.notSuitableFor.includes(act)
          );
          if (!reqUnsuitable) {
            visited.add(req.id);
            necessary.push(req);
            explanations.set(req.id, `Requerido para el funcionamiento de ${eq.name}`);
          }
        }
      }
    }

    if (score >= 6) {
      necessary.push(eq);
      explanations.set(
        eq.id,
        eq.content.oneLiner || `Equipo principal recomendado para la producción.`
      );
    } else if (score >= 3) {
      recommended.push(eq);
      explanations.set(
        eq.id,
        eq.content.oneLiner || `Complemento recomendado para optimizar el trabajo.`
      );
    } else {
      optional.push(eq);
      explanations.set(
        eq.id,
        `Opción secundaria o de apoyo general.`
      );
    }

    // Check recommendedWith items
    for (const recId of eq.recommendedWith) {
      if (!visited.has(recId)) {
        const recEq = allEquipment.find((e) => e.id === recId);
        if (recEq) {
          const recUnsuitable = userActivities.some((act) =>
            recEq.notSuitableFor.includes(act)
          );
          if (!recUnsuitable) {
            visited.add(recId);
            recommended.push(recEq);
            explanations.set(
              recEq.id,
              `Recomendado junto con ${eq.name}`
            );
          }
        }
      }
    }
  }

  const dedup = (arr: Equipment[]) => {
    const seen = new Set<string>();
    return arr.filter((eq) => {
      if (seen.has(eq.id)) return false;
      seen.add(eq.id);
      return true;
    });
  };

  return {
    necessary: dedup(necessary),
    recommended: dedup(recommended),
    optional: dedup(optional),
    explanations,
  };
}

export function getUseCases(): UseCase[] {
  return USE_CASES;
}

export function getUseCaseById(id: string): UseCase | undefined {
  return USE_CASES.find((uc) => uc.id === id);
}

export function getRefinementOptions(useCaseId: string) {
  const options = [
    {
      id: "peopleCount",
      label: "¿Cuántas personas?",
      type: "number" as const,
      affectsTags: {} as Partial<EquipmentTags>,
    },
    {
      id: "audioVideo",
      label: "¿Audio, video o ambos?",
      type: "select" as const,
      options: ["ambos", "audio", "video"],
      affectsTags: {} as Partial<EquipmentTags>,
    },
    {
      id: "location",
      label: "¿Dónde grabás?",
      type: "select" as const,
      options: ["interior", "exterior", "estudio"],
      affectsTags: {} as Partial<EquipmentTags>,
    },
    {
      id: "mobility",
      label: "¿Grabación fija o móvil?",
      type: "select" as const,
      options: ["fija", "movil"],
      affectsTags: {} as Partial<EquipmentTags>,
    },
    {
      id: "level",
      label: "¿Nivel de complejidad?",
      type: "select" as const,
      options: ["basico", "avanzado"],
      affectsTags: {} as Partial<EquipmentTags>,
    },
  ];

  const uc = getUseCaseById(useCaseId);
  if (!uc) return options;

  const relevant = options.filter((opt) => {
    if (uc.id === "podcast" || uc.id === "programa-de-radio") {
      return ["peopleCount", "audioVideo", "location"].includes(opt.id);
    }
    if (uc.id === "streaming") {
      return ["peopleCount", "location", "level"].includes(opt.id);
    }
    if (uc.id === "entrevista") {
      return ["peopleCount", "audioVideo", "location", "mobility"].includes(
        opt.id
      );
    }
    if (uc.id === "documental") {
      return ["audioVideo", "location", "mobility", "level"].includes(opt.id);
    }
    if (uc.id === "fotografia-de-producto") {
      return ["level"].includes(opt.id);
    }
    if (uc.id === "registro-de-eventos") {
      return ["peopleCount", "location", "mobility"].includes(opt.id);
    }
    return true;
  });

  return relevant;
}
