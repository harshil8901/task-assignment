import React, { useState, useEffect } from 'react';
import { Container, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getCompletedEmployeeTasks } from '../../api';

const CompletedTasks = ({ employeeName }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [employeeName]);

  const fetchTasks = async () => {
    const { data } = await getCompletedEmployeeTasks(employeeName);
    setTasks(data);
  };

  return (
    <Container>
      <Typography variant="h4">Completed Tasks</Typography>
      {tasks.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{ marginTop: '20px' }}>
          No tasks are completed.
        </Typography>
      ) : (
        tasks.map(task => (
          <Accordion key={task.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{task.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Description: {task.description}</Typography>
              <Typography>Category: {task.category}</Typography>
              <Typography>Comments:</Typography>
              {task.comments.map((comment, index) => (
                <Typography key={index}>- {comment}</Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
  );
};

export default CompletedTasks;
