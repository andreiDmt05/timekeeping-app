import { useEffect, useState } from 'react';
import {
  fetchAttendance,
  createAttendance,
  deleteAttendance,
  type Attendance,
  type AttendancePayload,
} from '../api/attendance';

export default function Employees() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

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

  async function handleDelete(id: string) {
    await deleteAttendance(id);
    setAttendance(prev => prev.filter(a => a._id !== id));
    setSelected(prev => prev.filter(item => item !== id));
  }

  function toggleSelect(id: string) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  }

  function selectAll() {
    setSelected(attendance.map(a => a._id));
  }

  function deselectAll() {
    setSelected([]);
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

      <div style={{ margin: '20px 0' }}>
        <button onClick={selectAll} style={{ marginRight: '10px' }}>
          Selectează tot
        </button>

        <button onClick={deselectAll}>
          Debifează tot
        </button>
      </div>

      <ul>
        {attendance.map((a) => (
          <li key={a._id} style={{ marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={selected.includes(a._id)}
              onChange={() => toggleSelect(a._id)}
              style={{ marginRight: '8px' }}
            />

            {a.employeeName} — {a.date} ({a.startTime} - {a.endTime})

            <button
              onClick={() => handleDelete(a._id)}
              style={{
                marginLeft: '12px',
                padding: '4px 10px',
                fontSize: '12px',
                backgroundColor: '#1e1e1e',
                color: '#ff4d4f',
                border: '1px solid #ff4d4f',
                cursor: 'pointer'
              }}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}