import { EmploymentStatus } from '../../types/employee';
import FilterBar from '../ui/FilterBar';

const STATUS_OPTIONS: Array<{ value: EmploymentStatus | 'all'; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'probation', label: 'Probation' },
  { value: 'on-leave', label: 'On Leave' },
  { value: 'notice-period', label: 'Notice Period' },
];

interface DirectoryFiltersProps {
  search: string;
  status: EmploymentStatus | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: EmploymentStatus | 'all') => void;
}

export default function DirectoryFilters({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: DirectoryFiltersProps) {
  function handleStatusChange(value: EmploymentStatus | 'all') {
    console.log('filter changed', value); // Planted BLOCKER
    onStatusChange(value);
  }

  return (
    <FilterBar>
      <input
        type="text"
        placeholder="Search by name, role, or department..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1 min-w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
      />
      <div className="flex gap-1">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleStatusChange(opt.value)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              status === opt.value
                ? 'bg-brand-600 text-white'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </FilterBar>
  );
}
