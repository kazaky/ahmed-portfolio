"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Camera,
  Code2,
  PenTool,
  MapPin,
  Layers3,
  BriefcaseBusiness,
  Aperture,
  Send,
  Trophy,
  Medal,
  Award,
  Fingerprint,
  KeyRound,
  ShieldCheck,
} from "lucide-react";
import type {
  LocationItem,
  SiteConfig,
  LinkItem,
  PhotoItem,
  ShotItem,
  AwardItem,
} from "@/lib/types";
import type { WorkEntry } from "@content/work";
import { ProductPromo } from "@/components/ProductPromo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ShotGallery } from "@/components/ShotGallery";
import { renderBoldText } from "@/lib/richText";
import { contactEmail } from "@content/site-url";

import { LocationCard } from "@/components/blocks/LocationCard";
import { iconSrc } from "@/lib/icons";

const languageFlags: Record<string, { file: string; country: string }> = {
  EN: { file: "gb", country: "United Kingdom" },
  AR: { file: "eg", country: "Egypt" },
  DE: { file: "de", country: "Germany" },
  FR: { file: "fr", country: "France" },
};

const perspectives = [
  {
    name: "Engineer",
    icon: Code2,
    image: "/avatar.jpg",
    alt: "Ahmed Elshahawy",
    caption: "Ahmed, usually making something.",
    note: "Care in every detail.",
    text: "At eBay and in my own products, I turn complex ideas into clear, reliable experiences people can use with confidence.",
  },
  {
    name: "Designer",
    icon: PenTool,
    image: "/dribbble/shot-3199857.png",
    alt: "Eleven, Ahmed’s Arabic clock widget design",
    caption: "Eleven / an Arabic take on time",
    note: "What if it felt different?",
    text: "I care how an idea feels in the hand: clear hierarchy, a useful detail, and a visual identity that feels like itself.",
  },
  {
    name: "Photographer",
    icon: Camera,
    image: "/photos/ig-5-Cb5ffD3sTG7.jpg",
    alt: "Ahmed’s street photograph in London",
    caption: "London / through my lens",
    note: "Look a little closer.",
    text: "I look for the human moment in the everyday—in a city street and in the details we nearly miss.",
  },
];

function Chapter({
  number,
  label,
  title,
  note,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  note?: string;
}) {
  return (
    <div className="chapter-head">
      <div>
        <p className="eyebrow">
          <span>{number}</span> {label}
        </p>
        <h2>{title}</h2>
      </div>
      {note && <p className="chapter-note">{note}</p>}
    </div>
  );
}

function CareerRow({
  item,
  work,
  current = false,
}: {
  item: LinkItem;
  work?: WorkEntry;
  current?: boolean;
}) {
  return (
    <details className={`career-row ${current ? "career-featured" : ""}`} open>
      <summary>
        <span className="career-logo">
          {work && ["felucca", "hitchhiker"].includes(work.slug) ? (
            <span className="career-logo-placeholder" aria-hidden="true">
              {work.title.slice(0, 1)}
            </span>
          ) : (
            work && <Image src={work.icon} alt="" width={48} height={48} />
          )}
        </span>
        <span className="career-name">
          <strong>
            {item.title}
            {current && (
              <span className="now-label">
                <i /> Now
              </span>
            )}
          </strong>
          <span>{item.roleTitle}</span>
        </span>
        <span className="career-date">{item.period}</span>
        <Plus className="career-plus" size={20} aria-hidden />
      </summary>
      <div className="career-body">
        <div className="career-detail-copy">
          <p>{work?.did ?? item.blurb}</p>
          {work?.highlights && (
            <ul>
              {work.highlights.map((h) => (
                <li key={h}>{renderBoldText(h)}</li>
              ))}
            </ul>
          )}
          {item.children && (
            <div className="career-projects">
              {item.children.map((child) => (
                <Link
                  key={child.id}
                  href={child.work ?? child.url}
                  className="career-project"
                >
                  <div className="career-project-heading">
                    {child.icon && (
                      <Image
                        src={iconSrc[child.icon]}
                        alt=""
                        width={32}
                        height={32}
                      />
                    )}
                    <strong>{child.title}</strong>
                    <ArrowUpRight size={16} />
                  </div>
                  {child.roleTitle && <span>{child.roleTitle}</span>}
                  {child.blurb && <p>{child.blurb}</p>}
                  {child.downloads && (
                    <small>
                      {child.downloads} {child.downloadsLabel ?? "downloads"}
                    </small>
                  )}
                </Link>
              ))}
            </div>
          )}
          <Link className="text-link" href={item.work ?? "#experience"}>
            Explore the work <ArrowUpRight size={15} />
          </Link>
        </div>
        {current && (
          <div className="identity-visual">
            <Image src="/icons/ebay.svg" alt="eBay" width={160} height={70} />
            <span>ANDROID IDENTITY</span>
            <div className="identity-core">
              <Fingerprint size={66} strokeWidth={1} />
            </div>
            <div className="identity-features">
              <span>
                <KeyRound size={20} />
                Sign-in
              </span>
              <span>
                <ShieldCheck size={20} />
                2FA
              </span>
              <span>
                <Fingerprint size={20} />
                Passkeys
              </span>
            </div>
            <p>Trust begins with the first interaction.</p>
          </div>
        )}
      </div>
    </details>
  );
}

export function PortfolioHome({
  site,
  work,
}: {
  site: SiteConfig;
  work: WorkEntry[];
}) {
  const [perspective, setPerspective] = useState(0);
  const profileItems = site.sections.find((s) => s.id === "links")?.items ?? [];
  const location = profileItems.find(
    (item): item is LocationItem => item.type === "location",
  );
  const socialLinks = profileItems.filter(
    (item): item is LinkItem => item.type === "link",
  );
  const active = perspectives[perspective];
  const products = site.sections.find((s) => s.id === "products")!
    .items as LinkItem[];
  const career = site.sections.find((s) => s.id === "experience")!
    .items as LinkItem[];
  const photos = site.sections.find((s) => s.id === "photographs")!
    .items as PhotoItem[];
  const shots = site.sections.find((s) => s.id === "dribbble")!
    .items as ShotItem[];
  const awards = site.sections.find((s) => s.id === "awards")!
    .items as AwardItem[];

  return (
    <div className="studio-home" id="top">
      <a className="studio-skip" href="#main">
        Skip to content
      </a>
      <header className="studio-nav">
        <a
          className="studio-signature"
          href="#top"
          aria-label="Ahmed Elshahawy, home"
        >
          <span className="signature-wordmark" aria-hidden="true">
            Ahmed Elshahawy
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#products">
            <Layers3 size={16} />
            <span>Products</span>
            <i>01</i>
          </a>
          <a href="#experience">
            <BriefcaseBusiness size={16} />
            <span>Experience</span>
            <i>02</i>
          </a>
          <a href="#photographs">
            <Aperture size={16} />
            <span>Through my lens</span>
            <i>03</i>
          </a>
        </nav>
        <a
          className="nav-hello"
          href={`mailto:${contactEmail}`}
          aria-label="Email Ahmed Elshahawy"
        >
          <span className="hello-icon">
            <Send size={17} />
          </span>
          <span>Let’s talk</span>
          <ArrowUpRight className="hello-arrow" size={16} />
        </a>
      </header>
      <main id="main">
        <section
          className="studio-hero studio-wrap"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <h1 id="hero-title">
              I create <em>wonderful</em>
              <br />
              digital experiences
              <br />
              with purpose.
              <svg className="hero-underline" viewBox="0 0 240 18" aria-hidden>
                <path d="M3 12 Q100 0 232 8 M25 17 Q125 6 215 12" />
              </svg>
            </h1>
            <p className="hero-description" aria-live="polite">
              {active.text}
            </p>
            <a className="studio-button" href="#products">
              Explore what I make <ArrowDown size={17} />
            </a>
          </div>
          <div className="hero-portrait-column">
            <div className={`hero-art perspective-${perspective}`}>
              <span className="orbit-line" aria-hidden />
              <span className="art-cross" aria-hidden>
                +
              </span>
              <span className="art-dot" aria-hidden />
              <div className="portrait-paper">
                <div className="portrait-window" key={active.image}>
                  <Image
                    src={active.image}
                    alt={active.alt}
                    fill
                    sizes="(max-width: 760px) 76vw, 390px"
                    preload={perspective === 0}
                  />
                </div>
                <div className="portrait-caption">
                  <span>{active.caption}</span>
                  <span>0{perspective + 1} / 03</span>
                </div>
              </div>
              <div className="curiosity-seal" aria-hidden>
                <span>STAY</span>
                <span className="seal-star">✳</span>
                <span>CURIOUS</span>
              </div>
              <span className="art-note">{active.note}</span>
              <span className="hero-coordinates">
                <MapPin size={12} /> Based in Berlin · Rooted in Arabic
              </span>
            </div>
            <div
              className="perspective-switch"
              aria-label="Explore my perspectives"
            >
              {perspectives.map(({ name, icon: Icon }, index) => (
                <button
                  key={name}
                  aria-pressed={perspective === index}
                  onClick={() => setPerspective(index)}
                >
                  <Icon size={15} />
                  {name}
                </button>
              ))}
            </div>
          </div>
        </section>
        <div className="studio-wrap">
          <div className="chapter-divider">
            <span>Engineering · Design · A different way of seeing</span>
            <span>
              Scroll to discover <ArrowDown size={13} />
            </span>
          </div>
        </div>

        <section
          className="studio-wrap personal-atlas"
          aria-label="About Ahmed"
        >
          <div className="atlas-map">
            <div className="atlas-label">
              <MapPin size={16} />
              <span>Where I call home</span>
            </div>
            {location && (
              <div className="atlas-map-image">
                <LocationCard item={location} />
              </div>
            )}
          </div>
          <div className="atlas-languages">
            <p className="eyebrow">A few ways to say hello</p>
            <h2>Languages I speak</h2>
            <dl>
              {site.profile.languages?.map((language) => (
                <div key={language.code}>
                  <dt>
                    {languageFlags[language.code] && (
                      <Image
                        className="language-flag"
                        src={`/icons/flags/${languageFlags[language.code].file}.svg`}
                        alt={`${languageFlags[language.code].country} flag`}
                        width={22}
                        height={15}
                      />
                    )}
                    {language.name}
                  </dt>
                  <dd>{language.level}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="atlas-connections">
            <p className="eyebrow">Elsewhere on the internet</p>
            <div className="atlas-socials">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.icon && (
                    <Image
                      src={iconSrc[item.icon]}
                      alt=""
                      width={22}
                      height={22}
                    />
                  )}
                  {item.title}
                  <ArrowUpRight size={15} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="studio-wrap studio-section">
          <Chapter
            number="01"
            label="Independent creations"
            title={
              <>
                Built from belief.
                <br />
                <em>Made for real life.</em>
              </>
            }
            note="Independent products shaped by my faith, language, and everyday life. Built end to end, from the first idea to the experience you use."
          />
          <div className="product-gallery">
            {products
              .filter(
                (item) => item.id !== "arabic-watch" && item.id !== "firdawsi",
              )
              .map((item) => {
                const entry = work.find((w) => w.slug === item.id)!;
                return (
                  <article
                    className={`product-project project-${item.id}`}
                    key={item.id}
                  >
                    <ProductPromo
                      slug={item.id}
                      title={item.title}
                      description={entry.did}
                      href={item.work!}
                    />
                    <div className="project-info">
                      <div className="project-name">
                        <Image src={entry.icon} alt="" width={36} height={36} />
                        <div>
                          <h3>
                            <Link href={item.work!}>{item.title}</Link>
                          </h3>
                          <p>{item.blurb}</p>
                        </div>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-visit"
                        aria-label={`Visit ${item.title}`}
                      >
                        <ArrowUpRight size={21} />
                      </a>
                    </div>
                  </article>
                );
              })}
          </div>
        </section>

        {(() => {
          const firdawsi = work.find((entry) => entry.slug === "firdawsi");
          if (!firdawsi) return null;
          return (
            <section
              className="studio-wrap firdawsi-feature"
              id="firdawsi"
              aria-labelledby="firdawsi-title"
            >
              <div className="firdawsi-copy">
                <p className="eyebrow">A design language with intention</p>
                <h2 id="firdawsi-title">
                  Firdawsi
                  <br />
                  <em>Gardens of light.</em>
                </h2>
                <p>{firdawsi.did}</p>
                <div className="firdawsi-tools">
                  <span>Specification</span>
                  <span>Design tokens</span>
                  <span>React components</span>
                  <span>Arabic + English</span>
                </div>
                <div className="firdawsi-links">
                  <a
                    className="text-link"
                    href={firdawsi.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Explore Firdawsi.org <ArrowUpRight size={16} />
                  </a>
                  <Link className="text-link" href="/work/firdawsi">
                    Read the project <ArrowRight size={16} />
                  </Link>
                  <a
                    className="text-link"
                    href="https://github.com/kazaky/firdawsi"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source on GitHub <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              <a
                className="firdawsi-preview"
                href={firdawsi.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Firdawsi.org"
              >
                <Image
                  src={firdawsi.preview}
                  alt="Firdawsi design system preview: Gardens of light, seven principles, three themes, and two text directions."
                  fill
                  sizes="(max-width: 760px) 100vw, 55vw"
                />
              </a>
            </section>
          );
        })()}

        <section id="experience" className="career-section">
          <div className="studio-wrap career-layout">
            <div className="career-intro">
              <p className="eyebrow">
                <span>02</span> The professional chapters
              </p>
              <h2>
                Engineering at scale.
                <br />
                <em>Impact through craft.</em>
              </h2>
              <p>
                From early Android experiments to the systems people rely on
                every day. A journey through building, learning, and helping
                teams do their best work.
              </p>
              <a
                className="text-link"
                href="https://www.linkedin.com/in/shahawi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn <ArrowUpRight size={16} />
              </a>
              <div className="career-disciplines">
                <span>
                  <Code2 size={18} />
                  Android engineering
                </span>
                <span>
                  <Layers3 size={18} />
                  Design systems
                </span>
                <span>
                  <ShieldCheck size={18} />
                  Identity & trust
                </span>
              </div>
            </div>
            <ol className="career-list experience-timeline">
              {career.map((item, index) => (
                <li key={item.id} className="timeline-entry">
                  <div className="timeline-marker">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item.period}</p>
                  </div>
                  <CareerRow
                    item={item}
                    work={work.find((w) => w.slug === item.id)}
                    current={item.id === "ebay"}
                  />
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="studio-wrap honors-section"
          aria-label="Awards and recognition"
        >
          <p className="eyebrow">A few moments of recognition</p>
          <div className="honors-grid">
            {awards.map((award) => (
              <div key={award.id} className="honor">
                <span
                  className={`honor-medallion award-${award.place}`}
                  aria-hidden
                >
                  {award.place === "top100" ? (
                    <Trophy size={29} strokeWidth={1.5} />
                  ) : award.place === "2nd" ? (
                    <Medal size={29} strokeWidth={1.5} />
                  ) : (
                    <Award size={29} strokeWidth={1.5} />
                  )}
                </span>
                <div>
                  <span>
                    {award.year} / {award.org}
                  </span>
                  <h3>
                    {award.place === "top100" ? "" : `${award.place} place · `}
                    {award.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          className="studio-wrap studio-section design-section"
          id="dribbble"
        >
          <Chapter
            number="03"
            label="Selected design work"
            title={
              <>
                Interfaces, icons,
                <br />
                <em>and a point of view.</em>
              </>
            }
            note="My work in interface and visual design: expressive identities, considered interactions, and details that make a product feel like itself."
          />
          <ShotGallery shots={shots} />
          <a
            className="text-link gallery-link"
            href="https://dribbble.com/shahawi"
            target="_blank"
            rel="noopener noreferrer"
          >
            More from my design sketchbook <ArrowUpRight size={16} />
          </a>
        </section>

        <section id="photographs" className="photo-room">
          <div className="studio-wrap">
            <Chapter
              number="04"
              label="Life outside the frame"
              title={
                <>
                  Same curiosity.
                  <br />
                  <em>Different lens.</em>
                </>
              }
              note="My photographs of streets and the people who give them life. Berlin, London, and moments between."
            />
            <PhotoGallery photos={photos} />
            <div className="photo-footer">
              <span>
                <Camera size={15} /> Photographs by Ahmed Elshahawy
              </span>
              <a
                className="text-link"
                href="https://www.instagram.com/discover.streets/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @discover.streets <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="studio-wrap studio-contact" id="contact">
          <div>
            <p className="eyebrow">
              <span lang="ar" dir="rtl">
                نتواصل؟
              </span>{" "}
              Let’s connect
            </p>
            <h2>
              Good things start
              <br />
              with a <em>hello.</em>
              <span className="contact-star" aria-hidden>
                ✳
              </span>
            </h2>
            <a className="contact-email" href={`mailto:${contactEmail}`}>
              {contactEmail}
              <ArrowUpRight size={25} />
            </a>
          </div>
          <div className="contact-side">
            <p>
              Have something in mind?
              <br />
              An idea, a conversation, a different perspective—I’d love to hear
              it.
            </p>
            <div className="contact-socials">
              {[
                { name: "GitHub", url: "https://github.com/kazaky" },
                {
                  name: "LinkedIn",
                  url: "https://www.linkedin.com/in/shahawi",
                },
                { name: "Medium", url: "https://medium.com/@shahawi" },
                { name: "X", url: "https://x.com/shahawi_" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.name}
                  <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
            <div className="language-note">
              {site.profile.languages?.map((l) => (
                <span key={l.code} title={`${l.name}: ${l.level}`}>
                  {l.name}
                </span>
              ))}
            </div>
            <ThemeToggle />
          </div>
        </section>
      </main>
      <footer className="studio-wrap studio-footer">
        <span>© {new Date().getFullYear()} Ahmed Elshahawy</span>
        <span>Made with care. And a little curiosity.</span>
        <a href="#top">
          Back to the top <ArrowRight size={14} />
        </a>
      </footer>
    </div>
  );
}
