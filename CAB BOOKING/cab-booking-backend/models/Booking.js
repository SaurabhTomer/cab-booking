const mongoose = require('mongoose');

// Booking model
const BookingSchema = new mongoose.Schema({
    rideId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ride' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: "pending" }, // pending / accepted / completed
    price: Number,
    rating: Number // User rating for driver
});

module.exports = mongoose.model('Booking', BookingSchema);
