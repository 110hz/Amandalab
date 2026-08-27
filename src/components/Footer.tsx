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
                alt="Morpho Foam"
                width={48}
                height={48}
                className="h-12 w-12 object-contain object-left"
              />
              <span className="text-lg font-bold">Morpho Foam</span>
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
                <a href="mailto:contact@amandalab.org" className="hover:text-white transition-colors">
                  contact@amandalab.org
                </a>
              </p>
              <p>
                <span className="text-white/50">{content.footer.addressLabel[lang]}：</span>
                <br />
                {content.footer.address[lang]}
              </p>
              {/* Social Links */}
              <div className="mt-5 flex items-center gap-3">
                <a
                  href="https://shop591080667.taobao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Tmall"
                >
                  <span className="text-xs font-bold text-white">天猫</span>
                </a>
                <a
                  href="https://www.xiaohongshu.com/user/profile/5bcd87eabffcf60001fba177"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Xiaohongshu"
                >
                  <span className="text-xs font-bold text-white">小红书</span>
                </a>
              </div>
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
