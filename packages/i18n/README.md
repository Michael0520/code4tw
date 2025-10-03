# @repo/i18n

Shared internationalization (i18n) configuration for Code for Taiwan projects using next-intl.

## Usage

### Basic Setup

```typescript
// In your app's middleware.ts
import {routing} from '@repo/i18n/routing';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware(routing);
```

### Navigation

```typescript
// In your components
import {Link, usePathname, useRouter} from '@repo/i18n/navigation';

export function MyComponent() {
  const router = useRouter();
  const pathname = usePathname();

  return <Link href="/about">About</Link>;
}
```

### Request Configuration

**Option 1: Use default (messages in `/messages` directory)**

```typescript
// app/i18n/request.ts
export {default} from '@repo/i18n/request';
```

**Option 2: Custom message loader**

```typescript
// app/i18n/request.ts
import {createRequestConfig} from '@repo/i18n/request';

export default createRequestConfig(async (locale) => {
  return (await import(`../../custom-messages/${locale}.json`)).default;
});
```

## Exports

- `routing` - Routing configuration with supported locales
- `navigation` - Navigation helpers (Link, useRouter, usePathname, etc.)
- `request` - Request configuration for next-intl
- `createRequestConfig` - Factory function for custom message loading

## Configuration

Current supported locales:
- `en` - English
- `zh` - Chinese (Traditional)

Default locale: `en`
