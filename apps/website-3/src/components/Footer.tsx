import Link from 'next/link';
import {useTranslations} from 'next-intl';
import {Github, Twitter, Youtube, ExternalLink} from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">C4</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                code for taiwan
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-6">{t('tagline')}</p>

            {/* Social Links */}
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/codefortaiwan"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/codefortaiwan"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com/@codefortaiwan"
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wider">
              {t('projects.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/projects/g0v"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {t('projects.g0v')}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/vTaiwan"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {t('projects.vTaiwan')}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/democracy-tools"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {t('projects.democracy_tools')}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/transparency"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {t('projects.transparency')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wider">
              {t('community.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://slack.codefortaiwan.org"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                >
                  {t('community.slack')}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/codefortaiwan"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                >
                  {t('community.discord')}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {t('community.events')}
                </Link>
              </li>
              <li>
                <Link
                  href="/hackathons"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {t('community.hackathons')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wider">
              {t('resources.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://docs.codefortaiwan.org"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                >
                  {t('resources.docs')}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/codefortaiwan/awesome-taiwan"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                >
                  {t('resources.awesome_taiwan')}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {t('resources.contribute')}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
                >
                  {t('resources.blog')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            {t('copyright')}
          </div>

          <div className="flex space-x-6">
            <Link
              href="/contact"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t('links.contact')}
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t('links.privacy')}
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t('links.terms')}
            </Link>
            <Link
              href="/support"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {t('links.support')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
