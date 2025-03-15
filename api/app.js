const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const userRoutes = require('./Routes/authRoutes');
const taskListRoutes = require('./Routes/taskListRoutes');
const taskRoutes = require('./Routes/taskRoutes');

app.use('/api', userRoutes);
app.use('/api', taskListRoutes);
app.use('/api', taskRoutes);

module.exports = app;

