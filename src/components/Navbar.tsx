'use client';

import { useState, useEffect } from 'react';
import { type Lang, content } from '@/lib/i18n';

const navLinks = [
  { key: 'home' as const, href: '#home' },
  { key: 'products' as const, href: '#products' },
  { key: 'faq' as const, href: '#faq' },
  { key: 'about' as const, href: '#about' },
];

export default function Navbar({
  lang,
  onLangChange,
}: {
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <img
              src="/morpho-logo.png"
              alt="AMANDA LAB Logo"
              width={28}
              height={28}
              className="h-7 w-7"
            />
            <span className="text-lg font-bold tracking-tight text-text-main">
              AMANDA LAB
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-text-muted transition-colors hover:text-morpho"
              >
                {content.nav[link.key][lang]}
              </a>
            ))}
            {/* Language Switch */}
            <div className="flex overflow-hidden rounded-full border border-border">
              <button
                onClick={() => onLangChange('zh')}
                className={`px-3 py-1 text-xs font-medium transition-all ${
                  lang === 'zh'
                    ? 'bg-morpho text-white'
                    : 'bg-white text-text-muted hover:text-morpho'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => onLangChange('en')}
                className={`px-3 py-1 text-xs font-medium transition-all ${
                  lang === 'en'
                    ? 'bg-morpho text-white'
                    : 'bg-white text-text-muted hover:text-morpho'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t border-border bg-white pb-4 md:hidden">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-medium text-text-muted transition-colors hover:text-morpho"
              >
                {content.nav[link.key][lang]}
              </a>
            ))}
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => { onLangChange('zh'); setMobileOpen(false); }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  lang === 'zh' ? 'bg-morpho text-white' : 'bg-muted text-text-muted'
                }`}
              >
                中文
              </button>
              <button
                onClick={() => { onLangChange('en'); setMobileOpen(false); }}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  lang === 'en' ? 'bg-morpho text-white' : 'bg-muted text-text-muted'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
