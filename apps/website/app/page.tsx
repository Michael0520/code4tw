export default function HomePage() {
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
              首頁
            </a>
            <a href="/projects" className="text-sm font-medium transition-colors hover:text-primary">
              專案
            </a>
            <a href="/news" className="text-sm font-medium transition-colors hover:text-primary">
              新聞
            </a>
            <a href="/events" className="text-sm font-medium transition-colors hover:text-primary">
              活動
            </a>
            <a href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              關於我們
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
                開源 • 協作 • 公民科技
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                用科技改變
                <span className="text-primary"> 台灣社會</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Code for Taiwan
                是一個開放的公民科技社群，匯聚開發者、設計師與公民，共同打造數位解決方案，讓政府更透明、社會更美好。
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  加入我們
                </button>
                <a
                  href="https://github.com/g0v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  查看專案
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 sm:py-32">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">關於我們</div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">我們的使命與價值</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Code for Taiwan
                致力於透過開源協作，建立更開放、透明、參與式的數位民主社會。我們相信科技應該服務於人民，而非相反。
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">透明治理</h3>
                  <p className="text-sm text-muted-foreground">推動政府資訊透明化，讓公民更容易監督政府運作</p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">社會關懷</h3>
                  <p className="text-sm text-muted-foreground">關注弱勢族群權益，用科技縮小數位落差</p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">快速行動</h3>
                  <p className="text-sm text-muted-foreground">面對社會議題，我們快速響應並提出解決方案</p>
                </div>

                <div className="rounded-lg border bg-card p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">國際連結</h3>
                  <p className="text-sm text-muted-foreground">與國際公民科技社群交流，分享台灣經驗</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24 sm:py-32 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">專案展示</div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">我們的開源專案</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                這些專案展現了我們如何運用科技解決社會問題，每個專案都歡迎社群貢獻。
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
                    <p className="text-muted-foreground mb-4">數位法規調適平台，讓公民參與法規制定過程</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        Vue.js
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        Node.js
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        政策參與
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href="https://github.com/g0v/vtaiwan.tw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        原始碼
                      </a>
                      <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        查看
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
                    <p className="text-muted-foreground mb-4">開放的線上國語、台語、客語辭典</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        React
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        API
                      </span>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        語言保存
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href="https://github.com/g0v/moedict-webkit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        原始碼
                      </a>
                      <button className="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                        查看
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
              <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">社群參與</div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">加入我們的社群</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                透過多種管道參與社群活動，與志同道合的夥伴一起為台灣的數位民主努力。
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
              <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">加入我們的行列</h3>
                <p className="text-muted-foreground mb-6">
                  不論你是開發者、設計師、或是關心社會議題的公民，我們都歡迎你的參與。讓我們一起用科技讓台灣更美好！
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    開發者
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    設計師
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    專案經理
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    資料科學家
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    公民記者
                  </span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                    社會工作者
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
            <p className="text-sm text-muted-foreground">© 2024 Code for Taiwan. 致力於用科技讓台灣更美好。</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
