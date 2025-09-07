const mongoose = require('mongoose');

// User model for passengers
const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, // Hashed password
    role: { type: String, default: "user" },
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }]
});

module.exports = mongoose.model('User', UserSchema);
