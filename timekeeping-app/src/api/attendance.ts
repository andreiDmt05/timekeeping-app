const API_URL = 'https://timekeeping-backend.onrender.com/api/attendance';

function getAuthHeaders() {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  };
}

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
  const res = await fetch(API_URL, {
    headers: getAuthHeaders(),
  });

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
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to create attendance');
  }

  return res.json();
}

export async function deleteAttendance(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error('Failed to delete attendance');
  }
}