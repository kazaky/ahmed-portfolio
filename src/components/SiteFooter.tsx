export function SiteFooter() {
  return (
    <footer className="relative z-[1] border-t border-neutral-200/80 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ahmed Elshahawy · Berlin</p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://www.linkedin.com/in/shahawi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-800"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/kazaky"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-800"
          >
            GitHub
          </a>
          <a
            href="https://x.com/shahawi_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-800"
          >
            X
          </a>
          <a
            href="https://medium.com/@shahawi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-800"
          >
            Medium
          </a>
        </div>
      </div>
    </footer>
  );
}
