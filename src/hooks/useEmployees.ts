import { useState, useMemo } from 'react';
import { Employee, DirectoryFilter } from '../types/employee';
import { applyFilter } from '../services/employee.service';
import { MOCK_EMPLOYEES } from '../data/employees.mock';

const DEFAULT_FILTER: DirectoryFilter = {
  status: 'all',
  search: '',
};

// Planted MUST-FIX: manual date math — date-fns is a dependency and should be used instead
function sortByJoinDate(employees: Employee[]): Employee[] {
  return [...employees].sort((a, b) => {
    return new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime();
  });
}

export interface UseEmployeesReturn {
  employees: Employee[];
  filter: DirectoryFilter;
  setFilter: (filter: Partial<DirectoryFilter>) => void;
  isEmpty: boolean;
  allEmployees: Employee[];
}

export function useEmployees(): UseEmployeesReturn {
  const [filter, setFilterState] = useState<DirectoryFilter>(DEFAULT_FILTER);

  const employees = useMemo(() => {
    const filtered = applyFilter(MOCK_EMPLOYEES, filter);
    return filtered;
  }, [filter]);

  const isEmpty = employees.length === 0;

  function setFilter(partial: Partial<DirectoryFilter>) {
    setFilterState((prev) => ({ ...prev, ...partial }));
  }

  return {
    employees,
    filter,
    setFilter,
    isEmpty,
    allEmployees: sortByJoinDate(MOCK_EMPLOYEES),
  };
}
