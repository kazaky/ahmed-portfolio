import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import type { Profile, ProfileRoleLink } from "@/lib/types";

interface ProfileSidebarProps {
  profile: Profile;
}

function isLink(part: string | ProfileRoleLink): part is ProfileRoleLink {
  return typeof part === "object" && "url" in part;
}

export function ProfileSidebar({ profile }: ProfileSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-10 lg:self-start">
      <div className="mb-7 h-28 w-28 overflow-hidden rounded-full bg-neutral-200 ring-1 ring-black/5 sm:mb-8 sm:h-32 sm:w-32">
        <Image
          src={profile.avatar}
          alt={profile.name}
          width={128}
          height={128}
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
        {profile.name}
      </h1>
      {profile.bio && (
        <p className="mt-3 max-w-[18rem] text-[15px] leading-relaxed text-neutral-600">
          {profile.bio}
        </p>
      )}
      <div className="mt-5 flex flex-wrap gap-2">
        {profile.cta && (
          <a
            href={profile.cta.url}
            target={profile.cta.url.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              profile.cta.url.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            {profile.cta.label}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
          </a>
        )}
        {profile.ctaSecondary && (
          <a
            href={profile.ctaSecondary.url}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 transition-colors hover:bg-neutral-50"
          >
            {profile.ctaSecondary.url.startsWith("mailto:") ? (
              <Mail className="h-4 w-4" strokeWidth={2.25} />
            ) : null}
            {profile.ctaSecondary.label}
          </a>
        )}
      </div>
      <ul className="mt-8 space-y-4 text-[14px] leading-relaxed text-neutral-800 sm:text-[15px]">
        {profile.roles.map((role, roleIndex) => (
          <li key={role.label}>
            <span className="text-neutral-400">✦</span>{" "}
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
                <span className="text-neutral-500">
                  {role.detailParts?.length
                    ? role.detailParts.map((part, i) =>
                        isLink(part) ? (
                          <a
                            key={`${part.label}-${i}`}
                            href={part.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-neutral-700 underline decoration-neutral-300 underline-offset-2 transition-colors hover:text-neutral-950 hover:decoration-neutral-500"
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
    </aside>
  );
}
