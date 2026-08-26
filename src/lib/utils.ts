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
    const host = window.location.hostname;
    if (path.startsWith("/EquipApp") || host.includes("github.io")) {
      if (!cleanPath.startsWith("/EquipApp")) {
        return `/EquipApp${cleanPath}`;
      }
      return cleanPath;
    }
  }

  // Build time (SSR / SSG export)
  const basePath =
    process.env.NEXT_PUBLIC_BASE_PATH ||
    (process.env.GITHUB_ACTIONS ? "/EquipApp" : "");

  if (basePath && !cleanPath.startsWith(basePath)) {
    return `${basePath}${cleanPath}`;
  }

  return cleanPath;
}
