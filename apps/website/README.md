# Website - Code4TW International Website

A modern, multilingual website built with Next.js 15 and next-intl for the Code4TW project.

## 🚀 Features

- **Multi-language Support**: Full internationalization with English and Traditional Chinese
- **SSG/SSR Ready**: Static Site Generation with dynamic routing
- **Modern Stack**: Next.js 15.5.3 with App Router
- **Type Safe**: Full TypeScript support
- **Responsive Design**: Tailwind CSS for styling
- **SEO Optimized**: Per-locale metadata and sitemap generation

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.3](https://nextjs.org/)
- **Internationalization**: [next-intl 4.0.0](https://next-intl-docs.vercel.app/)
- **Styling**: [Tailwind CSS 3.4.4](https://tailwindcss.com/)
- **Language**: [TypeScript 5.5.3](https://www.typescriptlang.org/)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📁 Project Structure

```
website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/           # Dynamic locale routing
│   │   │   ├── layout.tsx      # Locale-specific layout
│   │   │   ├── page.tsx        # Home page
│   │   │   ├── error.tsx       # Error boundary
│   │   │   ├── not-found.tsx   # 404 page
│   │   │   └── pathnames/      # Example sub-route
│   │   └── layout.tsx          # Root layout
│   ├── components/             # React components
│   │   ├── Navigation.tsx      # Main navigation
│   │   ├── LocaleSwitcher.tsx  # Language switcher
│   │   └── PageLayout.tsx      # Page wrapper
│   ├── i18n/                   # Internationalization config
│   │   ├── routing.ts          # Routing configuration
│   │   └── request.ts          # Request helpers
│   └── middleware.ts           # Next.js middleware
├── messages/                   # Translation files
│   ├── en.json                # English translations
│   └── zh.json                # Chinese translations
└── public/                    # Static assets
```

## 🚦 Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm (installed globally)

### Development

```bash
# Install dependencies
pnpm install

# Start development server (port 3006)
pnpm dev

# The app will be available at:
# - English: http://localhost:3006/en
# - Chinese: http://localhost:3006/zh
```

### Building for Production

```bash
# Create production build
pnpm build

# Start production server
pnpm start
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run Jest tests
pnpm test:jest

# Run Playwright tests
pnpm test:playwright
```

### Code Quality

```bash
# Lint code
pnpm lint

# Type checking
pnpm check-types
```

## 🌐 Internationalization

The app supports multiple languages with automatic locale detection and routing:

### Supported Locales

- **English** (`en`) - Default
- **Traditional Chinese** (`zh`)

### Adding New Translations

1. Add translation keys to `messages/en.json` and `messages/zh.json`
2. Use translations in components:

```tsx
import {useTranslations} from 'next-intl';

export default function Component() {
  const t = useTranslations('ComponentNamespace');
  return <h1>{t('title')}</h1>;
}
```

### Dynamic Routes

The app supports localized pathnames:

- `/en/pathnames` → `/zh/路径名`

Configure in `src/i18n/routing.ts`:

```ts
pathnames: {
  '/pathnames': {
    en: '/pathnames',
    zh: '/路径名'
  }
}
```

## 📝 Environment Variables

No environment variables are required for basic operation. The app uses configuration files for all settings.

## 🔧 Configuration

Key configuration files:

- `src/i18n/routing.ts` - Locale and routing configuration
- `src/config.ts` - Application configuration
- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration

## 🏗️ Architecture Decisions

### Why next-intl?

- Full App Router support
- Static rendering capabilities
- Type-safe translations
- Automatic locale negotiation
- Built-in formatting utilities

### Static Site Generation (SSG)

All pages are statically generated at build time for both locales using `generateStaticParams()`. This provides:

- Fast page loads
- Better SEO
- Lower hosting costs
- Offline capability

### Middleware-based Routing

The middleware handles:

- Locale detection from browser preferences
- Automatic redirects to localized URLs
- Default locale handling
- 404 redirects for invalid locales

## 📦 Deployment

The app can be deployed to any platform that supports Next.js:

- Vercel (recommended)
- Netlify
- AWS Amplify
- Docker containers
- Node.js servers

### Build Output

After building, the app generates:

- Static HTML files for all routes in both languages
- Optimized JavaScript bundles
- CSS files
- Static assets in `public/`

## 🤝 Contributing

1. Follow the existing code structure
2. Add translations for both languages
3. Test with both locales
4. Ensure TypeScript types are correct
5. Run linting before committing

## 📄 License

Part of the Code4TW project.

## 🔗 Related Links

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 📞 Contact

- **Email**: codefortaiwan.org@gmail.com
- **Facebook**: [CFTcodefortaiwan](https://www.facebook.com/CFTcodefortaiwan/)
- **Discord**: [Join our community](https://discord.gg/pRFjDXeFyv)
- **Events**: [Luma Calendar](https://luma.com/0ckf5dio)
- **GitHub**: [codefortaiwan](https://github.com/codefortaiwan)

---

**Port**: 3006 (Development)
**Supported Locales**: English (en), Traditional Chinese (zh)
**Framework**: Next.js 15.5.3 with App Router
