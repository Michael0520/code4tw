import {hasLocale} from 'next-intl';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

/**
 * Create a getRequestConfig function with custom message loader
 * @param messagesLoader - Function that loads messages for a given locale
 */
export function createRequestConfig(
  messagesLoader: (locale: string) => Promise<any>
) {
  return getRequestConfig(async ({requestLocale}) => {
    // Typically corresponds to the `[locale]` segment
    const requested = await requestLocale;
    const locale = hasLocale(routing.locales, requested)
      ? requested
      : routing.defaultLocale;

    return {
      locale,
      messages: await messagesLoader(locale)
    };
  });
}

/**
 * Default request config for apps with messages in /messages directory
 * Usage in app: export default from '@repo/i18n/request';
 */
export default getRequestConfig(async ({requestLocale}) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    // This assumes messages are in the app's /messages directory
    // Apps can override this by using createRequestConfig
    messages: (await import(`../../../apps/website/messages/${locale}.json`))
      .default
  };
});
