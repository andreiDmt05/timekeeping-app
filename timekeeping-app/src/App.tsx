import { useState } from 'react';
import Employees from './components/Employees';
import RotationPlanner from './components/RotationPlanner';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  const [section, setSection] = useState<'daily' | 'rotation'>('daily');

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
    <div style={{ padding: '20px' }}>
      <button
        onClick={handleLogout}
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
        }}
      >
        Logout
      </button>

      <h1>Timekeeping App</h1>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setSection('daily')}
          style={{ marginRight: '10px' }}
        >
          Pontaj zilnic
        </button>

        <button onClick={() => setSection('rotation')}>
          Plan rotație anuală
        </button>
      </div>

      {section === 'daily' && <Employees />}
      {section === 'rotation' && <RotationPlanner />}
    </div>
  );
}

export default App;