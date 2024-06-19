import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import ManagerDashboard from './pages/ManagerDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const ProtectedRouteManager = (props) => {
    if (!user || user.role !== 'manager') {
      return <Navigate to="/" replace />;
    }
    return <ManagerDashboard {...props} user={user} onLogout={handleLogout} />;
  };

  const ProtectedRouteEmployee = (props) => {
    if (!user || user.role !== 'employee') {
      return <Navigate to="/" replace />;
    }
    return <EmployeeDashboard {...props} user={user} onLogout={handleLogout} />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/manager/*" element={<ProtectedRouteManager />} />
        <Route path="/employee/*" element={<ProtectedRouteEmployee />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
