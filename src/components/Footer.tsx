'use client';

import { useLang } from '@/contexts/lang-context';
import { content } from '@/lib/i18n';

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-white text-morpho-dark border-t border-gray-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <img
                src="/morpho-logo.png"
                alt="Morpho Foam"
                width={180}
                height={44}
                className="h-11 w-auto object-contain"
              />
              <span className="text-lg font-bold text-morpho-dark">Morpho Foam</span>
            </div>
            <p className="text-sm text-morpho-dark/60 leading-relaxed">
              {content.footer.brandDesc[lang]}
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-morpho-dark/90">
              {content.footer.contactTitle[lang]}
            </h4>
            <div className="space-y-2 text-sm text-morpho-dark/70">
              <p>
                <span className="text-morpho-dark/40">{content.footer.emailLabel[lang]}：</span>
                <a href="mailto:contact@amandalab.org" className="hover:text-morpho-dark transition-colors">
                  contact@amandalab.org
                </a>
              </p>
              <p>
                <span className="text-morpho-dark/40">{content.footer.addressLabel[lang]}：</span>
                <br />
                {content.footer.address[lang]}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-morpho-dark/90">
              {content.footer.quickLinksTitle[lang]}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="text-morpho-dark/70 hover:text-morpho-dark transition-colors">
                  {content.footer.linkProducts[lang]}
                </a>
              </li>
              <li>
                <a href="/faq" className="text-morpho-dark/70 hover:text-morpho-dark transition-colors">
                  {content.footer.linkFaq[lang]}
                </a>
              </li>
              <li>
                <a href="/about" className="text-morpho-dark/70 hover:text-morpho-dark transition-colors">
                  {content.footer.linkAbout[lang]}
                </a>
              </li>
            </ul>
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://shop591080667.taobao.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
                aria-label="Tmall"
              >
                <img
                  src="/icon-tmall.png"
                  alt="Tmall"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-md object-contain"
                />
              </a>
              <a
                href="https://www.xiaohongshu.com/user/profile/5bcd87eabffcf60001fba177"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:scale-105"
                aria-label="Xiaohongshu"
              >
                <img
                  src="/icon-xiaohongshu.png"
                  alt="Xiaohongshu"
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-md object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-xs text-morpho-dark/40">
          © 2026 AMANDA LAB · Morpho Foam. {content.footer.rights[lang]}
        </div>
      </div>
    </footer>
  );
}
