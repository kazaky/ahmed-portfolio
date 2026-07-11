import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import type { Profile, ProfileCta, ProfileRoleLink } from "@/lib/types";

interface ProfileSidebarProps {
  profile: Profile;
}

function isLink(part: string | ProfileRoleLink): part is ProfileRoleLink {
  return typeof part === "object" && "url" in part;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2";

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
        "inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors",
        focusRing,
        variant === "primary"
          ? "bg-neutral-900 text-white shadow-sm hover:-translate-y-0.5 hover:bg-neutral-800 transition-transform"
          : "border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-50",
      ].join(" ")}
    >
      {isMail ? <Mail className="h-4 w-4" strokeWidth={2.25} aria-hidden /> : null}
      {cta.label}
      {!isMail && variant === "primary" ? (
        <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} aria-hidden />
      ) : null}
    </a>
  );
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
        {profile.cta && <CtaButton cta={profile.cta} variant="primary" />}
        {profile.ctaSecondary && (
          <CtaButton cta={profile.ctaSecondary} variant="secondary" />
        )}
        {profile.ctaTertiary && (
          <CtaButton cta={profile.ctaTertiary} variant="secondary" />
        )}
      </div>
      <ul className="mt-8 space-y-4 text-[14px] leading-relaxed text-neutral-800 sm:text-[15px]">
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
                <span className="text-neutral-500">
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
    </aside>
  );
}
