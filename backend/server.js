const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { authenticateToken } = require('./middleware/authMiddleware');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/users', userRoutes);
app.use('/tasks', authenticateToken, taskRoutes);

// WebSocket Handling
io.on('connection', (socket) => {
    console.log('🔵 User connected');
    
    socket.on('chatMessage', (msg) => {
        io.emit('chatMessage', msg);
    });
    
    socket.on('taskUpdate', () => {
        io.emit('taskUpdate');
    });
    
    socket.on('disconnect', () => {
        console.log('🔴 User disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
