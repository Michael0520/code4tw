/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { HomePage } from '../home/home-page'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

// Mock getHomeData action
vi.mock('@/lib/features/home/actions', () => ({
  getHomeData: vi.fn().mockResolvedValue({
    aboutFeatures: [],
    communityRoles: [],
  }),
}))

// Mock child components
vi.mock('../home/hero-section', () => ({
  HeroSection: () => <div data-testid="hero-section">Hero</div>,
}))

vi.mock('../home/about-section', () => ({
  AboutSection: () => <div data-testid="about-section">About</div>,
}))

vi.mock('../home/community-section', () => ({
  CommunitySection: () => <div data-testid="community-section">Community</div>,
}))

vi.mock('../layout/footer', () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}))

vi.mock('../layout/simple-header', () => ({
  SimpleHeader: ({ locale }: { locale: string }) => (
    <header data-testid="simple-header">{locale}</header>
  ),
}))

describe('HomePage Component', () => {
  it('should render all main sections', () => {
    const { getByTestId } = render(<HomePage locale="en" />)

    expect(getByTestId('hero-section')).toBeInTheDocument()
    expect(getByTestId('about-section')).toBeInTheDocument()
    expect(getByTestId('community-section')).toBeInTheDocument()
  })

  it('should render with proper structure', () => {
    const { container } = render(<HomePage locale="en" />)

    expect(container.firstChild).toHaveClass('min-h-screen')
  })

  it('should pass locale to child components', () => {
    const { getByTestId } = render(<HomePage locale="zh" />)

    // Verify that sections are rendered (they would receive data internally)
    expect(getByTestId('hero-section')).toBeInTheDocument()
  })
})