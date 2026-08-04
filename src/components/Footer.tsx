'use client';

import { useLang } from '@/contexts/lang-context';
import { content } from '@/lib/i18n';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-morpho-dark text-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img
                src="/morpho-logo.png"
                alt="闪蝶 Morpho Foam"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-lg font-bold">闪蝶 Morpho Foam</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              {content.footer.brandDesc[lang]}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              {content.footer.contactTitle[lang]}
            </h4>
            <div className="space-y-2 text-sm text-white/70">
              <p>
                <span className="text-white/50">{content.footer.emailLabel[lang]}：</span>
                <a href="mailto:amandalab2020@outlook.com" className="hover:text-white transition-colors">
                  amandalab2020@outlook.com
                </a>
              </p>
              <p>
                <span className="text-white/50">{content.footer.addressLabel[lang]}：</span>
                <br />
                {content.footer.address[lang]}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/90">
              {content.footer.quickLinksTitle[lang]}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="text-white/70 hover:text-white transition-colors">
                  {content.footer.linkProducts[lang]}
                </a>
              </li>
              <li>
                <a href="/faq" className="text-white/70 hover:text-white transition-colors">
                  {content.footer.linkFaq[lang]}
                </a>
              </li>
              <li>
                <a href="/about" className="text-white/70 hover:text-white transition-colors">
                  {content.footer.linkAbout[lang]}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-center text-xs text-white/50">
          © 2026 AMANDA LAB · 闪蝶 Morpho Foam. {content.footer.rights[lang]}
        </div>
      </div>
    </footer>
  );
}
