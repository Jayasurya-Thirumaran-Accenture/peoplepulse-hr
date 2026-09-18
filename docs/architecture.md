# Architecture

PeoplePulse is structured in four layers. Data flows strictly top-to-bottom; no layer reaches past the one above it.

## Layers

**Mock data** (`src/data/employees.mock.ts`) is the application's only data source. Dates are computed relative to module load time so the data stays realistic regardless of when the repo is cloned.

**Services** (`src/services/`) contain all business logic as pure TypeScript functions. They receive data as arguments and return new data — no React, no side effects, no imports from other layers. This makes them trivially testable.

**Hooks** (`src/hooks/`) bridge React and the service layer. Each hook owns a slice of component state, calls service functions to derive computed values, and exposes a clean interface to the page that uses it.

**Components** (`src/components/`) render. They receive props, call hooks, and return JSX. A component that contains a `filter()` or date calculation has leaked business logic and should be refactored.

## Data flow

```
employees.mock.ts
      │
      ▼
employee.service.ts   ← pure functions: sort, filter, search
      │
      ▼
useEmployees.ts       ← state, memoisation, setFilter
      │
      ▼
DirectoryPage.tsx     ← layout, passes props
      │
      ▼
EmployeeTable.tsx / DirectoryFilters.tsx   ← render
```
