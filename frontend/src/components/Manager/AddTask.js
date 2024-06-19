import React, { useState, useEffect } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { addTask, getEmployees } from '../../api';

const AddTask = ({ fetchTasks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [employee, setEmployee] = useState('');
  const [employees, setEmployees] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  
  const theme = useTheme();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTask({ title, description, category, employee });
    setTitle('');
    setDescription('');
    setCategory('');
    setEmployee('');
    setSuccessMessage(true);
    if (fetchTasks) fetchTasks();

    setTimeout(() => {
      setSuccessMessage(false);
    }, 1000); // Hide the success message after 1 second
  };

  return (
    <Container>
      <Typography variant="h4">Add Task</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="Sprint">Sprint</MenuItem>
            <MenuItem value="Task">Task</MenuItem>
            <MenuItem value="Bin">Bin</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Employee</InputLabel>
          <Select
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            required
          >
            {employees.map(emp => (
              <MenuItem key={emp.id} value={emp.username}> {/* Assuming username is used */}
                {emp.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Add Task
        </Button>
      </form>
      {successMessage && (
        <Typography 
          variant="body1" 
          style={{ 
            marginTop: '16px', 
            color: theme.palette.primary.main 
          }}
        >
          Task assigned successfully!
        </Typography>
      )}
    </Container>
  );
};

export default AddTask;