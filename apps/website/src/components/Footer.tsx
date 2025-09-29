'use client';

import Link from 'next/link';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {
  Facebook,
  MessageCircle,
  Calendar,
  Mail,
  ExternalLink,
  Youtube,
  Instagram
} from 'lucide-react';
import {usePostHog} from '@/hooks/usePostHog';
import {siteConfig} from '@/config/site';

export function Footer() {
  const t = useTranslations('Footer');
  const {trackSocialClick} = usePostHog();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo and Tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Image
                src="/logo-full.svg"
                alt="Code for Taiwan"
                width={200}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-gray-600 text-sm mb-6">{t('tagline')}</p>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wider">
              {t('community.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                  onClick={() => trackSocialClick('Facebook', 'footer')}
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.social.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Threads
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.social.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                  onClick={() => trackSocialClick('Discord', 'footer')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t('community.discord')}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.social.events}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
                  onClick={() => trackSocialClick('Events', 'footer')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('community.events')}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wider">
              {t('links.contact')}
            </h3>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm flex items-center"
            >
              <Mail className="w-4 h-4 mr-2" />
              {siteConfig.contact.email}
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            {t('copyright')}
          </div>

          <div className="flex space-x-6">
            <span className="text-sm text-gray-500">{t('links.privacy')}</span>
            <span className="text-sm text-gray-500">{t('links.terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
