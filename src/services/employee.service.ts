import { Employee, EmploymentStatus, DirectoryFilter } from '../types/employee';

export function getEmployees(employees: Employee[]): Employee[] {
  return [...employees].sort((a, b) => a.name.localeCompare(b.name));
}

export function filterByStatus(
  employees: Employee[],
  status: EmploymentStatus | 'all',
): Employee[] {
  if (status === 'all') return employees;
  return employees.filter((e) => e.status === status);
}

export function searchEmployees(employees: Employee[], query: string): Employee[] {
  const q = query.toLowerCase().trim();
  if (!q) return employees;
  return employees.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q),
  );
}

export function applyFilter(employees: Employee[], filter: DirectoryFilter): Employee[] {
  const byStatus = filterByStatus(employees, filter.status);
  return searchEmployees(byStatus, filter.search);
}
