import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',
});

export const getTasks = () => api.get('/tasks');
export const addTask = (task) => api.post('/tasks', task);
export const completeTask = (id, comment) => api.put(`/tasks/${id}/complete`, { comment });
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
export const markTaskIncomplete = (id, comment) => api.put(`/tasks/${id}/incomplete`, { comment });
export const loginUser = (credentials) => api.post('/tasks/login', credentials);
export const getEmployeeTasks = (employeeName) => api.get(`/tasks/employee/${employeeName}`);
export const getCompletedEmployeeTasks = (employeeName) => api.get(`/tasks/employee/${employeeName}/completed`);
export const getEmployees = () => api.get('/tasks/employees');
export const addEmployee = async (id, employeeName, password) => {
  try {
    const response = await api.post('/tasks/employees', {
      id,
      username: employeeName,
      password,
      role: 'employee',
    });
    return response.data; 
  } catch (error) {
    throw error; 
  }
};
export const deleteEmployee = (employeeId) => api.delete(`/tasks/employees/${employeeId}`);
