import { useState } from 'react';
import Employees from './components/Employees';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  function handleLoginSuccess() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          padding: '6px 12px',
        }}
      >
        Logout
      </button>

      <Employees />
    </div>
  );
}

export default App;