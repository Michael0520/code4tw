# Homepage Section Restructuring Plan

## Objective
Reorganize the homepage to follow the requested 4-section layout: Hero → About → Join → FAQ

## Current vs Requested Structure

### Current Structure
1. **Hero Section** ✅ - AnimatedRadialGradientBackground with CTA buttons
2. **Features Section** - "What We Do" (4 feature cards)
3. **Stats Section** - Statistics display with numbers
4. **Join Section** ✅ - "Join Our Community" with role selection

### Requested Structure
1. **Hero** ✅ (already exists)
2. **About** ❌ (missing - need to create)
3. **Join** ✅ (already exists)
4. **FAQ** ❌ (missing - need to create)

## Gap Analysis

### Missing Sections
- **About Section**: Need to replace or restructure the current "Features" section into a proper "About" section
- **FAQ Section**: Completely missing, need to create from scratch

### Content Reorganization Needed
- Current "Features" section needs to be restructured as "About" section
- Current "Stats" section should be integrated into "About" section
- Remove redundant content and streamline messaging

## Implementation Plan

### Step 1: Content Planning
- [ ] Create new translation keys for About and FAQ sections
- [ ] Update both `en.json` and `zh.json` message files
- [ ] Define FAQ questions and answers for Code for Taiwan

### Step 2: About Section Development
- [ ] Replace current "Features" section with comprehensive About section
- [ ] Include:
  - Company mission and vision statement
  - Core values and principles
  - Impact statistics (integrate current stats)
  - Brief history/story of Code for Taiwan
  - Visual elements to maintain engagement

### Step 3: FAQ Section Development
- [ ] Create new FAQ section with accordion-style Q&A
- [ ] Include common questions about:
  - Code for Taiwan overview
  - How to get involved
  - Technical contribution guidelines
  - Community participation

### Step 4: Component Development
- [ ] Create reusable FAQ accordion component
- [ ] Restructure About section layout
- [ ] Ensure responsive design for all screen sizes

### Step 5: Page Structure Update
- [ ] Modify `/src/app/[locale]/page.tsx` to implement new section order
- [ ] Remove current "Features" and "Stats" sections
- [ ] Integrate About section with improved content hierarchy
- [ ] Add new FAQ section at the bottom

### Step 6: Styling & UX
- [ ] Maintain consistent visual design language
- [ ] Ensure smooth scrolling between sections
- [ ] Add proper spacing and visual breaks
- [ ] Optimize for both English and Chinese content

## Files to Modify

### Core Files
- `/src/app/[locale]/page.tsx` - Main homepage structure
- `/messages/en.json` - English translations
- `/messages/zh.json` - Chinese translations

### New Components (if needed)
- `/src/components/ui/accordion.tsx` - FAQ accordion component
- `/src/sections/about/` - About section components
- `/src/sections/faq/` - FAQ section components

## Technical Considerations

### DDD Architecture Compliance
- Keep presentation layer components focused on UI
- Extract business logic to appropriate layers
- Maintain clear separation of concerns

### Internationalization
- Ensure all new content has both English and Chinese translations
- Consider cultural nuances in content presentation
- Test both locales thoroughly

### Performance
- Optimize for page load speed
- Consider lazy loading for FAQ section
- Maintain current responsive design standards

## Expected Outcome
Clean, focused homepage with exactly 4 sections that tells Code for Taiwan's story effectively and provides clear paths for user engagement.

## Status
- **Created**: 2025-09-28
- **Current Phase**: Planning
- **Next Step**: Begin Step 1 - Content Planning

---
*This plan serves as a living document to track progress on homepage restructuring.*