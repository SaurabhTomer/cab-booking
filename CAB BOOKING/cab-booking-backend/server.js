const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const driverRoutes = require('./routes/driver');

const { MONGO_URI } = require('./config');

const app = express();
const server = http.createServer(app);

// Setup Socket.io for real-time communication (live tracking)
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/driver', driverRoutes);

// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected: ', socket.id);

    // Driver sends location update
    socket.on('sendLocation', ({ rideId, lat, lng }) => {
        // Emit the updated location to all users in this ride
        io.to(rideId).emit('receiveLocation', { lat, lng });
    });

    // User joins a ride to receive live location updates
    socket.on('joinRide', (rideId) => {
        socket.join(rideId);
        console.log(`User joined ride room: ${rideId}`);
    });
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
