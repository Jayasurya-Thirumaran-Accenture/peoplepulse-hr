import { describe, it, expect } from 'vitest';
import {
  getEmployees,
  filterByStatus,
  searchEmployees,
  applyFilter,
} from '../../services/employee.service';
import { Employee } from '../../types/employee';

const makeEmployee = (overrides: Partial<Employee>): Employee => ({
  id: 'test-id',
  name: 'Test User',
  email: 'test@example.com',
  department: 'Engineering',
  role: 'Engineer',
  manager: 'Manager',
  status: 'active',
  employeeType: 'full-time',
  joinDate: '2023-01-01',
  probationEndDate: null,
  location: 'London',
  avatarInitials: 'TU',
  ...overrides,
});

const employees: Employee[] = [
  makeEmployee({ id: '1', name: 'Alice Chen', status: 'active' }),
  makeEmployee({ id: '2', name: 'Bob Smith', status: 'probation' }),
  makeEmployee({ id: '3', name: 'Carol Davies', status: 'on-leave', department: 'Product' }),
  makeEmployee({ id: '4', name: 'Dan Wilson', status: 'notice-period', role: 'Designer' }),
];

describe('getEmployees', () => {
  it('returns employees sorted alphabetically by name', () => {
    const shuffled = [employees[2], employees[0], employees[3], employees[1]];
    const result = getEmployees(shuffled);
    expect(result.map((e) => e.name)).toEqual([
      'Alice Chen',
      'Bob Smith',
      'Carol Davies',
      'Dan Wilson',
    ]);
  });

  it('returns empty array when given empty input', () => {
    expect(getEmployees([])).toEqual([]);
  });
});

describe('filterByStatus', () => {
  it('returns all employees when status is "all"', () => {
    expect(filterByStatus(employees, 'all')).toHaveLength(4);
  });

  it('filters to only employees with matching status', () => {
    const result = filterByStatus(employees, 'probation');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Bob Smith');
  });

  it('returns empty array when no employees match', () => {
    expect(filterByStatus(employees, 'notice-period')).toHaveLength(1);
    expect(filterByStatus(employees.slice(0, 3), 'notice-period')).toHaveLength(0);
  });
});

describe('searchEmployees', () => {
  it('returns all employees for empty query', () => {
    expect(searchEmployees(employees, '')).toHaveLength(4);
  });

  it('matches on name (case-insensitive)', () => {
    const result = searchEmployees(employees, 'alice');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Alice Chen');
  });

  it('matches on department', () => {
    const result = searchEmployees(employees, 'product');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Carol Davies');
  });

  it('matches on role', () => {
    const result = searchEmployees(employees, 'designer');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Dan Wilson');
  });

  it('returns empty array when nothing matches', () => {
    expect(searchEmployees(employees, 'zzzznotfound')).toHaveLength(0);
  });
});

describe('applyFilter', () => {
  it('applies both status and search filters together', () => {
    const result = applyFilter(employees, { status: 'active', search: 'alice' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Alice Chen');
  });

  it('returns empty array when filters exclude all results', () => {
    const result = applyFilter(employees, { status: 'probation', search: 'alice' });
    expect(result).toHaveLength(0);
  });
});
