# PostHog Analytics Setup Guide

## Quick Setup

1. **Sign up for PostHog**
   - Go to https://app.posthog.com/signup
   - Create a free account (1M events/month free)

2. **Get your API Key**
   - After login, go to Project Settings
   - Copy your Project API Key (starts with `phc_`)

3. **Configure Environment Variables**

   ```bash
   # Create .env.local file
   cp .env.local.example .env.local

   # Edit .env.local and add your key
   NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_ACTUAL_KEY_HERE
   ```

4. **Verify Installation**

   ```bash
   # Start development server
   pnpm dev

   # Open browser and check console for PostHog initialization
   # You should see events being tracked in your PostHog dashboard
   ```

## What's Being Tracked

- **Page Views**: Automatic tracking of all page visits
- **CTA Clicks**: Button clicks with context (location, button name)
- **Social Links**: Social media link clicks
- **Session Recording**: User sessions (with privacy masking)
- **Custom Events**: Any additional events via `usePostHog` hook

## Privacy Features

- ✅ Input masking for sensitive data
- ✅ Password/email field auto-masking
- ✅ User opt-out support via localStorage
- ✅ GDPR compliant configuration

## Testing Analytics

1. Open your PostHog dashboard: https://app.posthog.com
2. Navigate to "Events" or "Live Events"
3. Interact with the website (click buttons, navigate pages)
4. Verify events appear in real-time

## Troubleshooting

- **No events showing**: Check if API key is correctly set
- **Console errors**: Verify NEXT_PUBLIC prefix in env variable
- **Network errors**: Check if PostHog host is accessible

## Additional Resources

- [PostHog Docs](https://posthog.com/docs)
- [React Integration Guide](https://posthog.com/docs/libraries/react)
- [Privacy & GDPR](https://posthog.com/docs/privacy)
