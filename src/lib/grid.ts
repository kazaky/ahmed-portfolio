import type { CardSize } from "@/lib/types";

const sizeClasses: Record<CardSize, string> = {
  "1x1": "col-span-3 sm:col-span-2 row-span-1",
  half: "col-span-3 row-span-1",
  full: "col-span-6 row-span-1",
  map: "col-span-6 row-span-1",
  "2x1": "col-span-6 sm:col-span-4 row-span-2",
  "1x2": "col-span-3 sm:col-span-2 row-span-2",
  "2x2": "col-span-6 sm:col-span-4 row-span-2",
};

export function getSizeClasses(size: CardSize): string {
  return sizeClasses[size];
}
