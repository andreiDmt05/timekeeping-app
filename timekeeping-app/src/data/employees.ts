import type { Employee } from '../types/types';

export const employees: Employee[] = [
  {
    id: 1,
    name: 'Director',
    position: 'Director',
    timeEntries: []
  },
  ...Array.from({ length: 16 }, (_, i) => ({
    id: i + 2,
    name: `Employee ${i + 1}`,
    position: 'Employee' as const,
    timeEntries: []
  }))
];