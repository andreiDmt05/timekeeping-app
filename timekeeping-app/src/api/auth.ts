const AUTH_URL = 'https://timekeeping-backend.onrender.com/api/auth';

export async function registerUser(
  name: string,
  email: string,
  password: string
) {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    throw new Error('Register failed');
  }

  return res.json();
}

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Login failed');
  }

  return res.json();
}