import { describe, it, expect } from 'vitest'
import enMessages from '../en.json'
import zhMessages from '../zh.json'

describe('Translation Files', () => {
  describe('English translations', () => {
    it('should have all required top-level keys', () => {
      expect(enMessages).toHaveProperty('metadata')
      expect(enMessages).toHaveProperty('navigation')
      expect(enMessages).toHaveProperty('hero')
      expect(enMessages).toHaveProperty('about')
      expect(enMessages).toHaveProperty('footer')
    })

    it('should have navigation keys', () => {
      expect(enMessages.navigation).toHaveProperty('home')
      expect(enMessages.navigation).toHaveProperty('about')
      expect(enMessages.navigation).toHaveProperty('language')
    })

    it('should have hero section keys', () => {
      expect(enMessages.hero).toHaveProperty('title')
      expect(enMessages.hero).toHaveProperty('description')
      expect(enMessages.hero).toHaveProperty('joinUs')
    })

    it('should have about section keys', () => {
      expect(enMessages.about).toHaveProperty('title')
      expect(enMessages.about).toHaveProperty('corePrinciples')
      expect(enMessages.about).toHaveProperty('values')
    })
  })

  describe('Chinese translations', () => {
    it('should have all required top-level keys', () => {
      expect(zhMessages).toHaveProperty('metadata')
      expect(zhMessages).toHaveProperty('navigation')
      expect(zhMessages).toHaveProperty('hero')
      expect(zhMessages).toHaveProperty('about')
      expect(zhMessages).toHaveProperty('footer')
    })

    it('should have navigation keys', () => {
      expect(zhMessages.navigation).toHaveProperty('home')
      expect(zhMessages.navigation).toHaveProperty('about')
      expect(zhMessages.navigation).toHaveProperty('language')
    })

    it('should have hero section keys', () => {
      expect(zhMessages.hero).toHaveProperty('title')
      expect(zhMessages.hero).toHaveProperty('description')
      expect(zhMessages.hero).toHaveProperty('joinUs')
    })
  })

  describe('Translation consistency', () => {
    function getNestedKeys(obj: Record<string, unknown>, prefix = ''): string[] {
      let keys: string[] = []
      for (const key in obj) {
        const fullKey = prefix ? `${prefix}.${key}` : key
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          keys = keys.concat(getNestedKeys(obj[key] as Record<string, unknown>, fullKey))
        } else {
          keys.push(fullKey)
        }
      }
      return keys.sort()
    }

    it('should have same keys in both languages', () => {
      const enKeys = getNestedKeys(enMessages)
      const zhKeys = getNestedKeys(zhMessages)

      expect(enKeys).toEqual(zhKeys)
    })

    it('should not have empty values', () => {
      const checkEmptyValues = (obj: Record<string, unknown>, path = ''): string[] => {
        const emptyKeys: string[] = []
        for (const key in obj) {
          const fullPath = path ? `${path}.${key}` : key
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            emptyKeys.push(...checkEmptyValues(obj[key] as Record<string, unknown>, fullPath))
          } else if (!obj[key] || obj[key].toString().trim() === '') {
            emptyKeys.push(fullPath)
          }
        }
        return emptyKeys
      }

      const emptyEnKeys = checkEmptyValues(enMessages)
      const emptyZhKeys = checkEmptyValues(zhMessages)

      expect(emptyEnKeys).toEqual([])
      expect(emptyZhKeys).toEqual([])
    })

    it('should have valid JSON structure', () => {
      expect(() => JSON.stringify(enMessages)).not.toThrow()
      expect(() => JSON.stringify(zhMessages)).not.toThrow()
    })
  })
})