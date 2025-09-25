import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('Utils Functions', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      const result = cn('base-class', 'additional-class')
      expect(result).toContain('base-class')
      expect(result).toContain('additional-class')
    })

    it('should handle conditional classes', () => {
      const isActive = true
      const isHidden = false
      const result = cn('base-class', isActive && 'conditional-class', isHidden && 'hidden-class')
      expect(result).toContain('base-class')
      expect(result).toContain('conditional-class')
      expect(result).not.toContain('hidden-class')
    })

    it('should handle undefined and null values', () => {
      const result = cn('base-class', undefined, null, 'valid-class')
      expect(result).toContain('base-class')
      expect(result).toContain('valid-class')
    })

    it('should handle empty input', () => {
      const result = cn()
      expect(typeof result).toBe('string')
    })

    it('should handle array inputs', () => {
      const result = cn(['class1', 'class2'], 'class3')
      expect(result).toContain('class1')
      expect(result).toContain('class2')
      expect(result).toContain('class3')
    })

    it('should handle object inputs', () => {
      const result = cn({
        'active': true,
        'disabled': false,
        'base': true
      })
      expect(result).toContain('active')
      expect(result).toContain('base')
      expect(result).not.toContain('disabled')
    })
  })
})