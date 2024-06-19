import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/Manager/Navbar';
import AddTask from '../components/Manager/AddTask';
import CompletedTasks from '../components/Manager/CompletedTasks';
import PendingTasks from '../components/Manager/PendingTasks';
import ManageEmployees from '../components/Manager/ManageEmployees';
import AddEmployee from '../components/Manager/AddEmployee';
import DeleteEmployee from '../components/Manager/DeleteEmployee';

const ManagerDashboard = ({ user, onLogout }) => {
  return (
    <>
      <Navbar onLogout={onLogout} />
      <Routes>
        <Route path="add-task" element={<AddTask />} />
        <Route path="completed-tasks" element={<CompletedTasks />} />
        <Route path="pending-tasks" element={<PendingTasks />} />
        <Route path="manage-employees" element={<ManageEmployees />} />
        <Route path="add-employee" element={<AddEmployee />} />
        <Route path="delete-employee" element={<DeleteEmployee />} />
      </Routes>
    </>
  );
};

export default ManagerDashboard;
