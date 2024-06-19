import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { getEmployees, deleteEmployee } from '../../api';

const DeleteEmployee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await deleteEmployee(employeeId);
      fetchEmployees(); 
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Delete Employee
      </Typography>
      {employees.map((employee) => (
        <Card key={employee._id} variant="outlined" style={{ display: 'flex', marginBottom: '10px' }}>
          <CardContent style={{ flex: '1 0 auto' }}>
            <Typography variant="h6">{employee.username}</Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDeleteEmployee(employee._id)}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default DeleteEmployee;
