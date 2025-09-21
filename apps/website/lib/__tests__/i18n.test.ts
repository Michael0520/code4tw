import { describe, it, expect, vi } from 'vitest'
import { useTranslation, translations, type Language } from '../i18n'

describe('i18n Translation System', () => {
  describe('useTranslation', () => {
    it('should return correct Chinese translation for valid key', () => {
      // Arrange
      const { t } = useTranslation('zh')

      // Act
      const result = t('nav.home')

      // Assert
      expect(result).toBe('首頁')
    })

    it('should return correct English translation for valid key', () => {
      // Arrange
      const { t } = useTranslation('en')

      // Act
      const result = t('nav.home')

      // Assert
      expect(result).toBe('Home')
    })

    it('should return key name as fallback for missing translation', () => {
      // Arrange
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const { t } = useTranslation('zh')

      // Act
      const result = t('non.existent.key')

      // Assert
      expect(result).toBe('non.existent.key')
      expect(consoleSpy).toHaveBeenCalledWith('Translation missing for key: non.existent.key')

      consoleSpy.mockRestore()
    })

    it('should return language parameter correctly', () => {
      // Arrange & Act
      const zhTranslation = useTranslation('zh')
      const enTranslation = useTranslation('en')

      // Assert
      expect(zhTranslation.language).toBe('zh')
      expect(enTranslation.language).toBe('en')
    })

    it('should handle complex translation keys correctly', () => {
      // Arrange
      const { t } = useTranslation('zh')

      // Act & Assert
      expect(t('hero.title')).toBe('用科技改變')
      expect(t('hero.title.highlight')).toBe('台灣社會')
      expect(t('hero.description')).toBe('Code for Taiwan 是一個開放的公民科技社群，匯聚開發者、設計師與公民，共同打造數位解決方案，讓政府更透明、社會更美好。')
    })

    it('should handle navigation translations correctly', () => {
      // Arrange
      const { t: tZh } = useTranslation('zh')
      const { t: tEn } = useTranslation('en')

      // Act & Assert
      expect(tZh('nav.projects')).toBe('專案')
      expect(tEn('nav.projects')).toBe('Projects')
      expect(tZh('nav.events')).toBe('活動')
      expect(tEn('nav.events')).toBe('Events')
    })

    it('should handle project-specific translations correctly', () => {
      // Arrange
      const { t: tZh } = useTranslation('zh')
      const { t: tEn } = useTranslation('en')

      // Act & Assert
      expect(tZh('projects.vtaiwan.title')).toBe('vTaiwan')
      expect(tEn('projects.vtaiwan.title')).toBe('vTaiwan')
      expect(tZh('projects.moedict.title')).toBe('萌典')
      expect(tEn('projects.moedict.title')).toBe('Moedict')
    })

    it('should handle events translations correctly', () => {
      // Arrange
      const { t: tZh } = useTranslation('zh')
      const { t: tEn } = useTranslation('en')

      // Act & Assert
      expect(tZh('events.types.hackathon')).toBe('黑客松')
      expect(tEn('events.types.hackathon')).toBe('Hackathon')
      expect(tZh('events.register')).toBe('立即報名')
      expect(tEn('events.register')).toBe('Register Now')
    })
  })

  describe('translations object', () => {
    it('should contain all required navigation keys', () => {
      // Arrange
      const requiredNavKeys = [
        'nav.home',
        'nav.projects',
        'nav.news',
        'nav.events',
        'nav.about'
      ]

      // Act & Assert
      requiredNavKeys.forEach(key => {
        expect(translations[key]).toBeDefined()
        expect(translations[key]?.zh).toBeDefined()
        expect(translations[key]?.en).toBeDefined()
      })
    })

    it('should contain all required hero section keys', () => {
      // Arrange
      const requiredHeroKeys = [
        'hero.badge',
        'hero.title',
        'hero.title.highlight',
        'hero.description',
        'hero.join',
        'hero.projects'
      ]

      // Act & Assert
      requiredHeroKeys.forEach(key => {
        expect(translations[key]).toBeDefined()
        expect(translations[key]?.zh).toBeDefined()
        expect(translations[key]?.en).toBeDefined()
      })
    })

    it('should have consistent structure for all translation entries', () => {
      // Arrange & Act
      const translationEntries = Object.entries(translations)

      // Assert
      translationEntries.forEach(([, value]) => {
        expect(value).toHaveProperty('zh')
        expect(value).toHaveProperty('en')
        expect(typeof value.zh).toBe('string')
        expect(typeof value.en).toBe('string')
        expect(value.zh.length).toBeGreaterThan(0)
        expect(value.en.length).toBeGreaterThan(0)
      })
    })

    it('should contain all required common keys', () => {
      // Arrange
      const requiredCommonKeys = [
        'common.loading',
        'common.search',
        'common.filter',
        'common.all',
        'common.active',
        'common.archived'
      ]

      // Act & Assert
      requiredCommonKeys.forEach(key => {
        expect(translations[key]).toBeDefined()
        expect(translations[key]?.zh).toBeDefined()
        expect(translations[key]?.en).toBeDefined()
      })
    })
  })

  describe('Language type', () => {
    it('should accept valid language values', () => {
      // Arrange
      const validLanguages: Language[] = ['zh', 'en']

      // Act & Assert
      validLanguages.forEach(lang => {
        expect(() => useTranslation(lang)).not.toThrow()
      })
    })
  })
})