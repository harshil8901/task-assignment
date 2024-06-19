import React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Navbar from '../components/Employee/Navbar';
import AssignedTasks from '../components/Employee/AssignedTasks';
import CompletedTasks from '../components/Employee/CompletedTasks';

const EmployeeDashboard = ({ user, onLogout }) => {
  const { employeeName } = useParams();

  return (
    <div>
      <Navbar employeeName={user.name} onLogout={onLogout} />
      <Routes>
        <Route path="assigned-tasks" element={<AssignedTasks employeeName={user.name} />} />
        <Route path="completed-tasks" element={<CompletedTasks employeeName={user.name} />} />
      </Routes>
    </div>
  );
};

export default EmployeeDashboard;
