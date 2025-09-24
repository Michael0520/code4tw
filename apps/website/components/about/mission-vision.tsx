'use client';

import { useTranslation } from 'react-i18next';
import { OrganizationDto } from '@/lib/features/about/actions';

interface MissionVisionProps {
  organization: OrganizationDto;
}

export function MissionVision({ organization }: MissionVisionProps) {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Mission */}
          <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{organization.mission.title}</h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <p className="leading-relaxed text-lg">
                  {organization.mission.description}
                </p>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {t('about.organizationDescription')}
                </h3>
                <p className="leading-relaxed">
                  {organization.description}
                </p>
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="rounded-lg border bg-gradient-to-r from-accent/5 to-secondary/5 border-accent/20 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">{organization.vision.title}</h2>
            <div className="text-center">
              <p className="leading-relaxed text-lg text-muted-foreground">
                {organization.vision.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}