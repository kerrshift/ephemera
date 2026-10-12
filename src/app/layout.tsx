import type { Metadata, Viewport } from "next";
import { Anton, Bricolage_Grotesque, Caveat, Courier_Prime, Fraunces, Geist, IBM_Plex_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeScript, ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import "./globals.css";
import "@/registry/ephemera/paper.css";

const body = Geist({ variable: "--font-body", subsets: ["latin"] });
const heading = Bricolage_Grotesque({ variable: "--font-heading", subsets: ["latin"], axes: ["opsz", "wdth"] });
const display = Fraunces({ variable: "--font-display", subsets: ["latin"], style: ["normal", "italic"], axes: ["SOFT", "opsz"] });
const receipt = IBM_Plex_Mono({ variable: "--font-receipt", subsets: ["latin"], weight: ["400", "700"] });
const type = Courier_Prime({ variable: "--font-type", subsets: ["latin"], weight: ["400", "700"] });
const hand = Caveat({ variable: "--font-hand", subsets: ["latin"] });
const stamp = Anton({ variable: "--font-stamp", subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  // creator credit lives in metadata and structured data only, not in the visible page
  authors: [{ name: site.creator.name, url: site.creator.url }, { name: site.org.name, url: site.org.url }],
  creator: site.creator.name,
  publisher: site.org.name,
  category: "technology",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f3ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0d10" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${body.variable} ${heading.variable} ${display.variable} ${receipt.variable} ${type.variable} ${hand.variable} ${stamp.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span aria-hidden className="size-[18px] -rotate-6 rounded-[3px] bg-accent shadow-[2px_2px_0_var(--highlight)]" />
            <span className="font-head text-[23px] font-bold leading-none tracking-[-0.04em]">ephemera</span>
            <span className="hidden text-[11px] uppercase tracking-[0.2em] text-muted sm:inline" style={{ fontFamily: "var(--font-type)" }}>
              paper components
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm sm:gap-5">
            <Link href="/components/paper-theme" className="text-muted transition-colors hover:text-ink">
              Docs
            </Link>
            <Link href="/#core" className="hidden text-muted transition-colors hover:text-ink sm:inline">
              Core
            </Link>
            <Link href="/#extras" className="hidden text-muted transition-colors hover:text-ink sm:inline">
              Extras
            </Link>
            <a
              href={site.repo}
              aria-label="Ephemera on GitHub"
              className="flex size-9 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-ink/40 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-[17px]" fill="currentColor" aria-hidden>
                <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
              </svg>
            </a>
            <ThemeToggle />
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-24 border-t border-line">
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr]">
            <div>
              <Link href="/" className="inline-flex items-center gap-2.5">
                <span aria-hidden className="size-[16px] -rotate-6 rounded-[3px] bg-accent shadow-[2px_2px_0_var(--highlight)]" />
                <span className="font-head text-[21px] font-bold leading-none tracking-[-0.04em]">ephemera</span>
              </Link>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                A paper design system for React. Free and open source under the MIT license, and installable with the
                shadcn CLI.
              </p>
              <nav aria-label="Footer" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <Link href="/components/paper-theme" className="text-muted transition-colors hover:text-ink">
                  Docs
                </Link>
                <Link href="/#core" className="text-muted transition-colors hover:text-ink">
                  Core
                </Link>
                <Link href="/#extras" className="text-muted transition-colors hover:text-ink">
                  Extras
                </Link>
                <a href="/llms.txt" className="text-muted transition-colors hover:text-ink">
                  llms.txt
                </a>
                <a href={site.repo} className="text-muted transition-colors hover:text-ink">
                  GitHub
                </a>
              </nav>
            </div>

            <a
              href="https://kerrshift.com/"
              className="group block self-start rounded-xl border border-line bg-card p-5 transition-colors hover:border-ink/40"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-muted" style={{ fontFamily: "var(--font-type)" }}>
                Part of
              </p>
              <p className="mt-2 flex items-center justify-between gap-3 font-head text-[26px] font-bold leading-none tracking-[-0.03em]">
                KerrShift
                <span aria-hidden className="text-[18px] text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent">
                  ↗
                </span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Ephemera is made by KerrShift, an applied intelligence lab building instruments for autonomous software.
              </p>
              <p className="mt-3 text-sm font-medium text-accent">kerrshift.com</p>
            </a>
          </div>
          <div className="mx-auto flex w-full max-w-6xl flex-col justify-between gap-2 border-t border-line px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:px-6">
            <span>© KerrShift. Ephemera is MIT licensed.</span>
            <span style={{ fontFamily: "var(--font-hand)" }} className="text-base">
              printed, torn &amp; stamped by hand
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
