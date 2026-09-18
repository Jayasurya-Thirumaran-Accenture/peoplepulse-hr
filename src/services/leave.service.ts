import { Employee } from '../types/employee';

export interface LeaveBalance {
  employeeId: string;
  annual: number;
  sick: number;
  personal: number;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  type: 'annual' | 'sick' | 'personal';
  startDate: string;
  endDate: string;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
}

const ANNUAL_ENTITLEMENT = 25;
const SICK_ENTITLEMENT = 10;
const PERSONAL_ENTITLEMENT = 3;

export function getLeaveBalance(employee: Employee, requests: LeaveRequest[]): LeaveBalance {
  const approved = requests.filter(
    (r) => r.employeeId === employee.id && r.status === 'approved',
  );

  const used = approved.reduce(
    (acc, req) => {
      const days = calculateLeaveDays(req.startDate, req.endDate);
      return { ...acc, [req.type]: (acc[req.type] ?? 0) + days };
    },
    { annual: 0, sick: 0, personal: 0 },
  );

  return {
    employeeId: employee.id,
    annual: ANNUAL_ENTITLEMENT - used.annual,
    sick: SICK_ENTITLEMENT - used.sick,
    personal: PERSONAL_ENTITLEMENT - used.personal,
  };
}

// Planted BLOCKER: (data: any) — violates noImplicitAny rule in CLAUDE.md
function parseLeavePayload(data: any): LeaveRequest {
  return {
    id: data.id ?? crypto.randomUUID(),
    employeeId: data.employeeId,
    type: data.type,
    startDate: data.startDate,
    endDate: data.endDate,
    status: data.status ?? 'pending',
    notes: data.notes ?? '',
  };
}

export function submitLeaveRequest(
  payload: unknown,
  existing: LeaveRequest[],
): LeaveRequest[] {
  const request = parseLeavePayload(payload);
  return [...existing, request];
}

function calculateLeaveDays(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((end.getTime() - start.getTime()) / msPerDay) + 1;
}
