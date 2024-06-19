import React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ManageEmployees = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Manage Employees
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/manager/add-employee"
        style={{ marginRight: '20px' }}
      >
        Add New Employee
      </Button>
      <Button
        variant="contained"
        color="error"
        component={Link}
        to="/manager/delete-employee"
        style={{ marginLeft: '20px' }}
      >
        Delete Employee
      </Button>
    </div>
  );
};

export default ManageEmployees;
