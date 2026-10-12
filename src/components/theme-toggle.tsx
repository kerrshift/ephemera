"use client";

import { THEME_KEY, themeScript } from "@/lib/theme";

/**
 * The no-flash theme script. It runs from the server HTML before first paint; on the client the tag is
 * marked text/plain so React doesn't warn about rendering a <script> (Next.js "preventing flash" guide).
 */
export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}

/** Flips between light and dark and remembers the choice. Without a saved choice the site follows the system. */
export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const current = root.getAttribute("data-theme") ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  // Both icons are rendered; CSS shows the right one, so server and client markup always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="theme-toggle flex size-9 cursor-pointer items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-ink/40 hover:text-ink"
    >
      <svg className="i-moon size-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
      </svg>
      <svg className="i-sun size-[17px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
      </svg>
    </button>
  );
}
