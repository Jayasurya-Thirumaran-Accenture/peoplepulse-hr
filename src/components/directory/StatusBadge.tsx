import Badge from '../ui/Badge';
import { EmploymentStatus } from '../../types/employee';

const statusConfig: Record<EmploymentStatus, { label: string; variant: 'neutral' | 'success' | 'danger' | 'warning' }> = {
  active: { label: 'Active', variant: 'success' },
  'on-leave': { label: 'On Leave', variant: 'neutral' },
  probation: { label: 'Probation', variant: 'warning' },
  'notice-period': { label: 'Notice Period', variant: 'danger' },
};

interface StatusBadgeProps {
  status: EmploymentStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
