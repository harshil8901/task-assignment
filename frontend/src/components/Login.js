import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ username, password });
      onLogin(data);
      if (data.role === 'manager') {
        navigate('/manager/add-task');
      } else {
        navigate(`/employee/${data.username}`);
      }
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <Container>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
