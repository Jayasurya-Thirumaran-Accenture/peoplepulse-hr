# PeoplePulse HR — Claude Code Guide

## Stack
React 18 · TypeScript (strict) · Vite · Tailwind CSS · Vitest + React Testing Library · date-fns

## Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build |
| `npm test` | Run all tests once |
| `npm run test:watch` | Watch mode |
| `npm run lint` | Type-check only |

## Layer rules
Business logic lives in `src/services/` only.
- **Components** render. They receive props, call hooks, render JSX. No business logic.
- **Hooks** hold state. They compose service calls, manage local state, expose clean interfaces.
- **Services** decide. Pure functions only — no React imports, no side effects.

## Forbidden patterns
- `any` — always type explicitly. Use `unknown` at boundaries, then narrow.
- `console.log` — remove before committing.
- Manual date math (`new Date(x).getTime()`) — use `date-fns` instead.
- Inline hex colors — use Tailwind tokens only.

## Testing conventions
- One `describe` block per exported function or component.
- Every `describe` must have: one happy-path test + at least one edge case.
- Mock nothing that the real implementation gives you for free.
- Test file lives next to its source: `src/tests/services/`, `src/tests/components/`.

## Extending the type system
When adding new fields to `Employee`, check `src/data/employees.mock.ts` and populate the field for every mock record.

## Design system
See `docs/design-system.md` before introducing any new UI primitives.
