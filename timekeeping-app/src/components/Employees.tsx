import { useEffect, useState } from 'react';
import {
  fetchAttendance,
  createAttendance,
  type Attendance,
  type AttendancePayload,
} from '../api/attendance';

export default function Employees() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<AttendancePayload>({
    employeeName: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  useEffect(() => {
    fetchAttendance()
      .then(setAttendance)
      .finally(() => setLoading(false));
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const created = await createAttendance(form);
    setAttendance((prev) => [...prev, created]);

    setForm({
      employeeName: '',
      date: '',
      startTime: '',
      endTime: '',
    });
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Pontaje</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="employeeName"
          placeholder="Nume angajat"
          value={form.employeeName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Adaugă pontaj</button>
      </form>

      <ul>
        {attendance.map((a) => (
          <li key={a._id}>
            {a.employeeName} — {a.date} ({a.startTime} - {a.endTime})
          </li>
        ))}
      </ul>
    </div>
  );
}