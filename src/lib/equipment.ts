import { Equipment } from "@/types/equipment";
import equipmentData from "./equipment-data.json";

const allEquipment: Equipment[] = equipmentData as Equipment[];

export function getAllEquipment(): Equipment[] {
  return allEquipment;
}

export function getEquipmentById(id: string): Equipment | null {
  return allEquipment.find((eq) => eq.id === id) || null;
}

export function getEquipmentByCategory(category: string): Equipment[] {
  return allEquipment.filter((eq) => eq.category === category);
}

export function getEquipmentByUseCase(useCaseId: string): Equipment[] {
  return allEquipment.filter((eq) => eq.useCases.includes(useCaseId));
}

export function getEquipmentByStatus(
  status: "available" | "needs-identification"
): Equipment[] {
  return allEquipment.filter((eq) => eq.status === status);
}
