"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function ProductPromo({
  slug,
  title,
  description,
  href,
}: {
  slug: string;
  title: string;
  description: string;
  href: string;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (
        visible &&
        !motion.matches &&
        !userPaused.current &&
        !document.hidden
      ) {
        void element.play().catch(() => setPlaying(false));
      } else element.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(element);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      element.pause();
    };
  }, []);

  const toggle = () => {
    const element = video.current;
    if (!element) return;
    userPaused.current = !element.paused;
    if (element.paused) void element.play().catch(() => setPlaying(false));
    else element.pause();
  };

  return (
    <div className="product-promo">
      <video
        ref={video}
        width={960}
        height={600}
        muted
        loop
        playsInline
        preload="none"
        poster={`/promos/${slug}.jpg`}
        aria-label={`${title} product film. ${description}`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
      >
        <source src={`/promos/${slug}.mp4`} type="video/mp4" />
      </video>
      <div className="promo-controls">
        <span>
          <i className={playing ? "is-playing" : ""} />
          {playing ? "Product in motion" : "Product film"}
          <span className="promo-duration">00:09</span>
        </span>
        <div>
          {!failed && (
            <button
              type="button"
              onClick={toggle}
              aria-label={`${playing ? "Pause" : "Play"} ${title} promo`}
            >
              {playing ? <Pause size={16} /> : <Play size={16} />}
            </button>
          )}
          <Link href={href} aria-label={`Explore ${title}`}>
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
