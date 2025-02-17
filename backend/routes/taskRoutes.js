const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create task
router.post('/', async (req, res) => {
    const { title, description, assignedTo } = req.body;
    try {
        const newTask = new Task({ title, description, assignedTo });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ error: 'Error creating task' });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo');
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
});

// Update task
router.put('/:taskId', async (req, res) => {
    const { taskId } = req.params;
    const { title, description, status, assignedTo } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, status, assignedTo },
            { new: true }
        );
        res.json(updatedTask);
    } catch (err) {
        res.status(500).json({ error: 'Error updating task' });
    }
});

// Delete task
router.delete('/:taskId', async (req, res) => {
    const { taskId } = req.params;
    try {
        await Task.findByIdAndDelete(taskId);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting task' });
    }
});

module.exports = router;
