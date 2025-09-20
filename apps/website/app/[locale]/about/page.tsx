export default function AboutPage() {
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
            <a href="/about" className="text-sm font-medium transition-colors hover:text-primary text-primary">
              關於我們
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-24 relative overflow-hidden">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">關於我們</div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Code for Taiwan</h1>
              <p className="mt-6 text-xl leading-8 text-muted-foreground">讓台灣每個人都能提供好的 Code！</p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Code for Taiwan 章程 v0.0</h2>
                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">理念</h3>
                    <p className="leading-relaxed mb-6">
                      Code for Taiwan 受到 g0v 的啟發，希望讓台灣大家都能夠有 Code 的觀念與思維，有別於專案導向的
                      g0v，Code for Taiwan 專注於普及 Code Concept，在這 AI 盛行的時代，許多人開始投入了 no-code,
                      low-code 的領域，往好的方向是大家產值提升了，不好的方向是不知道自己在開發什麼，因此我們希望透過
                      Code for Taiwan，讓大家在投入程式開發的同時，能夠有著對應的思維邏輯，而不是只是玩吃角子老虎。
                    </p>
                    <p className="leading-relaxed">
                      Code for Taiwan
                      不僅僅只是為了剛踏入程式開發的工程師、PM、設計師等等，我們更希望能將此思維拓展到非城市地區，讓資源較為匱乏的鄉鎮市區也能掌握科技，減少城鄉之間的差距，如同我們的名字
                      Code for Taiwan，我們希望能讓台灣的每個人都能提供好的 Code！
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">核心理念</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                我們的核心理念建立在四個重要支柱上，指引著我們的每一個行動。
              </p>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Code 思維普及</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    讓每個人都能理解程式邏輯，不只是使用工具，更要理解背後的運作原理
                  </p>
                </div>

                <div className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">創新解決方案</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    在 AI 盛行的時代，培養正確的開發思維，避免盲目使用 no-code/low-code 工具
                  </p>
                </div>

                <div className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">城鄉平衡發展</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    將科技思維推廣到非都市地區，減少城鄉之間的數位落差
                  </p>
                </div>

                <div className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-primary rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">全民參與</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    不僅服務工程師、PM、設計師，更要讓所有台灣人都能掌握科技
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">我們的價值觀</h2>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                這些價值觀塑造了我們的文化，並指導我們如何與社群互動。
              </p>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6">
                  <div className="rounded-lg bg-accent/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-accent rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">透明治理</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    推動政府資訊透明化，讓公民更容易監督政府運作
                  </p>
                </div>

                <div className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6">
                  <div className="rounded-lg bg-accent/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-accent rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">社會關懷</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">關注弱勢族群權益，用科技縮小數位落差</p>
                </div>

                <div className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6">
                  <div className="rounded-lg bg-accent/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-accent rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">快速行動</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    面對社會議題，我們快速響應並提出解決方案
                  </p>
                </div>

                <div className="rounded-lg border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors p-6">
                  <div className="rounded-lg bg-accent/10 p-3 w-fit mb-4">
                    <div className="h-6 w-6 bg-accent rounded"></div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">國際連結</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">與國際公民科技社群交流，分享台灣經驗</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Invitation */}
        <section className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">加入我們的行列</h3>
                <p className="text-muted-foreground mb-6">
                  不論你是開發者、設計師、或是關心社會議題的公民，我們都歡迎你的參與。讓我們一起用科技讓台灣更美好！
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-8">
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
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    查看專案
                  </a>
                  <a
                    href="/events"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    參加活動
                  </a>
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
