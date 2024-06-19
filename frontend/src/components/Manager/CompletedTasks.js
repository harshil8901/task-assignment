import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getTasks, deleteTask, markTaskIncomplete } from "../../api";

const CompletedTasks = ({ match }) => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [rejectionTaskId, setRejectionTaskId] = useState(null);
  const [rejectionComment, setRejectionComment] = useState("");
  const employeeId = parseInt(match?.params?.id);

  const fetchTasks = useCallback(async () => {
    try {
      const { data } = await getTasks();
      setCompletedTasks(data.filter((task) => task.completed));
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [employeeId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAcceptTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      fetchTasks();
    } catch (error) {
      console.error("Error accepting task:", error);
    }
  };

  const handleRejectTask = (taskId) => {
    setRejectionTaskId(taskId);
  };

  const handleSubmitRejection = async () => {
    try {
      await markTaskIncomplete(rejectionTaskId, rejectionComment);
      setRejectionTaskId(null);
      setRejectionComment("");
      fetchTasks();
    } catch (error) {
      console.error("Error rejecting task:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Completed Tasks</Typography>
      {completedTasks.map((task) => (
        <Accordion key={task.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {task.title} - Assigned to: {task.employee}
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Typography>Description: {task.description}</Typography>
            <Typography>Category: {task.category}</Typography>
            <Typography>Comments:</Typography>
            {task.comments.map((comment, index) => (
              <Typography key={index}>- {comment}</Typography>
            ))}
            <Button
              variant="contained"
              style={{ backgroundColor: "green", marginRight: "8px" }}
              onClick={() => handleAcceptTask(task.id)}
            >
              Accept Task
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "red" }}
              onClick={() => handleRejectTask(task.id)}
            >
              Reject Task
            </Button>
            {rejectionTaskId === task.id && (
              <div>
                <TextField
                  label="Rejection Comment"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={rejectionComment}
                  onChange={(e) => setRejectionComment(e.target.value)}
                  style={{ marginTop: "8px" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitRejection}
                  style={{ marginTop: "8px" }}
                >
                  Submit Rejection
                </Button>
              </div>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

export default CompletedTasks;