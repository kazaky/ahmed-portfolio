import { site } from "@content/site";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { BentoSection } from "@/components/BentoSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  let itemIndex = 0;

  return (
    <div className="page-atmosphere relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow"
      >
        Skip to content
      </a>
      <main
        id="main"
        className="relative z-[1] mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:flex-row lg:gap-12 lg:px-8 lg:py-12"
      >
        <div className="w-full shrink-0 lg:w-[260px] xl:w-[300px]">
          <ProfileSidebar profile={site.profile} />
        </div>
        <div className="min-w-0 flex-1 pb-6">
          {site.sections.map((section) => {
            const sectionStart = itemIndex;
            itemIndex += section.items.length;
            return (
              <BentoSection
                key={section.id}
                section={section}
                startIndex={sectionStart}
              />
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
