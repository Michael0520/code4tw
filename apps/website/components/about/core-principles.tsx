'use client';

import { useTranslations } from 'next-intl';
import { OrganizationPrincipleDto } from '@/lib/features/about/actions';
import { FeatureGrid } from '@/components/shared/feature-grid';

interface CorePrinciplesProps {
  principles: OrganizationPrincipleDto[];
}

export function CorePrinciples({ principles }: CorePrinciplesProps) {
  const t = useTranslations();

  return (
    <FeatureGrid
      title={t('about.corePrinciples')}
      description={t('about.corePrinciplesDescription')}
      items={principles}
      columns={4}
      showPriority={true}
      sectionClassName="py-16"
      iconBackgroundClassName="bg-primary/10"
    />
  );
}