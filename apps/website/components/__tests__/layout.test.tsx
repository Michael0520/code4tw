/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import { Header } from '../layout/header'

// Mock next-intl
vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}))

// Mock next-intl/navigation
vi.mock('@/i18n/navigation', () => ({
  Link: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <a {...props}>{children}</a>,
}))

// Mock components
vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => <button {...props}>{children}</button>,
}))

vi.mock('../ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet">{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-content">{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-trigger">{children}</div>,
  SheetHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-header">{children}</div>,
  SheetTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-title">{children}</div>,
}))

vi.mock('../ui/language-selector', () => ({
  LanguageSelector: ({ locale }: { locale: string }) => (
    <div data-testid="language-selector">{locale}</div>
  ),
}))

vi.mock('../search/global-search', () => ({
  GlobalSearch: () => <div data-testid="global-search">Search</div>,
}))

describe('Header Component', () => {
  it('should render header with correct structure', () => {
    const { getByText, getAllByTestId, getByTestId } = render(<Header locale="en" />)

    expect(getByText('Code for Taiwan')).toBeInTheDocument()
    expect(getAllByTestId('language-selector')).toHaveLength(2) // Desktop and mobile versions
    expect(getByTestId('global-search')).toBeInTheDocument()
  })

  it('should render navigation items', () => {
    const { getAllByText } = render(<Header locale="en" />)

    expect(getAllByText('navigation.home')).toHaveLength(2) // Desktop and mobile
    expect(getAllByText('navigation.about')).toHaveLength(2) // Desktop and mobile
  })

  it('should pass correct locale to LanguageSelector', () => {
    const { getAllByTestId } = render(<Header locale="zh" />)

    const languageSelectors = getAllByTestId('language-selector')
    expect(languageSelectors).toHaveLength(2)
    expect(languageSelectors[0]).toHaveTextContent('zh')
    expect(languageSelectors[1]).toHaveTextContent('zh')
  })

  it('should render mobile navigation', () => {
    const { getByTestId } = render(<Header locale="en" />)

    expect(getByTestId('sheet')).toBeInTheDocument()
    expect(getByTestId('sheet-trigger')).toBeInTheDocument()
  })
})