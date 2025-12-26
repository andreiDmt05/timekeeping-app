import React, { useState } from 'react';
import type { Employee, TimeEntry } from '../types/types';

interface Props {
  employee: Employee;
  onAddEntry: (employeeId: number, entry: TimeEntry) => void;
}

const TimeEntryForm: React.FC<Props> = ({ employee, onAddEntry }) => {
  const [week, setWeek] = useState<number>(1);
  const [location, setLocation] = useState<'Norvegia' | 'România'>('Norvegia');
  const [hours, setHours] = useState<number>(40);
  const [year] = useState<number>(2025);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEntry(employee.id, { week, year, location, hours });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h4>{employee.name}</h4>
      <label>
        Săptămâna:
        <input type="number" value={week} onChange={e => setWeek(+e.target.value)} min={1} max={52} />
      </label>
      <label style={{ marginLeft: '10px' }}>
        Locație:
        <select value={location} onChange={e => setLocation(e.target.value as 'Norvegia' | 'România')}>
          <option value="Norvegia">Norvegia</option>
          <option value="România">România</option>
        </select>
      </label>
      <label style={{ marginLeft: '10px' }}>
        Ore:
        <input type="number" value={hours} onChange={e => setHours(+e.target.value)} min={0} max={168} />
      </label>
      <button type="submit" style={{ marginLeft: '10px' }}>Adaugă pontaj</button>
    </form>
  );
};

export default TimeEntryForm;