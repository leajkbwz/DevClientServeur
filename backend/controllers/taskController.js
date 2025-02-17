const Task = require('../models/Task');

// Créer une nouvelle tâche
exports.createTask = async (req, res) => {
    const { title, description, assignedTo } = req.body;

    try {
        const newTask = new Task({ title, description, assignedTo });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating task' });
    }
};

// Obtenir toutes les tâches
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo');
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

// Mettre à jour une tâche
exports.updateTask = async (req, res) => {
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
        console.error(err);
        res.status(500).json({ error: 'Error updating task' });
    }
};

// Supprimer une tâche
exports.deleteTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        await Task.findByIdAndDelete(taskId);
        res.json({ message: 'Task deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting task' });
    }
};
