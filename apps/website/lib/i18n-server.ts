// 服務器端 i18n 工具 - 用於 SSG
import { resources } from './i18n-resources';

export type Locale = 'en' | 'zh';

// 服務器端翻譯函數
export function getTranslations(locale: Locale) {
  const translations = resources[locale]?.translation || resources.en.translation;

  return function t(key: string): string {
    const keys = key.split('.');
    let value: unknown = translations;

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }

    return typeof value === 'string' ? value : key;
  };
}

// 獲取 metadata
export function getMetadata(locale: Locale) {
  const t = getTranslations(locale);

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
  };
}