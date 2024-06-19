const Task = require('../models/Task');
const User = require('../models/User');

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getEmployeeTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ employee: req.params.employeeName, completed: false });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getCompletedEmployeeTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ employee: req.params.employeeName, completed: true });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addTask = async (req, res) => {
  try {
    const newTask = new Task({ id: Date.now(), ...req.body, completed: false, comments: [] });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (task) {
      task.completed = true;
      if (req.body.comment) {
        task.comments.push(req.body.comment);
      }
      await task.save();
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ id: req.params.id });
    if (task) {
      res.status(200).json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const markTaskIncomplete = async (req, res) => {
  try {
    const { comment } = req.body; 
    const task = await Task.findOneAndUpdate(
      { id: req.params.id },
      { completed: false },
      { new: true }
    );
    if (task) {
      if (comment) {
        task.comments.push(comment); 
      }
      await task.save(); 
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ id: user.id, name: user.username, role: user.role });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: 'employee' }, 'username');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addEmployee = async (req, res) => {
  try {
    const { id, username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({
      id,
      username,
      password,
      role: 'employee',
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const deleteEmployee = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.status(200).json({ message: 'Employee deleted successfully' });
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTasks,
  getEmployeeTasks,
  addTask,
  completeTask,
  deleteTask,
  loginUser,
  getCompletedEmployeeTasks,
  getEmployees,
  markTaskIncomplete,
  addEmployee,
  deleteEmployee,
};