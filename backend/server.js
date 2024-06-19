const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); 
const mongoose = require('mongoose'); 
const taskRoutes = require('./routes/taskRoutes');
const path = require('path');

dotenv.config();

const app = express();
app.use(express.json());

// Specify allowed origins
const allowedOrigins = ['http://localhost:3001', 'http://localhost:3002', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions)); // Enable CORS with specified options

app.use('/api/tasks', taskRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};


connectDB();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
