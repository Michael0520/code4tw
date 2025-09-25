import { describe, it, expect } from 'vitest'
import { routing } from '../routing'

describe('i18n routing configuration', () => {
  it('should have correct locales configuration', () => {
    expect(routing.locales).toEqual(['en', 'zh'])
  })

  it('should have correct default locale', () => {
    expect(routing.defaultLocale).toBe('en')
  })

  it('should have localePrefix set to always', () => {
    expect(routing.localePrefix).toBe('always')
  })

  it('should include both supported locales', () => {
    expect(routing.locales).toContain('en')
    expect(routing.locales).toContain('zh')
  })

  it('should have exactly 2 locales', () => {
    expect(routing.locales).toHaveLength(2)
  })
})