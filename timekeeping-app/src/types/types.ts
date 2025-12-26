export interface TimeEntry {
  week: number;
  year: number;
  location: 'Norvegia' | 'România' | 'Neplanificat';
  hours: number;
}

export interface Employee {
  id: number;
  name: string;
  position: 'Employee' | 'Director';
  timeEntries: TimeEntry[];
}