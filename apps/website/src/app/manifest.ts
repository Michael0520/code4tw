import {MetadataRoute} from 'next';
import {getTranslations} from 'next-intl/server';
import {routing} from '@repo/i18n/routing';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations({
    locale: routing.defaultLocale,
    namespace: 'Manifest'
  });

  return {
    name: t('name'),
    short_name: 'Code4TW',
    description: t('name'),
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000095',
    icons: [
      {
        src: '/logo-square.svg',
        sizes: '208x208',
        type: 'image/svg+xml',
        purpose: 'maskable'
      },
      {
        src: '/logo-square.svg',
        sizes: '192x192',
        type: 'image/svg+xml'
      },
      {
        src: '/logo-square.svg',
        sizes: '512x512',
        type: 'image/svg+xml'
      }
    ]
  };
}
