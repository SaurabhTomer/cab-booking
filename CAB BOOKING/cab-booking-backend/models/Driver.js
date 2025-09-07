const mongoose = require('mongoose');

// Driver model
const DriverSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String, // Hashed password
    car: String, // Car details
    rides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ride' }],
    ratings: [Number] // Array of ratings from users
});

module.exports = mongoose.model('Driver', DriverSchema);
