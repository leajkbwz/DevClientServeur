import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import api from "./api";    // Fichier API pour les appels vers le backend
import "./App.css";

// Initialisation de Socket.io pour se connecter au backend
const socket = io("http://localhost:5000");

const App = () => {
    const [tasks, setTasks] = useState([]);   // Liste des tâches
    const [newTask, setNewTask] = useState(""); // Nouvelle tâche à ajouter
    const [assignedUser, setAssignedUser] = useState(""); // Utilisateur assigné à la tâche
    const [chatMessages, setChatMessages] = useState([]); // Messages du chat
    const [message, setMessage] = useState(""); // Message du chat
    const [username, setUsername] = useState(localStorage.getItem("username") || ""); // Nom de l'utilisateur
    const [selectedTask, setSelectedTask] = useState(null); // Tâche sélectionnée pour discuter

    // Chargement des tâches au démarrage
    useEffect(() => {
        loadTasks();
        socket.on("chatMessage", (msg) => {
            setChatMessages((prev) => [...prev, msg]);
        });
        socket.on("taskUpdate", loadTasks); // Mise à jour des tâches quand une tâche est ajoutée/modifiée
    }, []);

    const loadTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks", error);
        }
    };

    const addTask = async () => {
        if (!newTask.trim()) return;
        try {
            const res = await api.post("/tasks", { title: newTask, assignedTo: assignedUser });
            setTasks([...tasks, res.data]);
            setNewTask("");
            setAssignedUser("");
            socket.emit("taskUpdate");  // Émettre un événement pour mettre à jour les tâches en temps réel
        } catch (error) {
            console.error("Error adding task", error);
        }
    };

    const updateTask = async (id, status) => {
        try {
            await api.put(`/tasks/${id}`, { status });
            setTasks(tasks.map(task => task._id === id ? { ...task, status } : task));
            socket.emit("taskUpdate");  // Émettre un événement pour mettre à jour les tâches en temps réel
        } catch (error) {
            console.error("Error updating task", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
            socket.emit("taskUpdate");  // Émettre un événement pour mettre à jour les tâches en temps réel
        } catch (error) {
            console.error("Error deleting task", error);
        }
    };

    const sendMessage = () => {
        if (!selectedTask) return alert("Please select a task to chat about.");
        if (!message.trim()) return;
        const chatData = { username, taskId: selectedTask._id, message };
        socket.emit("chatMessage", chatData);
        setMessage("");
    };

    return (
        <div className="container">
            <h1>Task Manager</h1>
            <div className="task-form">
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="New Task" />
                <input type="text" value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} placeholder="Assign to User" />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task._id}>
                        <span>{task.title} (Assigned to: {task.assignedTo || "Unassigned"}) - {task.status}</span>
                        <button onClick={() => updateTask(task._id, "completed")}>Mark as Completed</button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                        <button onClick={() => setSelectedTask(task)}>Chat</button>
                    </li>
                ))}
            </ul>
            
            <h2>Chat</h2>
            {selectedTask && <h3>Chat about: {selectedTask.title}</h3>}
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Your name" />
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
            <button onClick={sendMessage}>Send</button>
            <ul className="chat-list">
                {chatMessages.filter(msg => msg.taskId === (selectedTask ? selectedTask._id : null)).map((msg, index) => (
                    <li key={index}><strong>{msg.username}</strong>: {msg.message}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
