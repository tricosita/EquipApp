import { Equipment } from "@/types/equipment";
import equipmentData from "./equipment-data.json";
import { getImageUrl } from "./utils";

const rawEquipment: Equipment[] = equipmentData as Equipment[];

export function getAllEquipment(): Equipment[] {
  return rawEquipment.map((eq) => ({
    ...eq,
    image: getImageUrl(eq.image),
  }));
}

export function getEquipmentById(id: string): Equipment | null {
  const eq = rawEquipment.find((e) => e.id === id);
  if (!eq) return null;
  return {
    ...eq,
    image: getImageUrl(eq.image),
  };
}

export function getEquipmentByCategory(category: string): Equipment[] {
  return getAllEquipment().filter((eq) => eq.category === category);
}

export function getEquipmentByUseCase(useCaseId: string): Equipment[] {
  return getAllEquipment().filter((eq) => eq.useCases.includes(useCaseId));
}

export function getEquipmentByStatus(
  status: "available" | "needs-identification"
): Equipment[] {
  return getAllEquipment().filter((eq) => eq.status === status);
}
