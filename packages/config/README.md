# @repo/config

Shared configuration for Code for Taiwan projects.

## Usage

```typescript
import { siteConfig } from '@repo/config/site';

console.log(siteConfig.name); // "Code for Taiwan"
console.log(siteConfig.social.github); // "https://github.com/codefortaiwan"
```

## Exports

- `site` - Site-wide configuration including metadata, social links, and SEO settings

## Configuration Structure

### Site Config

```typescript
{
  name: string;
  title: string;
  description: string;
  url: string;
  organization: {...};
  social: {...};
  contact: {...};
  links: {...};
  copyright: {...};
  metadata: {...};
  openGraph: {...};
  twitter: {...};
  locales: {...};
}
```
