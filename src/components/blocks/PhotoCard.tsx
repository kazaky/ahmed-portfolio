import Image from "next/image";
import type { PhotoItem } from "@/lib/types";

interface PhotoCardProps {
  item: PhotoItem;
}

export function PhotoCard({ item }: PhotoCardProps) {
  if (!item.image) {
    return <div className="h-full bg-neutral-100" aria-hidden />;
  }

  return (
    <div className="relative h-full overflow-hidden">
      <Image
        src={item.image}
        alt={item.alt ?? "Photograph"}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm">
        <Image
          src="/icons/instagram.svg"
          alt=""
          width={14}
          height={14}
          className="h-3.5 w-3.5 brightness-0 invert"
        />
      </div>
      {item.alt && (
        <p className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1 px-3 pb-2.5 text-xs font-medium leading-snug text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 line-clamp-2">
          {item.alt}
        </p>
      )}
    </div>
  );
}
