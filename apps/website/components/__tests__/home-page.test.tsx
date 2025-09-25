/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { render, waitFor } from '@testing-library/react'
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
  it('should render all main sections after loading', async () => {
    const { getByTestId, queryByText } = render(<HomePage locale="en" />)

    // Initially shows loading
    expect(queryByText('Loading...')).toBeInTheDocument()

    // Wait for data to load and sections to appear
    await waitFor(() => {
      expect(getByTestId('hero-section')).toBeInTheDocument()
    })

    expect(getByTestId('about-section')).toBeInTheDocument()
    expect(getByTestId('community-section')).toBeInTheDocument()
  })

  it('should render with proper structure after loading', async () => {
    const { container, queryByText } = render(<HomePage locale="en" />)

    // Wait for loading to complete
    await waitFor(() => {
      expect(queryByText('Loading...')).not.toBeInTheDocument()
    })

    expect(container.querySelector('.min-h-screen')).toBeInTheDocument()
  })

  it('should pass locale to child components after loading', async () => {
    const { getByTestId, queryByText } = render(<HomePage locale="zh" />)

    // Wait for loading to complete
    await waitFor(() => {
      expect(queryByText('Loading...')).not.toBeInTheDocument()
    })

    // Verify that sections are rendered
    expect(getByTestId('hero-section')).toBeInTheDocument()
    expect(getByTestId('simple-header')).toHaveTextContent('zh')
  })
})