import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import type {
  Profile,
  ProfileCta,
  ProfileLanguage,
  ProfileRoleLink,
} from "@/lib/types";

interface ProfileSidebarProps {
  profile: Profile;
}

function isLink(part: string | ProfileRoleLink): part is ProfileRoleLink {
  return typeof part === "object" && "url" in part;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2";

const languageMeta: Record<
  string,
  { flag: string; tint: string; ring: string }
> = {
  EN: {
    flag: "/icons/flags/gb.svg",
    tint: "bg-[#012169]/8",
    ring: "ring-[#012169]/20",
  },
  AR: {
    flag: "/icons/flags/eg.svg",
    tint: "bg-[#CE1126]/8",
    ring: "ring-[#CE1126]/20",
  },
  DE: {
    flag: "/icons/flags/de.svg",
    tint: "bg-[#FFCC00]/12",
    ring: "ring-[#DD0000]/18",
  },
  FR: {
    flag: "/icons/flags/fr.svg",
    tint: "bg-[#002395]/8",
    ring: "ring-[#ED2939]/18",
  },
};

function CtaButton({
  cta,
  variant,
}: {
  cta: ProfileCta;
  variant: "primary" | "secondary";
}) {
  const isMail = cta.url.startsWith("mailto:");
  const isInternal = cta.url.startsWith("/");
  return (
    <a
      href={cta.url}
      target={isMail || isInternal ? undefined : "_blank"}
      rel={isMail || isInternal ? undefined : "noopener noreferrer"}
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors",
        focusRing,
        variant === "primary"
          ? "bg-neutral-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-neutral-800 transition-transform"
          : "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
      ].join(" ")}
    >
      {isMail ? <Mail className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden /> : null}
      {cta.label}
      {!isMail && variant === "primary" ? (
        <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
      ) : null}
    </a>
  );
}

function LanguageRow({ language }: { language: ProfileLanguage }) {
  const meta = languageMeta[language.code] ?? {
    flag: "",
    tint: "bg-neutral-100",
    ring: "ring-neutral-200",
  };

  return (
    <li
      className={[
        "flex h-7 items-center gap-1.5 rounded-lg px-1.5 ring-1",
        meta.tint,
        meta.ring,
      ].join(" ")}
    >
      {meta.flag ? (
        <span className="relative block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2.5px] shadow-sm ring-1 ring-black/10">
          <Image
            src={meta.flag}
            alt=""
            width={20}
            height={14}
            className="block h-full w-full object-cover"
          />
        </span>
      ) : null}
      <span className="flex min-w-0 translate-y-px items-center gap-1 text-[11px] leading-none [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]">
        <span className="truncate font-semibold text-neutral-900">
          {language.name}
        </span>
        <span className="shrink-0 font-medium text-neutral-500">
          {language.level}
        </span>
      </span>
    </li>
  );
}

export function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-10 lg:self-start">
      <div className="mb-4 h-24 w-24 overflow-hidden rounded-full bg-neutral-200 ring-1 ring-black/5 sm:mb-5 sm:h-28 sm:w-28">
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={112}
          height={112}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-[2rem] sm:leading-tight">
        {profile.name}
      </h1>
      {profile.bio && (
        <p className="mt-2 max-w-[18rem] text-[14px] leading-snug text-neutral-600">
          {profile.bio}
        </p>
      )}
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {profile.cta && <CtaButton cta={profile.cta} variant="primary" />}
        {profile.ctaSecondary && (
          <CtaButton cta={profile.ctaSecondary} variant="secondary" />
        )}
      </div>
      <ul className="mt-5 space-y-2 text-[13px] leading-snug text-neutral-800 sm:text-[14px]">
        {profile.roles.map((role, roleIndex) => (
          <li key={role.label}>
            <span className="text-neutral-400" aria-hidden>
              ✦
            </span>{" "}
            <span
              className={
                roleIndex === 0
                  ? "font-semibold text-neutral-900"
                  : "text-neutral-800"
              }
            >
              {role.label}
            </span>
            {(role.detailParts?.length || role.detail) && (
              <>
                <br />
                <span className="text-[12px] text-neutral-500 sm:text-[13px]">
                  {role.detailParts?.length
                    ? role.detailParts.map((part, i) =>
                        isLink(part) ? (
                          <a
                            key={`${part.label}-${i}`}
                            href={part.url}
                            target={
                              part.url.startsWith("/") ? undefined : "_blank"
                            }
                            rel={
                              part.url.startsWith("/")
                                ? undefined
                                : "noopener noreferrer"
                            }
                            className={`font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-950 hover:decoration-neutral-500 ${focusRing} rounded-sm`}
                          >
                            {part.label}
                          </a>
                        ) : (
                          <span key={`t-${i}`}>
                            {part.split("\n").map((line, j) => (
                              <span key={j}>
                                {j > 0 && <br />}
                                {line}
                              </span>
                            ))}
                          </span>
                        ),
                      )
                    : role.detail}
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
      {profile.languages?.length ? (
        <div className="mt-4 max-w-[16rem]">
          <h2 className="mb-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
            Languages
          </h2>
          <ul className="grid grid-cols-2 gap-1">
            {profile.languages.map((language) => (
              <LanguageRow key={language.code} language={language} />
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
