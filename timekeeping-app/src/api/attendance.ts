const API_URL = 'https://timekeeping-backend.onrender.com/api/attendance';

export interface AttendancePayload {
  employeeName: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Attendance extends AttendancePayload {
  _id: string;
}

export async function fetchAttendance(): Promise<Attendance[]> {
  const res = await fetch(API_URL);
  if (!res.ok) {
    throw new Error('Failed to fetch attendance');
  }
  return res.json();
}

export async function createAttendance(
  data: AttendancePayload
): Promise<Attendance> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create attendance');
  }

  return res.json();
}