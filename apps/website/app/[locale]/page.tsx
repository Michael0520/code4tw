import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations();
  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">C4T</span>
            </div>
            <span className="font-bold text-lg">Code for Taiwan</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t('navigation.home')}
            </a>
            <a href="/projects" className="text-sm font-medium transition-colors hover:text-primary">
              {t('navigation.projects')}
            </a>
            <a href="/news" className="text-sm font-medium transition-colors hover:text-primary">
              {t('navigation.news')}
            </a>
            <a href="/events" className="text-sm font-medium transition-colors hover:text-primary">
              {t('navigation.events')}
            </a>
            <a href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              {t('navigation.about')}
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
          <div className="container px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium">
{t('hero.badge')}
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
{t('hero.title')}
                <span className="text-primary"> {t('hero.titleHighlight')}</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
{t('hero.description')}
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
{t('hero.joinUs')}
                </button>
                <a
                  href="https://github.com/g0v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
{t('hero.viewProjects')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 sm:py-32">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">{t('navigation.about')}</div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('about.mission.title')} & {t('about.values.title')}</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
{t('about.mission.description')}
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('features.transparency.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('features.transparency.description')}</p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('features.community.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('features.community.description')}</p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('features.innovation.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('features.innovation.description')}</p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{t('features.openSource.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('features.openSource.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 sm:py-32 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">{t('navigation.projects')}</div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('projects.title')}</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
{t('projects.subtitle')}
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-6xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                <div className="rounded-lg border bg-card overflow-hidden">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">vTaiwan</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>⭐ 245</span>
                          <span>🍴 67</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">Digital regulation adaptation platform for citizen participation in policy making</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        Vue.js
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        Node.js
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        Policy Participation
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href="https://github.com/g0v/vtaiwan.tw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        GitHub
                      </a>
                      <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        {t('common.viewMore')}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-card overflow-hidden">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">萌典</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>⭐ 892</span>
                          <span>🍴 156</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">Open online dictionary for Mandarin, Taiwanese, and Hakka languages</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        React
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        API
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        Language Preservation
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href="https://github.com/g0v/moedict-webkit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        GitHub
                      </a>
                      <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        {t('common.viewMore')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-24 sm:py-32">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">{t('footer.links.community')}</div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{t('hero.joinUs')}</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
{t('events.subtitle')}
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">{t('hero.joinUs')}</h3>
                <p className="text-muted-foreground mb-6">
{t('about.subtitle')}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    Developers
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    Designers
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    Project Managers
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    Data Scientists
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    Civic Journalists
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    Social Workers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Simple Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container px-4 py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('footer.legal.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
