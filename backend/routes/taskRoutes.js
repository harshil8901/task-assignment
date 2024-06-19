const express = require('express');
const { getTasks, getEmployeeTasks, addTask, completeTask, deleteTask, loginUser, getCompletedEmployeeTasks, getEmployees, markTaskIncomplete,addEmployee,deleteEmployee } = require('../controllers/taskController');
const router = express.Router();

router.get('/', getTasks);
router.get('/employee/:employeeName', getEmployeeTasks);
router.get('/employee/:employeeName/completed', getCompletedEmployeeTasks);
router.post('/', addTask);
router.put('/:id/complete', completeTask);
router.put('/:id/incomplete', markTaskIncomplete); 
router.delete('/:id', deleteTask);
router.post('/login', loginUser);
router.get('/employees', getEmployees);
router.post('/employees', addEmployee);
router.delete('/employees/:id', deleteEmployee);

module.exports = router;
