const Task = require('../models/task');
const TaskList = require('../models/TaskList');
const moment = require('moment');

exports.createTask = async (req, res) => {
    try {
        const taskListId = req.params.taskListId;
        const { title } = req.body;

        const taskList = await TaskList.findById(taskListId);
        if (!taskList) {
            return res.status(404).json({ error: 'Lista de tareas no encontrada' });
        }

        const newTask = new Task({ title, date: moment().format('DD/MM/YYYY'), taskList: taskListId });
        await newTask.save();

        taskList.tasks.push(newTask._id);
        await taskList.save();

        res.status(201).json({ message: 'Tarea añadida con éxito', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const taskListId = req.params.taskListId;
        const taskList = await TaskList.findById(taskListId).populate('tasks');

        if (!taskList) {
            return res.status(404).json({ error: 'Lista de tareas no encontrada' });
        }

        res.status(200).json({ tasks: taskList.tasks });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor', taskListId });
    }
};

exports.completeTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const updatedTask = await Task.findByIdAndUpdate(taskId, { status: 'completed' }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.status(200).json({ message: 'Tarea completada', task: updatedTask });
    } catch (error) {
        res.status(500).json({ error: 'Error al completar la tarea', error });
    }

};

exports.filterTasksByDate = async (req, res) => {
    try {
        const date = req.params.date;
        const taskId = req.params.taskListId;
        const user = await TaskList.findById(taskId).populate({
            path: 'tasks',
            match: {
                status : 'completed',
                createdAt: {
                    $gte: new Date(`${date}T00:00:00`),
                    $lte: new Date(`${date}T23:59:59`)
                }
            }

        });
        
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({ completedTask: user.tasks});
    } catch (error) {
        res.status(500).json({ error: "Algo mal" });
    }
}
