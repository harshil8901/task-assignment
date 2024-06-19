import React, { useState } from 'react';
import { Button, TextField, Grid, Typography, Container, Box } from '@mui/material';
import { addEmployee } from '../../api';

const AddEmployee = () => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleAddEmployee = async () => {
    try {
      
      if (!id || !username || !password) {
        setErrorMessage('All fields are required.');
        return;
      }

      await addEmployee(id, username, password);
      setSuccessMessage('Employee added successfully.');
      setErrorMessage('');
    
      setId('');
      setUsername('');
      setPassword('');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 1000);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleIdChange = (event) => {
    const value = event.target.value;
    // Allow only numbers
    if (!isNaN(value)) {
      setId(value);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Add New Employee
        </Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee ID*"
                value={id}
                onChange={handleIdChange}
                inputProps={{ inputMode: 'numeric' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username*"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password*"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleAddEmployee}
              >
                Add Employee
              </Button>
            </Grid>
            <Grid item xs={12}>
              {errorMessage && (
                <Typography variant="body1" color="error" align="center">
                  {errorMessage}
                </Typography>
              )}
              {successMessage && (
                <Typography variant="body1" color="primary" align="center">
                  {successMessage}
                </Typography>
              )}
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddEmployee;
