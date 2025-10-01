# PostHog Authorized Domains Configuration

## Development Domains

```
http://localhost:3000
http://localhost:3001
http://localhost:3002
http://127.0.0.1:3000
```

## Production Domains (When Ready)

```
https://codefortaiwan.org
https://www.codefortaiwan.org
https://*.codefortaiwan.org
```

## Vercel Preview Domains (If Using Vercel)

```
https://*.vercel.app
https://code4tw-*.vercel.app
```

## How to Add in PostHog:

1. Go to Project Settings > Authorized URLs
2. Click "Add authorized URL"
3. Add each domain one by one
4. Save changes

## Notes:

- Wildcards are supported (e.g., `https://*.domain.com`)
- Both HTTP and HTTPS protocols should be specified separately
- Port numbers must be included for localhost
