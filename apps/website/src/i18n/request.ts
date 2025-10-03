import {createRequestConfig} from '@repo/i18n/request';

// Custom message loader for this app
export default createRequestConfig(async (locale) => {
  return (await import(`../../messages/${locale}.json`)).default;
});
