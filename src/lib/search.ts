import Fuse from "fuse.js";
import { Equipment } from "@/types/equipment";

let fuseInstance: Fuse<Equipment> | null = null;

function getFuse(equipment: Equipment[]): Fuse<Equipment> {
  if (!fuseInstance) {
    fuseInstance = new Fuse(equipment, {
      keys: [
        { name: "name", weight: 0.35 },
        { name: "brand", weight: 0.25 },
        { name: "model", weight: 0.25 },
        { name: "aliases", weight: 0.3 },
        { name: "category", weight: 0.15 },
        { name: "content.oneLiner", weight: 0.1 },
        { name: "tags.activity", weight: 0.15 },
        { name: "tags.function", weight: 0.15 },
        { name: "useCases", weight: 0.15 },
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
    });
  }
  return fuseInstance;
}

export function searchEquipment(
  query: string,
  equipment: Equipment[]
): Equipment[] {
  if (!query.trim()) return equipment;

  const fuse = getFuse(equipment);
  const results = fuse.search(query);

  return results.map((r) => r.item);
}

export function searchEquipmentWithScore(
  query: string,
  equipment: Equipment[]
): Array<{ item: Equipment; score: number }> {
  if (!query.trim())
    return equipment.map((eq) => ({ item: eq, score: 1 }));

  const fuse = getFuse(equipment);
  const results = fuse.search(query);

  return results.map((r) => ({
    item: r.item,
    score: r.score ? 1 - r.score : 0,
  }));
}

export function resetFuse(): void {
  fuseInstance = null;
}
