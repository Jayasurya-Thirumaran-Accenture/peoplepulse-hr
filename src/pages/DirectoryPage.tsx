import { useEmployees } from '../hooks/useEmployees';
import EmployeeTable from '../components/directory/EmployeeTable';
import DirectoryFilters from '../components/directory/DirectoryFilters';
import EmptyState from '../components/ui/EmptyState';

export default function DirectoryPage() {
  const { employees, filter, setFilter, isEmpty } = useEmployees();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Employee Directory</h1>
        <p className="text-sm text-gray-500 mt-1">
          {employees.length} employee{employees.length !== 1 ? 's' : ''} found
        </p>
      </div>
      <DirectoryFilters
        search={filter.search}
        status={filter.status}
        onSearchChange={(value) => setFilter({ search: value })}
        onStatusChange={(value) => setFilter({ status: value })}
      />
      {isEmpty ? (
        <EmptyState
          title="No employees found"
          description="Try adjusting your search or filter criteria."
        />
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <EmployeeTable employees={employees} />
        </div>
      )}
    </div>
  );
}
