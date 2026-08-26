import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(imagePath: string): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;

  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

  // Client-side browser check
  if (typeof window !== "undefined") {
    const path = window.location.pathname;
    if (path.startsWith("/EquipApp")) {
      if (!cleanPath.startsWith("/EquipApp")) {
        return `/EquipApp${cleanPath}`;
      }
      return cleanPath;
    }
  }

  // Build time or environment check
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (basePath && !cleanPath.startsWith(basePath)) {
    return `${basePath}${cleanPath}`;
  }

  return cleanPath;
}
