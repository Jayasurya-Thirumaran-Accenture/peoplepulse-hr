# Design System

## Principles
- Use Tailwind utility classes exclusively — no inline styles, no hex colors.
- Spacing scale: 1 = 4px. Prefer multiples of 4.
- Never introduce a new component variant without documenting it here first.

## Badge

Displays a short status label. Three documented variants:

| Variant | Tailwind classes | Use for |
|---|---|---|
| `neutral` | `bg-gray-100 text-gray-700` | Inactive or ambiguous states |
| `success` | `bg-green-100 text-green-700` | Positive or active states |
| `danger` | `bg-red-100 text-red-700` | Alerts, terminations, expiring items |

Usage:
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="danger">Notice Period</Badge>
```

## Table

Generic typed table component. Pass `columns` with a `render` function per column. Do not build one-off tables — extend this.

## FilterBar

Horizontal container for filters. Wraps on narrow viewports. Children are flex items.

## EmptyState

Displayed when a filtered list is empty. Requires `title`; `description` is optional.

## Spacing tokens

| Token | Value | Use |
|---|---|---|
| `gap-1` | 4px | Tight inline spacing |
| `gap-3` | 12px | Filter bar items |
| `gap-6` | 24px | Page section spacing |
| `px-6 py-4` | — | Table cell padding |
| `px-4 py-8` | — | Page padding |
