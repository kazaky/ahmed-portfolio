"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Camera,
  Code2,
  PenTool,
  MapPin,
} from "lucide-react";
import type {
  SiteConfig,
  LinkItem,
  PhotoItem,
  ShotItem,
  AwardItem,
} from "@/lib/types";
import type { WorkEntry } from "@content/work";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PhotoGallery } from "@/components/PhotoGallery";
import { ShotGallery } from "@/components/ShotGallery";
import { renderBoldText } from "@/lib/richText";
import { contactEmail } from "@content/site-url";

const perspectives = [
  {
    name: "Engineer",
    icon: Code2,
    image: "/avatar.jpg",
    alt: "Ahmed Elshahawy",
    caption: "Ahmed, usually making something.",
    note: "Care in every detail.",
    text: "Staff Software Engineer at eBay. I build thoughtful digital experiences—and Arabic & Islamic tools that bring a little more meaning to everyday life.",
  },
  {
    name: "Designer",
    icon: PenTool,
    image: "/dribbble/shot-3199857.png",
    alt: "Eleven, Ahmed’s Arabic clock widget design",
    caption: "Eleven / an Arabic take on time",
    note: "What if it felt different?",
    text: "I like the space where engineering meets design. A small interaction, a familiar word, a well-placed detail: that’s where a useful thing starts to feel personal.",
  },
  {
    name: "Photographer",
    icon: Camera,
    image: "/photos/ig-5-Cb5ffD3sTG7.jpg",
    alt: "Ahmed’s street photograph in London",
    caption: "London / through my lens",
    note: "Look a little closer.",
    text: "Away from the screen, I explore with a camera. Street photography is another way to be curious about people, places, and the ordinary moments worth noticing.",
  },
];
const productLabels: Record<string, string> = {
  misho: "Faith & daily rhythm",
  tawazun: "Ideas & perspective",
  "iqrar-dayn": "Clarity & trust",
  loqmaan: "Arabic wisdom",
  "arabic-watch": "Language & time",
};

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
    <details className="career-row" open={current || undefined}>
      <summary>
        <span className="career-logo">
          {work && <Image src={work.icon} alt="" width={48} height={48} />}
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
        <p>{work?.did ?? item.blurb}</p>
        {work?.highlights && (
          <ul>
            {work.highlights.slice(0, 3).map((h) => (
              <li key={h}>{renderBoldText(h)}</li>
            ))}
          </ul>
        )}
        {item.children && (
          <div className="career-brands">
            {item.children.map((child) => (
              <Link key={child.id} href={child.work ?? "#experience"}>
                {child.title}
                <ArrowUpRight size={13} />
              </Link>
            ))}
          </div>
        )}
        <Link className="text-link" href={item.work ?? "#experience"}>
          Explore the work <ArrowUpRight size={15} />
        </Link>
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
  const [showEarlier, setShowEarlier] = useState(false);
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
          ahmed
          <span className="signature-star" aria-hidden>
            ✳
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#products">Selected work</a>
          <a href="#experience">The journey</a>
          <a href="#photographs">Off-screen</a>
        </nav>
        <a className="nav-hello" href={`mailto:${contactEmail}`}>
          Say hello <ArrowUpRight size={16} />
        </a>
      </header>
      <main id="main">
        <section
          className="studio-hero studio-wrap"
          aria-labelledby="hero-title"
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="hello-arabic" lang="ar" dir="rtl">
                أهلًا
              </span>{" "}
              I’m Ahmed Elshahawy
            </p>
            <h1 id="hero-title">
              A curious mind.
              <br />A maker’s <em>heart.</em>
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
        </section>
        <div className="studio-wrap">
          <div className="chapter-divider">
            <span>Engineering · Design · A different way of seeing</span>
            <span>
              Scroll to discover <ArrowDown size={13} />
            </span>
          </div>
        </div>

        <section id="products" className="studio-wrap studio-section">
          <Chapter
            number="01"
            label="Independent creations"
            title={
              <>
                Small ideas.
                <br />
                <em>Meaningful worlds.</em>
              </>
            }
            note="Things I’ve built for the way we plan, read, reflect, and connect. A little of me lives in each one."
          />
          <div className="product-gallery">
            {products.map((item, index) => {
              const entry = work.find((w) => w.slug === item.id)!;
              return (
                <article
                  className={`product-project project-${item.id}`}
                  key={item.id}
                >
                  <Link
                    className="project-stage"
                    href={item.work!}
                    aria-label={`Explore ${item.title}`}
                  >
                    <div className="stage-label">
                      <span>{productLabels[item.id]}</span>
                      <span>0{index + 1}</span>
                    </div>
                    <div className="browser-sheet">
                      <div className="browser-chrome" aria-hidden>
                        <i />
                        <i />
                        <i />
                        <span>{item.domain}</span>
                      </div>
                      <div className="project-image">
                        <Image
                          src={item.preview!}
                          alt={`${item.title} website screenshot`}
                          width={1280}
                          height={720}
                          sizes="(max-width: 700px) 100vw, 650px"
                        />
                      </div>
                    </div>
                    <span className="project-open">
                      <ArrowUpRight size={20} />
                    </span>
                  </Link>
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

        <section id="experience" className="career-section">
          <div className="studio-wrap career-layout">
            <div className="career-intro">
              <p className="eyebrow">
                <span>02</span> The professional chapters
              </p>
              <h2>
                Good work.
                <br />
                <em>Good company.</em>
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
              <div className="career-doodle" aria-hidden>
                <span>learn</span>
                <svg viewBox="0 0 150 70">
                  <path d="M10 42 C35 -10 90 5 95 35 S45 85 48 35 S115 5 140 39 M128 31 L141 40 L143 24" />
                </svg>
                <span>make. repeat.</span>
              </div>
            </div>
            <div className="career-list">
              {career.slice(0, 3).map((item) => (
                <CareerRow
                  key={item.id}
                  item={item}
                  work={work.find((w) => w.slug === item.id)}
                  current={item.id === "ebay"}
                />
              ))}
              <div id="earlier-chapters" hidden={!showEarlier}>
                {career.slice(3).map((item) => (
                  <CareerRow
                    key={item.id}
                    item={item}
                    work={work.find((w) => w.slug === item.id)}
                  />
                ))}
              </div>
              <button
                className="earlier-button"
                aria-expanded={showEarlier}
                aria-controls="earlier-chapters"
                onClick={() => setShowEarlier(!showEarlier)}
              >
                {showEarlier
                  ? "Close earlier chapters"
                  : `Explore earlier chapters (${career.length - 3})`}
                {showEarlier ? <Minus size={17} /> : <Plus size={17} />}
              </button>
            </div>
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
                <span className="honor-star" aria-hidden>
                  ✺
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
            label="The visual playground"
            title={
              <>
                Always exploring
                <br />
                <em>another possibility.</em>
              </>
            }
            note="Interfaces, icons, and experiments from my design sketchbook. Some ideas begin with a line of code. Others begin with a shape."
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
