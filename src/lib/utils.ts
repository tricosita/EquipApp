import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(imagePath: string): string {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

  if (basePath && !cleanPath.startsWith(basePath)) {
    return `${basePath}${cleanPath}`;
  }

  return cleanPath;
}
