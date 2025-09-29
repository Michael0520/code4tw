# PostHog Analytics Integration Guide

## 📊 Overview

PostHog is integrated into the Code for Taiwan website to provide comprehensive analytics and user behavior tracking. This setup enables:

- **Session Recording**: Capture user interactions and journeys
- **Event Tracking**: Monitor specific user actions (CTA clicks, social links)
- **Page Analytics**: Track page views and user navigation
- **Privacy Controls**: GDPR-compliant with user opt-out options

## 🚀 Quick Start

### 1. Environment Setup

Create a `.env.local` file in `/apps/website/` with your PostHog credentials:

```bash
# Copy from example
cp .env.local.example .env.local

# Edit with your PostHog credentials
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_PROJECT_API_KEY
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com  # Optional
```

### 2. Get Your PostHog API Key

1. Sign up at [PostHog Cloud](https://app.posthog.com/signup) (free tier available)
2. Create a new project
3. Navigate to Project Settings → API Keys
4. Copy your Project API key (starts with `phc_`)

## 📁 Implementation Structure

```
apps/website/src/
├── providers/
│   └── PosthogProvider.tsx      # Main PostHog provider and page tracking
├── hooks/
│   └── usePostHog.ts            # Custom hook for tracking events
├── app/[locale]/
│   └── layout.tsx               # Provider integration
└── components/
    ├── Footer.tsx               # Social link tracking
    ├── EventsSection.tsx        # Event CTA tracking
    └── [page].tsx              # Discord CTA tracking
```

## 🔧 Core Components

### PostHog Provider (`PosthogProvider.tsx`)

Initializes PostHog with privacy-focused configuration:

```typescript
// Key features:
- Automatic page view tracking
- Session recording with input masking
- Opt-out capability via localStorage
- Autocapture for all interactions
```

### Custom Hook (`usePostHog.ts`)

Provides convenient tracking methods:

```typescript
const {
  trackEvent,         // Generic event tracking
  trackSocialClick,   // Social media link clicks
  trackCTAClick,      // Call-to-action button clicks
  trackPageView,      // Manual page views
  identifyUser,       // User identification
  setUserProperty    // User properties
} = usePostHog();
```

## 📈 Events Being Tracked

### 1. **Page Views**
- Automatically tracked on route changes
- Includes full URL with query parameters

### 2. **Social Link Clicks**
Event: `social_link_clicked`
```javascript
{
  platform: "Facebook" | "Discord" | "Events" | ...,
  location: "footer" | "navbar" | ...,
  timestamp: ISO 8601
}
```

### 3. **CTA Clicks**
Event: `cta_clicked`
```javascript
{
  cta_name: "Join Discord" | "View Events" | ...,
  location: "hero_section" | "events_section" | ...,
  timestamp: ISO 8601
}
```

## 🔐 Privacy & Compliance

### Data Masking
- All password and email inputs are automatically masked
- Session recordings exclude sensitive data

### User Opt-Out
Users can opt out of tracking:

```javascript
// Add opt-out button in your privacy settings
const handleOptOut = () => {
  localStorage.setItem('posthog_opt_out', 'true');
  posthog.opt_out_capturing();
};
```

### GDPR Compliance
- No personal data collected without consent
- IP anonymization enabled
- Data retention policies configurable in PostHog dashboard

## 📊 Viewing Analytics

### PostHog Dashboard

1. **Live Events**: Real-time event stream at PostHog → Activity
2. **Session Recordings**: User journey videos at PostHog → Recordings
3. **Insights**: Create custom charts and funnels
4. **Feature Flags**: A/B testing capabilities (not yet implemented)

### Key Metrics to Monitor

1. **Engagement Metrics**
   - Discord join conversion rate
   - Event registration clicks
   - Social media engagement by platform

2. **User Journey**
   - Path from landing to Discord join
   - Drop-off points in user flow
   - Most visited sections

3. **Technical Metrics**
   - Page load times
   - Error rates
   - Device and browser distribution

## 🧪 Testing PostHog Integration

### Local Testing

1. **Start development server**:
```bash
pnpm dev --filter=website
```

2. **Enable debug mode** (optional):
```bash
NEXT_PUBLIC_POSTHOG_DEBUG=true pnpm dev
```

3. **Verify tracking**:
   - Open browser DevTools → Network tab
   - Look for requests to `i.posthog.com`
   - Check console for PostHog debug messages

### Production Verification

1. Deploy to production
2. Visit PostHog dashboard → Activity
3. Verify events appear in real-time
4. Check session recordings are working

## 🛠 Advanced Configuration

### Custom Events

Add new tracking events:

```typescript
// In any component
import {usePostHog} from '@/hooks/usePostHog';

function MyComponent() {
  const {trackEvent} = usePostHog();

  const handleAction = () => {
    trackEvent('custom_action', {
      category: 'engagement',
      value: 123
    });
  };
}
```

### User Identification

Track logged-in users:

```typescript
const {identifyUser} = usePostHog();

// On login success
identifyUser(user.id, {
  email: user.email,
  name: user.name,
  role: user.role
});
```

### Feature Flags (Future)

PostHog supports feature flags for A/B testing:

```typescript
// Example implementation (not yet configured)
const showNewFeature = posthog.isFeatureEnabled('new-feature');
```

## 📝 Maintenance

### Regular Tasks

1. **Monthly**: Review analytics insights and adjust tracking
2. **Quarterly**: Clean up unused events
3. **Annually**: Review data retention policies

### Troubleshooting

**Events not appearing?**
- Check API key is correct
- Verify network requests in DevTools
- Check for ad blockers

**Session recordings not working?**
- Ensure session recording is enabled in PostHog project
- Check browser compatibility

**High data usage?**
- Consider sampling rate for session recordings
- Limit autocapture to specific elements

## 🔗 Resources

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog Next.js Guide](https://posthog.com/docs/libraries/next-js)
- [Privacy Best Practices](https://posthog.com/docs/privacy)
- [API Reference](https://posthog.com/docs/api)

## 📞 Support

For PostHog-related issues:
- PostHog Community: https://posthog.com/questions
- GitHub Issues: https://github.com/PostHog/posthog

For implementation questions:
- Create an issue in the Code for Taiwan repository
- Contact the development team

---

Last updated: December 2024
Version: 1.0.0