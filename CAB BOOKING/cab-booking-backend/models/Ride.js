const mongoose = require('mongoose');

// Ride model
const RideSchema = new mongoose.Schema({
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' },
    source: String,
    destination: String,
    price: Number,
    availableSeats: Number,
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    liveLocation: { lat: Number, lng: Number } // For live tracking
});

module.exports = mongoose.model('Ride', RideSchema);
