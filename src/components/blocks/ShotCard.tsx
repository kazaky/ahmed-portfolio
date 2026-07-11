import Image from "next/image";
import type { ShotItem } from "@/lib/types";

interface ShotCardProps {
  item: ShotItem;
}

export function ShotCard({ item }: ShotCardProps) {
  const badge =
    item.source === "dribbble" ? "/icons/dribbble.svg" : "/icons/instagram.svg";

  return (
    <div className="relative h-full overflow-hidden">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm">
        <Image src={badge} alt="" width={14} height={14} className="h-3.5 w-3.5" />
      </div>
      <p className="absolute inset-x-0 bottom-0 px-3 pb-2.5 text-xs font-semibold leading-snug text-white line-clamp-2 sm:text-sm">
        {item.title}
      </p>
    </div>
  );
}
