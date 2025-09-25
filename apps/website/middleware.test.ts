import { describe, it, expect, vi } from 'vitest'

// Mock next-intl/middleware
const mockCreateMiddleware = vi.fn(() => vi.fn())

vi.mock('next-intl/middleware', () => ({
  default: mockCreateMiddleware,
}))

vi.mock('./i18n/routing', () => ({
  routing: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localePrefix: 'always'
  }
}))

describe('Middleware Configuration', () => {
  it('should import routing configuration', async () => {
    const { routing } = await import('./i18n/routing')

    expect(routing.locales).toEqual(['en', 'zh'])
    expect(routing.defaultLocale).toBe('en')
    expect(routing.localePrefix).toBe('always')
  })

  it('should create middleware with routing config', async () => {
    await import('./middleware')

    expect(mockCreateMiddleware).toHaveBeenCalledWith({
      locales: ['en', 'zh'],
      defaultLocale: 'en',
      localePrefix: 'always'
    })
  })

  it('should export config with correct matcher', async () => {
    const middleware = await import('./middleware')

    expect(middleware.config).toBeDefined()
    expect(middleware.config.matcher).toEqual(['/', '/(zh|en)/:path*'])
  })
})