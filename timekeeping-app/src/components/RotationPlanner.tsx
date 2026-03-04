import { useState } from 'react';
import { createAttendance } from '../api/attendance';

export default function RotationPlanner() {
  const [year, setYear] = useState(2026);
  const [mode, setMode] = useState<'6-2' | '5-3'>('6-2');
  const [employeeName, setEmployeeName] = useState('');

  function getWeeksInYear(y: number) {
    const d = new Date(y, 11, 31);
    const week = Math.ceil(
      ((d.getTime() - new Date(y, 0, 1).getTime()) / 86400000 +
        new Date(y, 0, 1).getDay() +
        1) /
        7
    );
    return week;
  }

  async function generateRotation() {
    if (!employeeName) return;

    const totalWeeks = getWeeksInYear(year);
    const workWeeks = mode === '6-2' ? 6 : 5;
    const offWeeks = mode === '6-2' ? 2 : 3;

    let currentWeek = 1;

    while (currentWeek <= totalWeeks) {
      // Work weeks (Norvegia)
      for (let i = 0; i < workWeeks && currentWeek <= totalWeeks; i++) {
        await createAttendance({
          employeeName,
          date: `${year}-W${currentWeek}`,
          startTime: '08:00',
          endTime: '16:00',
        });
        currentWeek++;
      }

      // Off weeks (România)
      for (let i = 0; i < offWeeks && currentWeek <= totalWeeks; i++) {
        await createAttendance({
          employeeName,
          date: `${year}-W${currentWeek}`,
          startTime: '00:00',
          endTime: '00:00',
        });
        currentWeek++;
      }
    }

    alert('Rotation generated successfully');
  }

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Rotation Planner</h2>

      <input
        placeholder="Nume angajat"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
        style={{ display: 'block', marginBottom: '10px' }}
      />

      <select
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
        style={{ marginRight: '10px' }}
      >
        <option value={2026}>2026</option>
        <option value={2027}>2027</option>
      </select>

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value as '6-2' | '5-3')}
        style={{ marginRight: '10px' }}
      >
        <option value="6-2">6 săptămâni muncă / 2 liber</option>
        <option value="5-3">5 săptămâni muncă / 3 liber</option>
      </select>

      <button onClick={generateRotation}>
        Generează rotație
      </button>
    </div>
  );
}