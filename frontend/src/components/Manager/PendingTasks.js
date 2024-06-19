import React, { useState, useEffect } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getTasks, deleteTask } from '../../api';

const PendingTasks = () => {
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    const fetchPendingTasks = async () => {
      try {
        const { data } = await getTasks();
        setPendingTasks(data.filter(task => !task.completed));
      } catch (error) {
        console.error('Error fetching pending tasks:', error);
      }
    };
    fetchPendingTasks();
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setPendingTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Pending Tasks</Typography>
      {pendingTasks.map(task => (
        <Accordion key={task.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{task.title}</Typography>
            <Typography style={{ marginLeft: 'auto' }}>Assigned To: {task.employee}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Description: {task.description}</Typography>
            <Typography>Category: {task.category}</Typography>
            <Button variant="contained" color="error" onClick={() => handleDeleteTask(task.id)}>
              Delete Task
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default PendingTasks;
