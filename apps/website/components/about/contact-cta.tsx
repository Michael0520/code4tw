'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { OrganizationDto } from '@/lib/features/about/actions';
import { ABOUT_CONFIG } from '@/lib/features/about/config';

interface ContactCTAProps {
  organization: OrganizationDto;
}

export function ContactCTA({ organization }: ContactCTAProps) {
  const { t } = useTranslation();

  return (
    <section className="py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">{t('about.joinUs')}</h3>
            <p className="text-muted-foreground mb-6">
              {t('about.joinUsDescription')}
            </p>

            {/* Target Audiences */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {ABOUT_CONFIG.targetAudiences.map((audience) => (
                <span
                  key={audience.id}
                  className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium gap-1"
                >
                  <span>{audience.icon}</span>
                  {t(`about.audiences.${audience.id}`)}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link
                href="/projects"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t('common.viewMore')} {t('navigation.projects')}
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {t('events.register')} {t('navigation.events')}
              </Link>
            </div>

            {/* Contact Information */}
            {Object.keys(organization.contactInfo).length > 0 && (
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold mb-4">{t('about.getInTouch')}</h4>
                <div className="flex flex-wrap justify-center gap-4">
                  {Object.entries(organization.contactInfo).map(([platform, value]) => {
                    const channelConfig = ABOUT_CONFIG.contactChannels.find(
                      (channel) => channel.platform === platform
                    );

                    if (!channelConfig) return null;

                    const href = platform === 'email'
                      ? `mailto:${value}`
                      : platform === 'website'
                        ? `https://${value}`
                        : `${channelConfig.baseUrl}${value}`;

                    return (
                      <a
                        key={platform}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors text-sm"
                      >
                        <span>{channelConfig.icon}</span>
                        <span>{channelConfig.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}