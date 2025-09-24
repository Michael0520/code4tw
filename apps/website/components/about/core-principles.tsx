'use client';

import { useTranslation } from 'react-i18next';
import { OrganizationPrincipleDto } from '@/lib/features/about/actions';
import { FeatureGrid } from '@/components/shared/feature-grid';

interface CorePrinciplesProps {
  principles: OrganizationPrincipleDto[];
}

export function CorePrinciples({ principles }: CorePrinciplesProps) {
  const { t } = useTranslation();

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