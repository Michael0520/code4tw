'use client';

import { useTranslation } from 'react-i18next';
import { CoreValueDto } from '@/lib/features/about/actions';
import { FeatureGrid } from '@/components/shared/feature-grid';

interface CoreValuesProps {
  values: CoreValueDto[];
}

export function CoreValues({ values }: CoreValuesProps) {
  const { t } = useTranslation();

  return (
    <FeatureGrid
      title={t('about.values.title')}
      description={t('about.valuesDescription')}
      items={values}
      columns={4}
      showPriority={false}
      sectionClassName="py-16 bg-muted/30"
      iconBackgroundClassName="bg-accent/10"
    />
  );
}