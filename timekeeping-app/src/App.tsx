import React, { useState } from 'react';
import { employees as initialEmployees } from './data/employees';
import type { Employee, TimeEntry } from './types/types';

// Componenta formular pentru pontaj
interface TimeEntryFormProps {
  employee: Employee;
  onAddEntry: (employeeId: number, entry: TimeEntry) => void;
}

const TimeEntryForm: React.FC<TimeEntryFormProps> = ({ employee, onAddEntry }) => {
  const [week, setWeek] = useState<number>(1);
  const [location, setLocation] = useState<'Norvegia' | 'România'>('Norvegia');
  const [hours, setHours] = useState<number>(40);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEntry(employee.id, { week, year: 2026, location, hours });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h4>{employee.name}</h4>
      <label>
        Săptămâna:
        <input
          type="number"
          value={week}
          onChange={e => setWeek(+e.target.value)}
          min={1}
          max={53}
        />
      </label>
      <label style={{ marginLeft: '10px' }}>
        Locație:
        <select
          value={location}
          onChange={e => setLocation(e.target.value as 'Norvegia' | 'România')}
        >
          <option value="Norvegia">Norvegia</option>
          <option value="România">România</option>
        </select>
      </label>
      <label style={{ marginLeft: '10px' }}>
        Ore:
        <input
          type="number"
          value={hours}
          onChange={e => setHours(+e.target.value)}
          min={0}
          max={168}
        />
      </label>
      <button type="submit" style={{ marginLeft: '10px' }}>Adaugă pontaj</button>
    </form>
  );
};

// Funcție utilitară pentru a afla luna dintr-o săptămână
const getMonthFromWeek = (week: number, year: number) => {
  const firstDayOfYear = new Date(year, 0, 1);
  const dayOfYear = (week - 1) * 7;
  const date = new Date(firstDayOfYear.setDate(firstDayOfYear.getDate() + dayOfYear));
  return date.toLocaleString('ro-RO', { month: 'long' });
};

function App() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);

  const addTimeEntry = (employeeId: number, entry: TimeEntry) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId
          ? { ...emp, timeEntries: [...emp.timeEntries, entry] }
          : emp
      )
    );
  };

  const deleteTimeEntry = (employeeId: number, index: number) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === employeeId
          ? { ...emp, timeEntries: emp.timeEntries.filter((_, i) => i !== index) }
          : emp
      )
    );
  };

  // Generează pontaj complet pentru anul 2026
  const generateFullYearPlannedTime = () => {
    setEmployees(prev =>
      prev.map(emp => {
        const entries: TimeEntry[] = [];

        for (let week = 1; week <= 52; week++) {
          if (week >= 1 && week <= 5) {
            entries.push({ week, year: 2026, location: 'Norvegia', hours: 40 });
          } else if (week >= 6 && week <= 8) {
            entries.push({ week, year: 2026, location: 'România', hours: 0 });
          } else {
            entries.push({ week, year: 2026, location: 'Neplanificat', hours: 0 });
          }
        }

        return { ...emp, timeEntries: entries };
      })
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Timekeeping App - 2026</h1>
      <button onClick={generateFullYearPlannedTime} style={{ marginBottom: '20px' }}>
        Generează pontaj automat pentru 2026
      </button>
      {employees.map(emp => (
        <div key={emp.id} style={{ borderBottom: '1px solid #ccc', marginBottom: '10px' }}>
          <TimeEntryForm employee={emp} onAddEntry={addTimeEntry} />
          <div>
            <strong>Pontaj:</strong>
            <ul>
              {emp.timeEntries.map((te, i) => (
                <li key={i}>
                  An: {te.year}, Săptămâna: {te.week} ({getMonthFromWeek(te.week, te.year)}), 
                  Locație: {te.location}, Ore: {te.hours}
                  <button
                    onClick={() => deleteTimeEntry(emp.id, i)}
                    style={{ marginLeft: '10px', color: 'red' }}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;