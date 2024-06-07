const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/task-lists/:taskListId/tasks', taskController.createTask);
router.get('/task-lists/:taskListId/tasks', taskController.getTasks);
router.patch('/tasks/:taskId/complete', taskController.completeTask);
router.get('/tasks/complete/:date/:taskListId', taskController.filterTasksByDate);
module.exports = router;
