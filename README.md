# PeoplePulse HR

Internal HR management platform for the PeoplePulse engineering team.

## What is this?

PeoplePulse is a lightweight HR tool that lets people managers:
- Browse the employee directory and filter by employment status
- Track leave balances and requests
- Monitor new-hire onboarding progress

## Running locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Testing

```bash
npm test           # run all tests once
npm run test:watch # watch mode for development
```

## Tech stack

React 18 · TypeScript (strict) · Vite · Tailwind CSS · Vitest · date-fns

## Project structure

```
src/
  types/       # TypeScript interfaces and union types
  data/        # Mock data (no real API calls)
  services/    # Pure business-logic functions
  hooks/       # React state hooks that compose services
  components/  # UI components (ui/ for generics, directory/ for feature-specific)
  pages/       # One component per tab
  tests/       # Mirrors src/ structure
```
