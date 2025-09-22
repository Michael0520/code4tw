import { describe, it, expect } from 'vitest'
import { getValidLocale, DEFAULT_LOCALE, extractLocaleFromPath, createLocalizedUrl } from '../locale-utils'

describe('Locale Utils', () => {
  describe('getValidLocale', () => {
    it('should return valid locale as is', () => {
      // Arrange & Act & Assert
      expect(getValidLocale('zh')).toBe('zh')
      expect(getValidLocale('en')).toBe('en')
    })

    it('should return default locale for invalid input', () => {
      // Arrange & Act & Assert
      expect(getValidLocale('fr')).toBe(DEFAULT_LOCALE)
      expect(getValidLocale('invalid')).toBe(DEFAULT_LOCALE)
      expect(getValidLocale('')).toBe(DEFAULT_LOCALE)
      expect(getValidLocale(undefined)).toBe(DEFAULT_LOCALE)
    })
  })

  describe('DEFAULT_LOCALE', () => {
    it('should be zh', () => {
      // Arrange & Act & Assert
      expect(DEFAULT_LOCALE).toBe('zh')
    })
  })

  describe('extractLocaleFromPath', () => {
    it('should extract locale from valid paths', () => {
      // Arrange & Act & Assert
      expect(extractLocaleFromPath('/zh')).toEqual({
        locale: 'zh',
        pathWithoutLocale: '/'
      })
      expect(extractLocaleFromPath('/en')).toEqual({
        locale: 'en',
        pathWithoutLocale: '/'
      })
      expect(extractLocaleFromPath('/zh/about')).toEqual({
        locale: 'zh',
        pathWithoutLocale: '/about'
      })
      expect(extractLocaleFromPath('/en/projects')).toEqual({
        locale: 'en',
        pathWithoutLocale: '/projects'
      })
    })

    it('should return default locale for invalid paths', () => {
      // Arrange & Act & Assert
      expect(extractLocaleFromPath('/')).toEqual({
        locale: DEFAULT_LOCALE,
        pathWithoutLocale: '/'
      })
      expect(extractLocaleFromPath('/fr')).toEqual({
        locale: DEFAULT_LOCALE,
        pathWithoutLocale: '/fr'
      })
      expect(extractLocaleFromPath('/invalid')).toEqual({
        locale: DEFAULT_LOCALE,
        pathWithoutLocale: '/invalid'
      })
    })
  })

  describe('createLocalizedUrl', () => {
    it('should create localized URLs correctly', () => {
      // Arrange & Act & Assert
      expect(createLocalizedUrl('/about', 'zh')).toBe('/zh/about')
      expect(createLocalizedUrl('/about', 'en')).toBe('/en/about')
      expect(createLocalizedUrl('about', 'zh')).toBe('/zh/about')
    })

    it('should handle invalid locales with default', () => {
      // Arrange & Act & Assert
      expect(createLocalizedUrl('/about', 'fr')).toBe('/zh/about')
      expect(createLocalizedUrl('/about', undefined)).toBe('/zh/about')
    })

    it('should not modify external URLs', () => {
      // Arrange & Act & Assert
      expect(createLocalizedUrl('https://example.com', 'zh')).toBe('https://example.com')
      expect(createLocalizedUrl('http://example.com', 'en')).toBe('http://example.com')
    })

    it('should normalize multiple slashes', () => {
      // Arrange & Act & Assert
      expect(createLocalizedUrl('//about', 'zh')).toBe('/zh/about')
      expect(createLocalizedUrl('/about//', 'zh')).toBe('/zh/about/')
    })
  })
})