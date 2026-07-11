import Image from "next/image";
import { MapPin } from "lucide-react";
import type { LocationItem } from "@/lib/types";

interface LocationCardProps {
  item: LocationItem;
}

export function LocationCard({ item }: LocationCardProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
  const image = item.mapImage ?? "/map-berlin.jpg";

  return (
    <div className="relative h-full min-h-0 overflow-hidden">
      <Image
        src={image}
        alt={`Map of ${item.title}`}
        fill
        priority
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
        sizes="(max-width: 768px) 100vw, 900px"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-900/30 via-transparent to-transparent" />

      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <span className="relative -translate-y-2 drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]">
          <MapPin
            className="h-10 w-10 fill-[#ea4335] text-[#ea4335] sm:h-11 sm:w-11"
            strokeWidth={1.25}
          />
          <span className="absolute left-1/2 top-[38%] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm" />
        </span>
      </div>

      <div className="absolute bottom-2 left-2 z-10 sm:bottom-2.5 sm:left-2.5">
        <div className="rounded-xl bg-white/95 px-2.5 py-1.5 shadow-md shadow-black/10 backdrop-blur-md ring-1 ring-black/5">
          <p className="text-xs font-semibold leading-tight text-neutral-900 sm:text-sm">
            {item.title}
          </p>
        </div>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${item.title} in Google Maps`}
        className="absolute inset-0 z-20"
      />
    </div>
  );
}
