import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Button, TextField } from '@mui/material';
import { getEmployeeTasks, completeTask } from '../../api';

const AssignedTasks = ({ employeeName }) => {
  const [tasks, setTasks] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [employeeName]);

  const fetchTasks = async () => {
    const { data } = await getEmployeeTasks(employeeName);
    setTasks(data.filter(task => !task.completed));
  };

  const handleComplete = async (taskId) => {
    await completeTask(taskId, comment);
    fetchTasks();
  };

  return (
    <Container>
      <Typography variant="h4">Assigned Tasks</Typography>
      {tasks.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
          No tasks are assigned.
        </Typography>
      ) : (
        tasks.map(task => (
          <Card key={task.id} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5">{task.title}</Typography>
              <Typography variant="body1">{task.description}</Typography>
              <Typography variant="body2">Category: {task.category}</Typography>
              <Typography>Comments:</Typography>
              {task.comments.map((comment, index) => (
                <Typography key={index}>- {comment}</Typography>
              ))}
              <TextField
                label="Add Comment"
                variant="outlined"
                fullWidth
                margin="normal"
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={() => handleComplete(task.id)}>
                Mark as Completed
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default AssignedTasks;
