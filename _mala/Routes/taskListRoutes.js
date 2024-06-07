const express = require('express');
const router = express.Router();
const taskListController = require('../controllers/TaskListController');

router.post('/users/:userId/task-lists', taskListController.createTaskList);
router.get('/users/:userId/task-lists', taskListController.getTaskLists);

module.exports = router;
