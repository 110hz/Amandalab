import { type Lang, content } from '@/lib/i18n';

export default function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-border/50 bg-cream py-10 px-6">
      <div className="mx-auto max-w-6xl text-center">
        {/* Logo */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <img
            src="/morpho-logo.png"
            alt="AMANDA LAB Logo"
            width={22}
            height={22}
            className="h-5 w-5"
          />
          <span className="text-sm font-bold text-text-main">AMANDA LAB</span>
        </div>
        <p className="mb-2 text-xs text-text-muted">
          {content.footer.tagline[lang]}
        </p>
        <p className="text-xs text-text-muted/60">
          © 2026 AMANDA LAB. {content.footer.rights[lang]}.
        </p>
      </div>
    </footer>
  );
}
