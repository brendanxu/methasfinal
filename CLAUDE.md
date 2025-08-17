# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Methas is a professional methane emission reduction and carbon credit management solutions website built with Next.js 14, featuring a high-contrast black & white design system with a single accent green color, inspired by southpole.com.

## Key Commands

### Development
```bash
npm run dev          # Start development server at localhost:3000
npm run build        # Production build
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint checks
npm run type-check   # TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check format without changes
```

### Analysis
```bash
npm run analyze      # Bundle size analysis
```

## Architecture & Patterns

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with utility-first approach
- **Animations**: Framer Motion (11.x) with "Snappy" motion personality (200/300ms timing)
- **i18n**: next-intl for zh/en localization
- **Deployment**: Vercel optimized

### Project Structure
- `/src/app/[locale]/` - Internationalized app routes
- `/src/components/ui/` - Reusable UI components using CVA patterns
- `/src/components/sections/` - Page-specific section components
- `/src/lib/utils.ts` - Core utility functions including `cn()` for className merging
- `/messages/` - Localization JSON files (zh.json, en.json)
- `/docs/` - Comprehensive design system documentation

### Design System

Key design tokens from `/docs/ui-spec.md`:
- **Container**: 1200px max-width with 24px padding
- **Border Radius**: 24px (--radius-xl) as primary
- **Spacing**: 8px grid system (24px as primary spacing)
- **Colors**: Pure black (#000) + white (#fff) + single green accent
- **Typography**: Inter font family with 16px base

Motion language (`/docs/motion-language.md`):
- **Snappy personality**: 200ms (fast) / 300ms (normal) timings
- **Primary easing**: ease-out (cubic-bezier(0, 0, 0.2, 1))
- **Spring effects**: For CTA buttons and emphasis

### Component Patterns

All components follow this pattern:
```tsx
// Using CVA for variant management
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const componentVariants = cva('base-classes', {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ }
});
```

### Routing & i18n

- Routes defined in `/i18n/routing.ts`
- Locales: 'zh' (default), 'en'
- All routes prefixed with locale (e.g., `/zh/solutions`, `/en/about`)
- Use `useTranslations()` hook for accessing translations

### Path Aliases

TypeScript paths configured:
- `@/*` → `./src/*`
- `@/components/*` → `./src/components/*`
- `@/lib/*` → `./src/lib/*`

### Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SANITY_*` - Sanity CMS config (when integrated)
- `NEXT_PUBLIC_SITE_URL` - Production URL
- `NODE_ENV` - Environment setting

## Important Implementation Notes

### Sticky-Step Interaction Pattern
The Solutions page uses a sophisticated sticky-step pattern (reference: addx.co):
- Left side: Fixed media container
- Right side: 4-step scrolling content
- Intersection Observer threshold: 0.5
- Transition timing: 300-450ms

### Performance Requirements
From `/docs/ADR-001-tech-choice.md`:
- LCP ≤ 2.5s (mobile), ≤ 1.5s (desktop)
- CLS ≤ 0.1
- FID ≤ 100ms
- Initial JS bundle ≤ 180KB (gzipped)

### Component Development Checklist
1. Follow existing CVA patterns in `/src/components/ui/`
2. Apply motion tokens from design system (200/300ms timing)
3. Ensure WCAG AA compliance (4.5:1 contrast minimum)
4. Support both zh and en locales
5. Use `cn()` utility for className merging
6. Follow 24px primary spacing grid

### Deployment Notes
- Vercel auto-deployment on push to main
- Image optimization enabled via Next.js Image component
- Edge functions for optimal performance
- Default redirect from `/` to `/zh`

## Common Patterns to Follow

1. **State Management**: Use React hooks and context where needed
2. **Data Fetching**: Server components by default, client components only when necessary
3. **Error Handling**: Implement error boundaries for sections
4. **SEO**: Use metadata API in layout.tsx files
5. **Accessibility**: Semantic HTML, proper ARIA labels, keyboard navigation support

## Testing Approach

While no test framework is currently set up, when implementing tests:
- Focus on critical user paths
- Test i18n functionality
- Validate responsive breakpoints
- Check animation performance on lower-end devices